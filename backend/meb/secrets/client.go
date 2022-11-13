package secrets

import (
	"context"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	secretmanagerpb "cloud.google.com/go/secretmanager/apiv1/secretmanagerpb"
)

var Client *secretmanager.Client

func GetAdminSecret() ([]byte, error) {
	ctx := context.Background()

	fetchedSecret, err := Client.GetSecret(ctx, &secretmanagerpb.GetSecretRequest{Name: "projects/meb-resources/secrets/admin-secret"})
	if err != nil {
		return []byte{}, err
	}

	return []byte(fetchedSecret.String()), nil
}
