console.log("Client side javascript loaded...");

const BASE_URL = window.location.origin;
const URL_EXTENSION = "weather";

const locationForm = document.querySelector("form");
const searchBar = document.querySelector("input");
const text1 = document.getElementById("weather-text-1");
const text2 = document.getElementById("weather-text-2");

locationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchBar.value;
    console.log("I've been submitted. Searching for: " + location);
    text1.textContent = "";
    text2.textContent = "loading...";
    fetchWeather(location);
});

const fetchWeather = (location) => {
    fetch(`${BASE_URL}/${URL_EXTENSION}?address=${location}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (!data.success) {
                console.log("Error: " + data.message);
                text2.textContent = "Unable to obtain data. Try again.";
            } else {
                text1.textContent = data.location + ":";
                text2.textContent = data.forecast;
            }
        });
};
