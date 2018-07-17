package app

import (
	"encoding/json"
	"io"
	"time"

	"gopkg.in/mgo.v2/bson"
)

// Note represents Guestbook note
type Note struct {
	ID        bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Message   string        `json:"message" bson:"message"`
	Author    string        `json:"author" bson:"author"`
	CreatedAt time.Time     `json:"createdAt,omitempty" bson:"createdAt"`
}

// Notes represents list of Note
type Notes []Note

// ToJSON converts object to JSON representation
func (n *Notes) ToJSON() ([]byte, error) {
	js, err := json.Marshal(n)
	if err != nil {
		return nil, err
	}

	return js, nil
}

// ToJSON converts object to JSON representation
func (n *Note) ToJSON() ([]byte, error) {
	js, err := json.Marshal(n)
	if err != nil {
		return nil, err
	}

	return js, nil
}

// NoteFromJSON converts stream of bytes to domain note representation
func NoteFromJSON(body io.Reader) (Note, error) {
	encoder := json.NewDecoder(body)
	n := Note{}

	if err := encoder.Decode(&n); err != nil {
		return n, err
	}

	return n, nil
}
