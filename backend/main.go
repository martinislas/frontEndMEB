package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/datastore"
	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	"github.com/OwenJacob/mebresources/meb"
	"github.com/OwenJacob/mebresources/meb/ds"
	"github.com/OwenJacob/mebresources/meb/secrets"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	ctx := context.Background()
	var err error

	// Create a datastore client. In a typical application, you would create
	// a single client which is reused for every datastore operation.
	ds.Client, err = datastore.NewClient(ctx, "meb-resources")
	if err != nil {
		log.Fatal(err)
	}
	defer ds.Client.Close()

	secrets.Client, err = secretmanager.NewClient(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer secrets.Client.Close()

	err = http.ListenAndServe(":"+port, meb.Router())
	if err != nil {
		log.Fatal(err)
	}
}
