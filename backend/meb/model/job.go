package model

import "time"

type Job struct {
	ID             string    `json:"id" datastore:"-"`
	Name           string    `json:"name" datastore:"name,noindex"`
	Description    string    `json:"description" datastore:"description,noindex"`
	Salary         string    `json:"salary" datastore:"salary,noindex"`
	Location       string    `json:"location" datastore:"location,noindex"`
	LocationKey    string    `json:"location_key" datastore:"location_key"`
	Industry       string    `json:"industry" datastore:"industry,noindex"`
	IndustryKey    string    `json:"industry_key" datastore:"industry_key"`
	ApplicantKeys  []string  `json:"applicant_keys" datastore:"applicant_keys,noindex"`
	ApplicantCount int       `json:"applicant_count" datastore:"-"`
	PostedBy       string    `json:"posted_by" datastore:"posted_by"`
	Active         bool      `json:"active" datastore:"active"`
	Created        time.Time `datastore:"created,noindex"`
	Updated        time.Time `datastore:"updated,noindex"`
}
