import fetch from 'node-fetch';
import { setDuration } from './tripDuration';
const { DateTime } = require("luxon");

// Reset values when reloading page
window.onload = function () {
    setOneColumn();
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
            document.getElementById('data').textContent = `${res[0].data[0].temp}°C`
        })
}

const setOneColumn = () => {
    const inputs = document.getElementById('inputs');
    inputs.classList.add('no-results');
}

export { handleSubmit }