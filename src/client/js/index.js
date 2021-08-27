var path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

const app = express();

dotenv.config();
// const apiKey = process.env.API_KEY;

app.use(cors());

// Middleware
app.user(express.urlencoded({ extended: false }));
app.user(express.json());

app.use(express.static('dist'));

const port = 8081;
const server = app.listen(port, () => {
    console.log(`Running on ${port} :D`);
});

app.get('/', function (request, response) {
    response.sendFile(path.resolve('dist/index.html'))
});

app.post('/addData', addData);
async function addData(request, response) {
    const res = await fetch(`https://`);
    try {
        const newData = await res.json();
        response.send(newData);
    }
    catch (error) {
        console.log('Error: ', error);
    }
};