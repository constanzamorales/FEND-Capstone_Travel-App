import fetch from 'node-fetch';
import { setDuration } from './tripDuration';
const { DateTime } = require("luxon");

// Reset values when reloading page
window.onload = function () {
    document.getElementById('city').value = "";
    document.getElementById('pickerstart').value = DateTime.now().toISODate();
    document.getElementById('pickerend').value = 'YYYY-MM-DD';
}

function handleSubmit(event) {
    event.preventDefault()
    // Save duration value in a variable
    const duration = setDuration();
    const userInput = document.getElementById('city').value;

    fetch('http://localhost:8081/appData', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput, duration }),
    })
        .then(res => res.json())
        .then(function(res) {
            console.log(res);

            showContent('results');
            showContent('destination-pic');

            img.setAttribute('src', `${res[1].hits[1].largeImageURL}`);
            document.getElementById('location').textContent = `${res[2].geonames[0].toponymName}, ${res[2].geonames[0].countryName}`;
            
            if (duration >= 7) {
                document.getElementById('current').textContent = `${res[0].data[0].temp}°C`;
                document.getElementById('forecast-title').textContent = 'Forecast';
                // Get forecast with a loop
                let days = '';
                for (let i = 0; i < duration; i++) {
                    const date = res[0].data[i].datetime;
                    const dateFormatted = date.toLocaleString({ month: 'long', day: 'numeric' });
                    console.log(dateFormatted);
                    days += `<div class="day"><ul><li>${dateFormatted}</li><li>${res[0].data[i].max_temp}°</li><li>${res[0].data[i].min_temp}°</li></ul></div>`;
                    document.getElementById('forecast-weather').innerHTML = days;
                }
            }
            else if (duration > 0 && duration < 7) {
                document.getElementById('figcaption').textContent = `${res[0].data[0].city_name}, ${res[0].data[0].country_code}`;
                document.getElementById('current').textContent = `${res[0].data[0].temp}°C`;
            }

        })

}


const showContent = (id) => {
    const inputs = document.getElementById(id);
    inputs.classList.remove('hide');
}


export { handleSubmit }