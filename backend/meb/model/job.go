package model

import "time"

type Job struct {
	ID          string    `json:"id" datastore:"-"`
	Name        string    `json:"name" datastore:"name"`
	Description string    `json:"description" datastore:"description,noindex"`
	Salary      string    `json:"salary" datastore:"salary"`
	Location    string    `json:"location" datastore:"location"`
	Industry    string    `json:"industry" datastore:"industry"`
	PostedBy    string    `json:"posted_by" datastore:"posted_by"`
	Active      bool      `datastore:"active"`
	Created     time.Time `datastore:"created,noindex"`
	Updated     time.Time `datastore:"updated,noindex"`
}
