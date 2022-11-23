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

func GetJobs(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()
	var err error

	// get jobs by industry
	// get jobs by location
	// get jobs by active

	// 
	// This needs flipping in terms of created date !!!
	// 

	query := datastore.NewQuery("job")

	var jobs []*model.Job
	keys, err := ds.Client.GetAll(ctx, query, &jobs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for i, key := range keys {
		keyName := strconv.FormatInt(key.ID, 10)
		jobs[i].ID = keyName
		jobs[i].ApplicantCount = len(jobs[i].ApplicantKeys)

		locationKey := datastore.NameKey("location", jobs[i].LocationKey, nil)
		var location model.Location
		if err := ds.Client.Get(ctx, locationKey, &location); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		industryKey := datastore.NameKey("industry", jobs[i].IndustryKey, nil)
		var industry model.Industry
		if err := ds.Client.Get(ctx, industryKey, &industry); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		jobs[i].Location = location.DisplayName
		jobs[i].Industry = industry.DisplayName
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(jobs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func GetJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	jobID := ps.ByName("id")
	id, err := strconv.ParseInt(jobID, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	key := datastore.IDKey("job", id, nil)
	getJob := new(model.Job)
	err = ds.Client.Get(ctx, key, getJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	getJob.ID = jobID
	getJob.ApplicantCount = len(getJob.ApplicantKeys)

	locationKey := datastore.NameKey("location", getJob.LocationKey, nil)
	var location model.Location
	if err := ds.Client.Get(ctx, locationKey, &location); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	industryKey := datastore.NameKey("industry", getJob.IndustryKey, nil)
	var industry model.Industry
	if err := ds.Client.Get(ctx, industryKey, &industry); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	getJob.Location = location.DisplayName
	getJob.Industry = industry.DisplayName

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(getJob)
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

	locationKey := datastore.NameKey("location", newJob.LocationKey, nil)
	var location model.Location
	if err := ds.Client.Get(ctx, locationKey, &location); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	industryKey := datastore.NameKey("industry", newJob.IndustryKey, nil)
	var industry model.Industry
	if err := ds.Client.Get(ctx, industryKey, &industry); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	newJob.Location = location.DisplayName
	newJob.Industry = industry.DisplayName
	newJob.PostedBy = adminDisplay
	newJob.Active = false
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
