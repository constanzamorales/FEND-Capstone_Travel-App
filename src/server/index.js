var path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

const app = express();

dotenv.config();

// API keys
const pixabayKey = process.env.PIXABAY_KEY;
const weatherbitKey = process.env.WEATHERBIT_KEY;
const geonamesKey = process.env.GEONAMES_KEY;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(express.static('dist'));

const port = 8081;
const server = app.listen(port, () => {
    console.log(`Running on ${port} :D`);
});

app.get('/', function (request, response) {
    response.sendFile(path.resolve('dist/index.html'))
});

app.post('/weatherData', addWeather);
async function addWeather(request, response) {
    const res = await fetch(`https://api.weatherbit.io/v2.0/current?city=${request.body.userInput}&key=${weatherbitKey}`);
    try {
        const newData = await res.json();
        response.send(newData);
    }
    catch (error) {
        console.log('Error: ', error);
    }
};