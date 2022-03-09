package model

import "time"

type Applicant struct {
	ID            string    `json:"id" datastore:"-"`
	FirstName     string    `json:"first_name" datastore:"first_name,noindex"`
	MiddleName    string    `json:"middle_name" datastore:"middle_name,noindex"`
	LastName      string    `json:"last_name" datastore:"last_name"`
	Email         string    `json:"email" datastore:"email"`
	Phone         string    `json:"phone" datastore:"phone"`
	AddressStreet string    `json:"address_street" datastore:"address_street,noindex"`
	AddressCity   string    `json:"address_city" datastore:"address_city,noindex"`
	AddressZip    string    `json:"address_zip" datastore:"address_zip,noindex"`
	AddressState  string    `json:"address_state" datastore:"address_state,noindex"`
	Created       time.Time `datastore:"created,noindex"`
	Updated       time.Time `datastore:"updated,noindex"`
}
