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

app.post('/locationData', getData);
async function getData(request, response) {
    const res = await fetch(`http://api.geonames.org/searchJSON?q=${request.body.userInput}&maxRows=1&username=${geonamesKey}`);
    try {
        // const newData = await res.json();
        const newData = await res; // Response already comes as a JSON 
        response.send(newData);
    }
    catch (error) {
        console.log('Error: ', error);
    }
};