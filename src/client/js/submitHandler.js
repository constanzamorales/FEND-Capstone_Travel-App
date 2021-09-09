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

            // Posting image
            img.setAttribute('src', `${res[1].hits[0].largeImageURL}`);
            img.setAttribute('alt', `Photo of ${res[2].geonames[0].toponymName}`)

            // Posting destination name in title and figcaption
            document.getElementById('location').textContent = `${res[2].geonames[0].toponymName}, ${res[2].geonames[0].countryName}`;
            document.getElementById('figcaption').textContent = `${res[2].geonames[0].toponymName}, ${res[2].geonames[0].countryName}`;
            
            // Posting weather
            if (duration >= 7 && duration <= 16) {
                document.getElementById('forecast-title').textContent = 'Forecast';
                const icon = document.getElementById('current-icon');
                icon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${res[0].data[0].weather.icon}.png`);
                icon.setAttribute('alt', `${res[0].data[0].weather.description} icon`);
                document.getElementById('current-temp').textContent = `${res[0].data[0].temp}°C`;
                document.getElementById('description').textContent = `${res[0].data[0].weather.description}`;

                // Get forecast with a loop
                let days = '';
                for (let i = 0; i < duration; i++) {
                    // Formatting date for forecast
                    const date = res[0].data[i].datetime;
                    const dateFormatted = DateTime.fromISO(date).toLocaleString({ month: 'short', day: 'numeric' });

                    // Adding days along with min and max temperatures
                    days += `<div class="day"><ul><li>${dateFormatted}</li>
                    <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${res[0].data[i].weather.icon}.png">
                    <li class="max-temp">${res[0].data[i].max_temp}°</li>
                    <li class="min-temp">${res[0].data[i].min_temp}°</li></ul></div>`;
                    document.getElementById('forecast-weather').innerHTML = days;
                }
            }
            else if (duration > 0 && duration < 7) {
                const icon = document.getElementById('current-icon');
                icon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${res[0].data[0].weather.icon}.png`);
                icon.setAttribute('alt', `${res[0].data[0].weather.description} icon`);
                document.getElementById('current-temp').textContent = `${res[0].data[0].temp}°C`;
                document.getElementById('description').textContent = `${res[0].data[0].weather.description}`;
            }
            else {
                alert('Please enter a valid duration: 1 day min, 16 days max. Thank you :)');
            }

        })

}


const showContent = (id) => {
    const inputs = document.getElementById(id);
    inputs.classList.remove('hide');
}


export { handleSubmit }