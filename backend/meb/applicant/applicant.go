package applicant

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

// var hmacApplicantSecret = "applicantSecret" // This should come from GCP secret manager

// // Session is the response of LoginAdmin
// type Session struct {
// 	Token string `json:"token"`
// }

// func LoginApplicant(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	ctx := r.Context()

// 	var loginApplicant model.Applicant
// 	err := json.NewDecoder(r.Body).Decode(&loginApplicant)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	if len(loginApplicant.Email) == 0 {
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}
// 	if len(loginApplicant.Password) == 0 {
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	query := datastore.NewQuery("applicant").Filter("email =", loginApplicant.Email)

// 	var foundApplicants []*model.Applicant
// 	keys, err := ds.Client.GetAll(ctx, query, &foundApplicants)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// More than 1 applicant found - something has gone wrong
// 	if len(keys) > 1 {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// No applicants found - invalid login credentials
// 	if len(keys) == 0 {
// 		w.WriteHeader(http.StatusUnauthorized)
// 		return
// 	}

// 	err = ds.Client.Get(ctx, keys[0], &loginApplicant)
// 	if err != nil {
// 		w.WriteHeader(http.StatusUnauthorized)
// 		return
// 	}

// 	authorised := bcrypt.CompareHashAndPassword(loginApplicant.HashedPassword, []byte(loginApplicant.Password))
// 	if authorised != nil {
// 		w.WriteHeader(http.StatusUnauthorized)
// 		return
// 	}

// 	loginApplicant.ID = strconv.FormatInt(keys[0].ID, 10)

// 	// Create a new token object
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"id":          loginApplicant.ID,
// 		"displayname": loginApplicant.FirstName,
// 		"issued":      time.Now(),
// 		"expiry":      time.Now().AddDate(0, 1, 0),
// 	})

