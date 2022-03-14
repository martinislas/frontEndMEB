package admin

import (
	"encoding/json"
	"net/http"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/OwenJacob/mebresources/meb/ds"
	"github.com/OwenJacob/mebresources/meb/model"
	"github.com/julienschmidt/httprouter"
)

func GetIndustries(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	query := datastore.NewQuery("industry")

	var industries []*model.Industry
	keys, err := ds.Client.GetAll(ctx, query, &industries)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for i, industry := range industries {
		industry.Name = keys[i].Name
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(industries)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PutIndustry(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var updateIndustry model.Industry
	err := json.NewDecoder(r.Body).Decode(&updateIndustry)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	updateIndustryKey := datastore.NameKey("industry", updateIndustry.Name, nil)

	tx, err := ds.Client.NewTransaction(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var updatedIndustry model.Industry
	if err := tx.Get(updateIndustryKey, &updatedIndustry); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Update industry details here
	updatedIndustry.DisplayName = updateIndustry.DisplayName
	updatedIndustry.Updated = time.Now()

	if _, err := tx.Put(updateIndustryKey, &updatedIndustry); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err := tx.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	updatedIndustry.Name = updateIndustry.Name

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(updatedIndustry)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PostIndustry(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var newIndustry model.Industry
	err := json.NewDecoder(r.Body).Decode(&newIndustry)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	newIndustry.Created = time.Now()
	newIndustry.Updated = time.Now()

	newIndustryKey := datastore.NameKey("industry", newIndustry.Name, nil)
	_, err = ds.Client.RunInTransaction(ctx, func(tx *datastore.Transaction) error {
		// We first check that there is no entity stored with the given key.
		var empty model.Industry
		if err := tx.Get(newIndustryKey, &empty); err != datastore.ErrNoSuchEntity {
			return err
		}
		// If there was no matching entity, store it now.
		_, err := tx.Put(newIndustryKey, &newIndustry)
		return err
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(newIndustry)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func GetLocations(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	query := datastore.NewQuery("location")

	var locations []*model.Location
	keys, err := ds.Client.GetAll(ctx, query, &locations)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for i, location := range locations {
		location.Name = keys[i].Name
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(locations)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PutLocation(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var updateLocation model.Location
	err := json.NewDecoder(r.Body).Decode(&updateLocation)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	updateLocationKey := datastore.NameKey("location", updateLocation.Name, nil)

	tx, err := ds.Client.NewTransaction(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var updatedLocation model.Location
	if err := tx.Get(updateLocationKey, &updatedLocation); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Update location details here
	updatedLocation.Name = updateLocation.Name
	updatedLocation.Updated = time.Now()

	if _, err := tx.Put(updateLocationKey, &updatedLocation); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err := tx.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	updatedLocation.Name = updateLocation.Name

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(updatedLocation)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PostLocation(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var newLocation model.Location
	err := json.NewDecoder(r.Body).Decode(&newLocation)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	newLocationKey := datastore.NameKey("location", newLocation.Name, nil)
	_, err = ds.Client.RunInTransaction(ctx, func(tx *datastore.Transaction) error {
		// We first check that there is no entity stored with the given key.
		var empty model.Location
		if err := tx.Get(newLocationKey, &empty); err != datastore.ErrNoSuchEntity {
			return err
		}
		// If there was no matching entity, store it now.
		_, err := tx.Put(newLocationKey, &newLocation)
		return err
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(newLocation)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
