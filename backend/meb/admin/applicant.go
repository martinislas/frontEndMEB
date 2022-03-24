package admin

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/OwenJacob/mebresources/meb/ds"
	"github.com/OwenJacob/mebresources/meb/model"
	"github.com/julienschmidt/httprouter"
)

func GetApplicants(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()
	var err error

	// get applicants by industry
	// get applicants by location
	queryLimit := r.URL.Query().Get("limit")
	limit := 5
	if len(queryLimit) != 0 {
		limit, err = strconv.Atoi(queryLimit)
		if err != nil {
			limit = 5
		}
	}
	query := datastore.NewQuery("applicant").Limit(limit)

	var applicants []*model.Applicant
	keys, err := ds.Client.GetAll(ctx, query, &applicants)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for i, key := range keys {
		keyName := strconv.FormatInt(key.ID, 10)
		applicants[i].ID = keyName
		applicants[i].JobCount = len(applicants[i].JobKeys)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(applicants)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func GetApplicant(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	applicantID := ps.ByName("id")
	id, err := strconv.ParseInt(applicantID, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	key := datastore.IDKey("applicant", id, nil)
	getApplicant := new(model.Applicant)
	err = ds.Client.Get(ctx, key, getApplicant)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	getApplicant.ID = applicantID
	getApplicant.JobCount = len(getApplicant.JobKeys)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(getApplicant)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PutApplicant(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var updateApplicant model.Applicant
	err := json.NewDecoder(r.Body).Decode(&updateApplicant)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := strconv.ParseInt(updateApplicant.ID, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	key := datastore.IDKey("applicant", id, nil)

	tx, err := ds.Client.NewTransaction(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var updatedApplicant model.Applicant
	if err := tx.Get(key, &updatedApplicant); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Update applicant details here
	updatedApplicant.FirstName = updateApplicant.FirstName
	updatedApplicant.MiddleName = updateApplicant.MiddleName
	updatedApplicant.LastName = updateApplicant.LastName
	updatedApplicant.Email = updateApplicant.Email
	updatedApplicant.Phone = updateApplicant.Phone
	updatedApplicant.AddressStreet = updateApplicant.AddressStreet
	updatedApplicant.AddressCity = updateApplicant.AddressCity
	updatedApplicant.AddressZip = updateApplicant.AddressZip
	updatedApplicant.AddressState = updateApplicant.AddressState
	updatedApplicant.PreferredLocationKeys = updateApplicant.PreferredLocationKeys
	updatedApplicant.PreferredIndustryKeys = updateApplicant.PreferredIndustryKeys
	updatedApplicant.Updated = time.Now()

	if _, err := tx.Put(key, &updatedApplicant); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err := tx.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	updatedApplicant.ID = updateApplicant.ID

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(updatedApplicant)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
