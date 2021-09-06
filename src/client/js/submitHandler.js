//import Litepicker from 'litepicker';
import fetch from 'node-fetch';
import { setDuration } from './tripDuration';


window.onload = function () {
    document.getElementById('city').value = "";
}

/*
// Setting up date picker
const tomorrow = DateTime.now().plus({ days: 1 });
const picker = new Litepicker({
    element: document.getElementById('pickerstart'),
    elementEnd: document.getElementById('pickerend'),
    singleMode: false,
    allowRepick: true,
    autoRefresh: true,
    minDate: tomorrow,
    tooltipNumber: (totalDays) => {
        return totalDays - 1;
    }
});
*/

function handleSubmit(event) {
    event.preventDefault()
    // Save duration value in a variable
    const duration = setDuration();
    console.log(duration);
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
        document.getElementById('results').textContent = `${res.data[0].temp}°C`;
    })

}

export { handleSubmit }