const mapbox = require("./utils/mapbox");
const weatherstack = require("./utils/weatherstack");

const getForecast = (address, callback) => {
    mapbox.geocode(address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            callback({ success: false, message: error });
            return;
        }

        weatherstack.getCurrentWeather(
            { latitude, longitude },
            (error, { temperature, description, windspeed } = {}) => {
                if (error) {
                    callback({ success: false, message: error });
                    return;
                }

                const forecast =
                    description +
                    ". It's currently " +
                    temperature +
                    "\u00B0.  Winds are currently blowing at " +
                    windspeed +
                    "mph.";
                callback({
                    success: true,
                    address,
                    location,
                    forecast,
                    windspeed,
                });
                return;
            }
        );
    });
};

module.exports = getForecast;
