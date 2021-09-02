var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

const app = express();

dotenv.config();

// API keys
const pixabayKey = process.env.PIXABAY_KEY;
const weatherbitKey = process.env.WEATHERBIT_KEY;
const geonamesKey = process.env.GEONAMES_KEY;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

const port = 8081;
const server = app.listen(port, () => {
    console.log(`Running on ${port} :D`);
});

app.get('/', function (request, response) {
    response.sendFile(path.resolve('dist/index.html'))
});


app.post('/appData', addData);
async function addData(request, response) {


    const callGeonames = (input, key) => {
        await fetch(`http://api.geonames.org/searchJSON?q=${input}&maxRows=1&username=${key}`);
        try {
            const lat = response.geonames[0].lat;
            const lon = response.geonames[0].lng;
            console.log(lat, lon);
            return (lat, lon);
        }
        catch (error) {
            console.log(error);
        }
    }

    const callWeatherbit = (lat, lon, key) => {
        await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}`);
        try {
            const res = await res.json();
            console.log(res);
        }
        catch (error) {
            console.log(error);
        }
    }

    const userInput = request.body.userInput;
    callGeonames(userInput, geonamesKey)
    .then((lat, lon) => {
        callWeatherbit(lat, lon)
        .then((res) => {
            console.log(res);
        })
    })





    /*
    // Geonames API
    const geonamesURL = `http://api.geonames.org/searchJSON?q=${request.body.userInput}&maxRows=1&username=${geonamesKey}`;

    const geonamesRes = await fetch(geonamesURL);
    try {
        const newData = await geonamesRes.json();
        response.send(newData);
    }
    catch (error) {
        console.log('Error: ', error);
    }

    
    // Weatherbit API
    const weatherbitURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}`;

    const weatherbitRes = await fetch(weatherbitURL);
    try {
        const newData = await weatherbitRes.json();
        response.send(newData);
    }
    catch (error) {
        console.log('Error: ', error);
    }
    */
};

