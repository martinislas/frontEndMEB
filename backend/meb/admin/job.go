package admin

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/OwenJacob/mebresources/meb/ds"
	"github.com/OwenJacob/mebresources/meb/middleware"
	"github.com/OwenJacob/mebresources/meb/model"
	"github.com/julienschmidt/httprouter"
)

func GetJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var getJob model.Job
	err := json.NewDecoder(r.Body).Decode(&getJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := strconv.ParseInt(getJob.ID, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	key := datastore.IDKey("job", id, nil)
	gotJob := new(model.Job)
	err = ds.Client.Get(ctx, key, getJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	gotJob.ID = getJob.ID

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(gotJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PutJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var updateJob model.Job
	err := json.NewDecoder(r.Body).Decode(&updateJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := strconv.ParseInt(updateJob.ID, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	key := datastore.IDKey("job", id, nil)

	tx, err := ds.Client.NewTransaction(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var updatedJob model.Job
	if err := tx.Get(key, &updatedJob); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Update job details here
	updatedJob.Name = updateJob.Name
	updatedJob.Description = updateJob.Description
	updatedJob.Salary = updateJob.Salary
	updatedJob.LocationKey = updateJob.LocationKey
	updatedJob.IndustryKey = updateJob.IndustryKey
	updatedJob.Active = updateJob.Active
	updatedJob.Updated = time.Now()

	if _, err := tx.Put(key, &updatedJob); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err := tx.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	updatedJob.ID = updateJob.ID

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(updatedJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PostJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	adminDisplay := ctx.Value(middleware.AdminDisplayCtx).(string)

	var newJob model.Job
	err := json.NewDecoder(r.Body).Decode(&newJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	newJob.PostedBy = adminDisplay
	newJob.Active = true
	newJob.Created = time.Now()
	newJob.Updated = time.Now()

	key := datastore.IncompleteKey("job", nil)
	storedKey, err := ds.Client.Put(ctx, key, &newJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	newJob.ID = strconv.FormatInt(storedKey.ID, 10)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(newJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
