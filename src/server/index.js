projectData = {};

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
//const weatherbitKey = process.env.WEATHERBIT_KEY;
//const geonamesKey = process.env.GEONAMES_KEY;

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
    const weatherbitKey = process.env.WEATHERBIT_KEY;
    const geonamesKey = process.env.GEONAMES_KEY;
    const city = request.body.userInput;
    getCoordinates(city, geonamesKey).then((city) => {
        getWeather(city.geonames[0].lat, city.geonames[0].lng, weatherbitKey).then((weather) =>{
            try {const newData = await weather.json();
            response.send(newData);
            }
            catch(error) {
                console.log(error);
            }
        })
    })
    
};

const getCoordinates = (city, key) => {
    const geonamesResponse = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${key}`);
    try {
        const city = await geonamesResponse.json();
        console.log(city);
        return city;
    }
    catch (error) {
        console.log('Error in getCoordinates function: ', error);
    }
}
const getWeather = (lat, lon, key) => {
    const weatherbitResponse = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}`);
    try {
        const weather = await weatherbitResponse.json();
        console.log(weather);
        return weather;
    }
    catch (error) {
        console.log('Error in the getWeather function: ', error);
    }
}