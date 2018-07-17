package app

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Sirupsen/logrus"
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

const (
	dbName         = "store"
	collectionName = "notes"
)

// App represents web application with its all endpoint
type App struct {
	session *mgo.Session
	logger  *logrus.Logger
	router  *mux.Router
}

// NewApp creates new web application
func NewApp(session *mgo.Session, logger *logrus.Logger) *App {
	app := &App{session, logger, mux.NewRouter()}
	app.registerEndpoints()

	return app
}

func (app *App) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	app.router.ServeHTTP(w, r)
}

func (app *App) registerEndpoints() {
	app.router.HandleFunc("/notes", app.getNotes).Methods("GET")
	app.router.HandleFunc("/notes", app.postNote).Methods("POST")
	app.router.HandleFunc("/notes/{id}", app.getNote).Methods("GET")
	app.router.HandleFunc("/notes/{id}", app.deleteNote).Methods("DELETE")
}

func (app *App) collection() *mgo.Collection {
	return app.session.DB(dbName).C(collectionName)
}

func (app *App) postNote(rw http.ResponseWriter, req *http.Request) {
	note, err := NoteFromJSON(req.Body)
	if err != nil {
		errorAsJSON(rw, "cannot to parse body", http.StatusBadRequest)
		app.logger.Error(err)
		return
	}
	note.ID = bson.NewObjectId()
	note.CreatedAt = time.Now()
	session := app.session.Clone()
	defer session.Close()

	err = app.collection().Insert(&note)
	if err != nil {
		errorAsJSON(rw, "cannot to post note"+err.Error(), http.StatusInternalServerError)
		app.logger.Error(err)
		return
	}

	rw.Header().Set("Location", req.URL.Path+"/"+note.ID.Hex())
	js, err := note.ToJSON()
	if err != nil {
		errorAsJSON(rw, "cannot to marshal response", http.StatusBadRequest)
		app.logger.Error(err)
		return
	}
	responseAsJSON(rw, js, http.StatusCreated)
}

func (app *App) getNotes(rw http.ResponseWriter, req *http.Request) {
	session := app.session.Clone()
	defer session.Close()

	notes := Notes{}
	err := app.collection().Find(bson.M{}).All(&notes)
	if err != nil {
		errorAsJSON(rw, "cannot to retrieved data", http.StatusInternalServerError)
		app.logger.Error(err)
		return
	}
	js, err := notes.ToJSON()
	if err != nil {
		errorAsJSON(rw, "cannot to marshal response", http.StatusInternalServerError)
		app.logger.Error(err)
		return
	}

	responseAsJSON(rw, js, http.StatusOK)
}

func (app *App) getNote(rw http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	id := vars["id"]
	if !bson.IsObjectIdHex(id) {
		errorAsJSON(rw, "invalid id", http.StatusBadRequest)
		app.logger.Error("invalid id", id)
		return
	}

	mgoID := bson.ObjectIdHex(id)
	session := app.session.Clone()
	defer session.Close()

	var note Note
	err := app.collection().FindId(mgoID).One(&note)
	if err != nil {
		errorAsJSON(rw, "cannot to retrieved note "+mgoID.Hex(), http.StatusInternalServerError)
		app.logger.Errorf("cannot to retrieved note  %s %s"+mgoID.Hex(), err)
		return
	}

	js, err := note.ToJSON()
	if err != nil {
		errorAsJSON(rw, "cannot to marshal response", http.StatusInternalServerError)
		app.logger.Errorf("cannot to marshal response %s %s", note, err)
		return
	}

	responseAsJSON(rw, js, http.StatusOK)
}

func (app *App) deleteNote(rw http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	id := vars["id"]
	if !bson.IsObjectIdHex(id) {
		errorAsJSON(rw, "invalid id", http.StatusBadRequest)
		app.logger.Error("invalid id", id)
		return
	}

	mgoID := bson.ObjectIdHex(id)
	session := app.session.Clone()
	defer session.Close()

	err := app.collection().RemoveId(mgoID)
	if err != nil {
		if err == mgo.ErrNotFound {
			errorAsJSON(rw, "note does not exists", http.StatusNotFound)
			return
		}
		errorAsJSON(rw, "cannot to delete object "+mgoID.Hex(), http.StatusInternalServerError)
		app.logger.Errorf("cannot to delete object %s %s"+mgoID.Hex(), err)
		return
	}
}

func responseAsJSON(rw http.ResponseWriter, json []byte, statusCode int) {
	rw.Header().Set("Content-Type", "application/json; charset=utf-8")
	rw.WriteHeader(statusCode)
	rw.Write(json)
}

func errorAsJSON(rw http.ResponseWriter, message string, statusCode int) {
	rw.Header().Set("Content-Type", "application/json; charset=utf-8")
	rw.WriteHeader(statusCode)
	fmt.Fprintf(rw, "{message: %q }", message)
}
