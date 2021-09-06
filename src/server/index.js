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


/*
app.post('/appImages', async (request, response) => {
    const city = request.body.userInput;
    console.log(request.body);
    getCoordinates(city, geonamesKey).then((cityData) => {
        const country = cityData.geonames[0].countryName;
        console.log(request.body.country);
        getImage(city, country, pixabayKey).then((image) => {
            try {
                response.send(image);
            }
            catch (error) {
                console.log(error);
            }
        })
    })
});
*/

app.post('/appData', addData);
async function addData(request, response) {
    const city = request.body.userInput;
    console.log(request.body);
    getCoordinates(city, geonamesKey).then((cityData) => {
        const country = cityData.geonames[0].countryName;
        console.log(country);
        const lat = cityData.geonames[0].lat;
        const lon = cityData.geonames[0].lng;
        const duration = request.body.duration;
        // console.log(request.body);
        getImage(city, country, pixabayKey).then((image) => {
            console.log(image);
            getWeather(lat, lon, weatherbitKey, duration).then((weather) =>{
                try {
                    response.send([weather, image]);
                }
                catch (error) {
                    console.log('Error in the addData function: ',error);
                }
            })
        })
    })
};


// [Geonames API] Get the coordinates for the city the user entered
async function getCoordinates(city, key) {
    const geonamesResponse = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${key}`);
    try {
        const cityData = await geonamesResponse.json();
        return cityData;
    }
    catch (error) {
        console.log('Error in getCoordinates function: ', error);
    }
}

// [Weatherbit API] Use the coordinates from the getCoordinates function to get the weather.
async function getWeather(lat, lon, key, duration) {
    // If the duration of the trip is equal or longer than 7 days, get the forecast.
    if (duration >= 7) {
        const weatherbitResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=${duration}&key=${key}`);
        try {
            const weather = await weatherbitResponse.json();
            return weather;
        }
        catch (error) {
            console.log('Error in the getWeather function: ', error);
        }
    } else
    if (duration > 0 && duration < 7) {
        const weatherbitResponse = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}`);
        try {
            const weather = await weatherbitResponse.json();
            return weather;
        }
        catch (error) {
            console.log('Error in the getWeather function: ', error);
        }
    } 
}

// [Pixabay API] Use city entered by user to get a picture of the location.
async function getImage(city, country, key) {
    const pixabayResponse = await fetch(`https://pixabay.com/api/?key=${key}&q=${city}+${country}&category=places&safesearch=true`);
    try {
        const image = await pixabayResponse.json();
        return image;
    }
    catch (error) {
        console.log('Error in the getImage function: ', error);
    }
}