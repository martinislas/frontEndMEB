package model

import "time"

type Admin struct {
	FirstName      string    `json:"first_name" datastore:"first_name,noindex"`
	Surname        string    `json:"surname" datastore:"surname,noindex"`
	Username       string    `json:"username" datastore:"username"`
	Password       string    `json:"password" datastore:"-"`
	HashedPassword []byte    `json:"-" datastore:"password,noindex"`
	IsActive       bool      `json:"is_active" datastore:"is_active,noindex"`
	IsCurrent      bool      `json:"is_current" datastore:"-"`
	Created        time.Time `json:"created" datastore:"created,noindex"`
	Updated        time.Time `json:"updated" datastore:"updated,noindex"`
}
