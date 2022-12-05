package model

import "time"

type Applicant struct {
	ID                    string    `json:"id" datastore:"-"`
	FirstName             string    `json:"first_name" datastore:"first_name,noindex"`
	MiddleName            string    `json:"middle_name" datastore:"middle_name,noindex"`
	LastName              string    `json:"last_name" datastore:"last_name,noindex"`
	Email                 string    `json:"email" datastore:"email"`
	Phone                 string    `json:"phone" datastore:"phone"`
	Password              string    `json:"password" datastore:"-"`
	HashedPassword        []byte    `json:"-" datastore:"password,noindex"`
	ResetPassword         bool      `json:"reset_password" datastore:"reset_password,noindex"`
	AddressStreet         string    `json:"address_street" datastore:"address_street,noindex"`
	AddressCity           string    `json:"address_city" datastore:"address_city,noindex"`
	AddressZip            string    `json:"address_zip" datastore:"address_zip,noindex"`
	AddressState          string    `json:"address_state" datastore:"address_state,noindex"`
	PreferredLocationKeys []string  `json:"preferred_location_keys" datastore:"preferred_location_keys,noindex"`
	PreferredIndustryKeys []string  `json:"preferred_industry_keys" datastore:"preferred_industry_keys,noindex"`
	JobKeys               []string  `json:"job_keys" datastore:"job_keys,noindex"`
	JobCount              int       `json:"job_count" datastore:"-"`
	Created               time.Time `datastore:"created,noindex"`
	Updated               time.Time `datastore:"updated,noindex"`
}

type Application struct {
	JobID     string `json:"job_id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
}
