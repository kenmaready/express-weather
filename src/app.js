const path = require("path");
const express = require("express");
const hbs = require("hbs");

const getForecast = require("./getForecast");

const app = express();
const PORT = process.env.PORT || 3000;

// define paths for Express configs
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../pages/views");
const partialsPath = path.join(__dirname, "../pages/partials");

// set handlebars engine and views location:
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve:
app.use(express.static(publicDirectoryPath));

// routes:
app.get("", (req, res) => {
    res.render("index", {
        title: "Welcome to express weather.",
        name: "ken maready",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me.",
        name: "ken maready",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help.",
        message:
            "To get weather for a particular location, enter that location in the input bar on the home page.",
        name: "ken maready",
    });
});

app.get("/weather", (req, res) => {
    console.log(req.query);
    if (!req.query.address) {
        res.send({
            success: false,
            message: "you must provide an 'address' search term",
        });
    } else {
        const data = getForecast(req.query.address, (data) => {
            res.send(data);
        });
    }
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404.",
        message:
            "Lookin' for help? You came to the wrong place, kid. Try again.",
        name: "ken maready",
    });
});

app.get("/*", (req, res) => {
    res.render("404", {
        title: "404.",
        message: "Page not found. You've lost the path, kid. Try again.",
        name: "ken maready",
    });
});

app.listen(PORT, () => {
    console.log("Express server is up on port " + PORT + ".");
});