// 	// Sign and get the complete encoded token as a string using the secret
// 	tokenString, err := token.SignedString([]byte(hmacApplicantSecret))
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	session := Session{
// 		Token: tokenString,
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	err = json.NewEncoder(w).Encode(session)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// }

// type ExistingApplicant struct {
// 	ApplicantIsExisting bool `json:"applicant_is_existing"`
// }

// func GetExistingCheck(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	ctx := r.Context()

// 	var loginApplicant model.Applicant
// 	err := json.NewDecoder(r.Body).Decode(&loginApplicant)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	if len(loginApplicant.Email) == 0 && len(loginApplicant.Phone) == 0 {
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	query := datastore.NewQuery("applicant").Filter("email =", loginApplicant.Email).Filter("phone =", loginApplicant.Phone)

// 	var foundApplicants []*model.Applicant
// 	keys, err := ds.Client.GetAll(ctx, query, &foundApplicants)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// More than 1 applicant found - something has gone wrong
// 	if len(keys) > 1 {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	isExisting := false

// 	// Applicant found
// 	if len(keys) == 1 {
// 		isExisting = true
// 	}

// 	response := ExistingApplicant{
// 		ApplicantIsExisting: isExisting,
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	err = json.NewEncoder(w).Encode(response)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// }

// func GetApplicant(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	ctx := r.Context()

// 	applicantID := ctx.Value(middleware.ApplicantIDCtx).(string)
// 	id, err := strconv.ParseInt(applicantID, 10, 64)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	applicantKey := datastore.IDKey("applicant", id, nil)

// 	applicant := new(model.Applicant)
// 	err = ds.Client.Get(ctx, applicantKey, applicant)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	applicant.ID = applicantID
// 	// Technically impossible to return through the model but best make sure not to return sensitive fields
// 	applicant.Password = ""
// 	applicant.HashedPassword = []byte{}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	err = json.NewEncoder(w).Encode(applicant)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// }

// func PutApplicant(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	ctx := r.Context()

// 	var updateApplicant model.Applicant
// 	err := json.NewDecoder(r.Body).Decode(&updateApplicant)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	updateApplicantID := ctx.Value(middleware.ApplicantIDCtx).(string)
// 	if updateApplicant.ID != updateApplicantID {
// 		http.Error(w, err.Error(), http.StatusForbidden)
// 		return
// 	}

// 	id, err := strconv.ParseInt(updateApplicant.ID, 10, 64)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	applicantKey := datastore.IDKey("applicant", id, nil)

// 	tx, err := ds.Client.NewTransaction(ctx)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	var updatedApplicant model.Applicant
// 	if err := tx.Get(applicantKey, &updatedApplicant); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// Update applicant details here
// 	updatedApplicant.FirstName = updateApplicant.FirstName
// 	updatedApplicant.MiddleName = updateApplicant.MiddleName
// 	updatedApplicant.LastName = updateApplicant.LastName
// 	updatedApplicant.Email = updateApplicant.Email
// 	updatedApplicant.Phone = updateApplicant.Phone
// 	updatedApplicant.AddressStreet = updateApplicant.AddressStreet
// 	updatedApplicant.AddressCity = updateApplicant.AddressCity
// 	updatedApplicant.AddressZip = updateApplicant.AddressZip
// 	updatedApplicant.AddressState = updateApplicant.AddressState
// 	updatedApplicant.PreferredLocationKeys = updateApplicant.PreferredLocationKeys
// 	updatedApplicant.PreferredIndustryKeys = updateApplicant.PreferredIndustryKeys
// 	updatedApplicant.Updated = time.Now()

// 	if _, err := tx.Put(applicantKey, &updatedApplicant); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	if _, err := tx.Commit(); err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// Technically impossible to return through the model but best make sure not to return sensitive fields
// 	updatedApplicant.Password = ""
// 	updatedApplicant.HashedPassword = []byte{}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	err = json.NewEncoder(w).Encode(updatedApplicant)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// }

// func PostNewApplicant(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
// 	ctx := r.Context()

// 	var newApplicant model.Applicant
// 	err := json.NewDecoder(r.Body).Decode(&newApplicant)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	if (len(newApplicant.Email) == 0 && len(newApplicant.Phone) == 0) || len(newApplicant.Password) == 0 {
// 		w.WriteHeader(http.StatusBadRequest)
// 		return
// 	}

// 	query := datastore.NewQuery("applicant").Filter("email =", newApplicant.Email).Filter("phone =", newApplicant.Phone)

// 	var foundApplicants []*model.Applicant
// 	keys, err := ds.Client.GetAll(ctx, query, &foundApplicants)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// We cannot create an applicant with a login method
// 	if len(keys) != 0 {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	newApplicant.HashedPassword, err = bcrypt.GenerateFromPassword([]byte(newApplicant.Password), 10)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	newApplicant.ResetPassword = false
// 	newApplicant.Created = time.Now()
// 	newApplicant.Updated = time.Now()

// 	key := datastore.IncompleteKey("applicant", nil)
// 	storedKey, err := ds.Client.Put(ctx, key, &newApplicant)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// 	newApplicant.ID = strconv.FormatInt(storedKey.ID, 10)

// 	// Technically impossible to return through the model but best make sure not to return sensitive fields
// 	newApplicant.Password = ""
// 	newApplicant.HashedPassword = []byte{}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	err = json.NewEncoder(w).Encode(newApplicant)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}
// }

func ApplyJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var application model.Application
	err := json.NewDecoder(r.Body).Decode(&application)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(application.Email) == 0 && len(application.Phone) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	applicantFound := false
	var applicantID int64

	if len(application.Phone) != 0 {
		phoneQuery := datastore.NewQuery("applicant").Filter("phone =", application.Phone)
		var foundPhoneApplicant []*model.Applicant
		keys, err := ds.Client.GetAll(ctx, phoneQuery, &foundPhoneApplicant)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// We have found an applicant with the same phone number
		if len(keys) == 1 {
			applicantFound = true
			applicantID = keys[0].ID
		}
	}

	if len(application.Email) != 0 && !applicantFound {
		emailQuery := datastore.NewQuery("applicant").Filter("email =", application.Email)
		var foundEmailApplicant []*model.Applicant
		keys, err := ds.Client.GetAll(ctx, emailQuery, &foundEmailApplicant)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// We have found an applicant with the same email
		if len(keys) == 1 {
			applicantFound = true
			applicantID = keys[0].ID
		}
	}

	if !applicantFound {
		// Create a New Applicant
		newApplicant := model.Applicant{
			Created:   time.Now(),
			Updated:   time.Now(),
			FirstName: application.FirstName,
			LastName:  application.LastName,
			Email:     application.Email,
			Phone:     application.Phone,
			JobKeys:   []string{application.JobID},
		}

		key := datastore.IncompleteKey("applicant", nil)
		storedKey, err := ds.Client.Put(ctx, key, &newApplicant)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		applicantID = storedKey.ID
	} else {
		// Update Existing Applicant
		applicantKey := datastore.IDKey("applicant", applicantID, nil)

		tx1, err := ds.Client.NewTransaction(ctx)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var applicant model.Applicant
		if err := tx1.Get(applicantKey, &applicant); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		//
		// Check job ID not already in list
		//

		// Add job ID
		applicant.JobKeys = append(applicant.JobKeys, application.JobID)
		applicant.Updated = time.Now()

		if _, err := tx1.Put(applicantKey, &applicant); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if _, err := tx1.Commit(); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	applicantKey := strconv.FormatInt(applicantID, 10)

	// Update Job
	jobID, err := strconv.ParseInt(application.JobID, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jobKey := datastore.IDKey("job", jobID, nil)

	tx2, err := ds.Client.NewTransaction(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var appliedJob model.Job
	if err := tx2.Get(jobKey, &appliedJob); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Add applicant ID
	appliedJob.ApplicantKeys = append(appliedJob.ApplicantKeys, applicantKey)
	appliedJob.Updated = time.Now()

	if _, err := tx2.Put(jobKey, &appliedJob); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err := tx2.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}
