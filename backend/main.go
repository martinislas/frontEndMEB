package main

import (
	"log"
	"net/http"
	"os"

	"github.com/OwenJacob/mebresources/meb"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	err := http.ListenAndServe(":"+port, meb.Router())
	if err != nil {
		log.Fatal(err)
	}
}
