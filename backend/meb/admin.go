package meb

import (
	"encoding/json"
	"net/http"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/google/uuid"
	"github.com/julienschmidt/httprouter"
	"golang.org/x/crypto/bcrypt"
)

type AdminUser struct {
	ID             uuid.UUID `json:"id" datastore:"-"`
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

func postNewAdminUser(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var newAdmin AdminUser
	err := json.NewDecoder(r.Body).Decode(&newAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	newAdmin.ID = uuid.New()
	newAdmin.HashedPassword, err = bcrypt.GenerateFromPassword([]byte(newAdmin.Password), 10)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	newAdmin.IsActive = true
	newAdmin.Created = time.Now()
	newAdmin.Updated = time.Now()

	newAdminKey := datastore.NameKey("admin", newAdmin.ID.String(), nil)
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
