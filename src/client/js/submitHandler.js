//import fetch from 'node-fetch';
import { setDuration } from './tripDuration';
import { postData } from './postData';
import { displayWeather } from './displayWeather';

const { DateTime } = require("luxon");
const loader = document.getElementById('loading');
const results = document.getElementById('results');

// Reset values when reloading page
window.onload = function () {
    document.getElementById('city').value = "";
    document.getElementById('pickerstart').value = DateTime.now().toISODate();
    document.getElementById('pickerend').value = 'YYYY-MM-DD';
    
}

function handleSubmit(event) {
    event.preventDefault()
    results.classList.remove('hide');
    loader.classList.remove('hide');
    // Save duration value in a variable
    const duration = setDuration();
    const userInput = document.getElementById('city').value;
    postData(userInput, duration)
    .then((res) => {
        console.log(res);
        const cityName = `${res[2].geonames[0].toponymName}`;
        const countryName = `${res[2].geonames[0].countryName}`;

        loader.classList.add('hide');
        showContent('destination-pic');

        // Posting image
        img.setAttribute('src', `${res[1].hits[0].largeImageURL}`);
        img.setAttribute('alt', `Photo of ${res[2].geonames[0].toponymName}`)

        // Posting destination name in title and figcaption
        document.getElementById('location').textContent = `${cityName}, ${countryName}`;
        document.getElementById('figcaption').textContent = `${cityName}, ${countryName}`;

        // Posting weather
        displayWeather(duration, res);
    })
}



const showContent = (id) => {
    const inputs = document.getElementById(id);
    inputs.classList.remove('hide');
}


export { handleSubmit }