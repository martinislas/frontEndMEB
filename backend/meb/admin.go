package meb

import (
	"encoding/json"
	"net/http"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/golang-jwt/jwt/v4"
	"github.com/julienschmidt/httprouter"
	"golang.org/x/crypto/bcrypt"
)

var hmacSampleSecret = "Asecret" // This should come from GCP secret manager

type AdminUser struct {
	FirstName      string    `json:"first_name" datastore:"first_name,noindex"`
	Surname        string    `json:"surname" datastore:"surname,noindex"`
	Username       string    `json:"username" datastore:"username"`
	Password       string    `json:"password" datastore:"-"`
	HashedPassword []byte    `json:"-" datastore:"password,noindex"`
	ResetPassword  bool      `json:"reset_password" datastore:"reset_password,noindex"`
	IsActive       bool      `json:"is_active" datastore:"is_active"`
	Created        time.Time `json:"created" datastore:"created,noindex"`
	Updated        time.Time `json:"updated" datastore:"updated,noindex"`
}

type Session struct {
	Token string `json:"token"`
}

func postNewAdminUser(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var newAdmin AdminUser
	err := json.NewDecoder(r.Body).Decode(&newAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	newAdmin.HashedPassword, err = bcrypt.GenerateFromPassword([]byte(newAdmin.Password), 10)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	newAdmin.IsActive = true
	newAdmin.Created = time.Now()
	newAdmin.Updated = time.Now()

	newAdminKey := datastore.NameKey("admin", newAdmin.Username, nil)
	_, err = dsClient.RunInTransaction(ctx, func(tx *datastore.Transaction) error {
		// We first check that there is no entity stored with the given key.
		var empty AdminUser
		if err := tx.Get(newAdminKey, &empty); err != datastore.ErrNoSuchEntity {
			return err
		}
		// If there was no matching entity, store it now.
		_, err := tx.Put(newAdminKey, &newAdmin)
		return err
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(newAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func postLoginAdminUser(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var loginAdmin AdminUser
	err := json.NewDecoder(r.Body).Decode(&loginAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(loginAdmin.Username) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if len(loginAdmin.Password) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	loginAdminKey := datastore.NameKey("admin", loginAdmin.Username, nil)
	err = dsClient.Get(ctx, loginAdminKey, &loginAdmin)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		return
	}

	authorised := bcrypt.CompareHashAndPassword(loginAdmin.HashedPassword, []byte(loginAdmin.Password))
	if authorised != nil {
		w.WriteHeader(http.StatusForbidden)
		return
	}

	// Create a new token object
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"usr": loginAdmin.Username,
		"iat": time.Now(),
		"exp": time.Now().AddDate(0, 0, 2),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(hmacSampleSecret))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session := Session{
		Token: tokenString,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(session)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
