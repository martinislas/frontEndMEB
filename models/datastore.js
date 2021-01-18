const {Datastore} = require('@google-cloud/datastore');

module.exports = () => {
    // Instantiate a datastore client
    return new Datastore();
}