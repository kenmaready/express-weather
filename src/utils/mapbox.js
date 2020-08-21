const request = require("request");
const { mapboxApiKey } = require("./secrets.js");

const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const limit = "1";

const apiRequestBuilder = (location) => {
    const URIzedLocation = encodeURIComponent(location.trim());
    return baseUrl + URIzedLocation + ".json?access_token=" + mapboxApiKey;
};

const geocode = (address, callback) => {
    const url = apiRequestBuilder(address);

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services.", undefined);
        } else if (response.statusCode != 200) {
            callback(response.statusMessage);
        } else if (response.body.features.length === 0) {
            callback("No valid locations for this query.");
        } else {
            const locationData = response.body.features[0];
            const lat = locationData.center[1];
            const long = locationData.center[0];
            const loc = locationData.place_name;
            callback(undefined, {
                latitude: lat,
                longitude: long,
                location: loc,
            });
        }
    });
};

module.exports = { apiRequestBuilder, geocode };
