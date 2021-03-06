const request = require("request");

const weatherstackApiKey =
    process.env.WEATHERSTACK_API_KEY ||
    require("./secrets.js").weatherstackApiKey;
const baseUrl = "http://api.weatherstack.com/";

const apiRequestBuilder = ({ latitude, longitude }) => {
    const query = latitude + "," + longitude;

    return (
        baseUrl +
        "/current?access_key=" +
        weatherstackApiKey +
        "&query=" +
        query +
        "&units=f"
    );
};

const getCurrentWeather = (location, callback) => {
    const url = apiRequestBuilder(location);

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather services.", undefined);
        } else if (body.success === false) {
            callback(
                "Unable to get weather information for location provided.",
                undefined
            );
        } else {
            const {
                temperature,
                weather_descriptions,
                wind_speed,
            } = body.current;
            callback(undefined, {
                temperature: temperature,
                description: weather_descriptions[0],
                windspeed: wind_speed,
            });
        }
    });
};

module.exports = { apiRequestBuilder, getCurrentWeather };
