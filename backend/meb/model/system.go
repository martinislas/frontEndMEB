package model

import "time"

type Industry struct {
	Name        string    `json:"name" datastore:"-"`
	DisplayName string    `json:"display_name" datastore:"display_name,noindex"`
	Created     time.Time `datastore:"created,noindex"`
	Updated     time.Time `datastore:"updated,noindex"`
}

type Location struct {
	Name        string    `json:"name" datastore:"-"`
	DisplayName string    `json:"display_name" datastore:"display_name,noindex"`
	Created     time.Time `datastore:"created,noindex"`
	Updated     time.Time `datastore:"updated,noindex"`
}

type ApplicantTag struct {
	Name        string    `json:"name" datastore:"-"`
	DisplayName string    `json:"display_name" datastore:"display_name,noindex"`
	Created     time.Time `datastore:"created,noindex"`
	Updated     time.Time `datastore:"updated,noindex"`
}
