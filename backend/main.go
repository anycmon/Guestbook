package main

import (
	"Guestbook/backend/app"
	"net/http"
	"os"

	"github.com/Sirupsen/logrus"
	"github.com/rs/cors"
	"github.com/urfave/negroni"
	"gopkg.in/mgo.v2"
)

const (
	Port    = "GUESTBOOKPORT"
	MgoHost = "MGOHOST"
	MgoPort = "MGOPORT"
)

func main() {
	port := os.Getenv(Port)
	if port == "" {
		panic("Missing port parameter")
	}

	mgoHost := os.Getenv(MgoHost)
	if mgoHost == "" {
		panic("Missing mongodb host parameter")
	}

	mgoPort := os.Getenv(MgoPort)
	if mgoPort == "" {
		panic("Missing mongodb port parameter")
	}

	session, err := mgo.Dial(mgoHost + ":" + mgoPort)
	if err != nil {
		panic(err)
	}
	defer session.Close()

	logger := logrus.New()
	session.SetMode(mgo.Monotonic, true)

	application := app.NewApp(session, logger)
	n := negroni.Classic()
	n.UseHandler(cors.Default().Handler(application))

	http.ListenAndServe(":3002", n)
}
