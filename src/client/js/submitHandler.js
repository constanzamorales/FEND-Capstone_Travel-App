const { DateTime } = require("luxon");
import Litepicker from 'litepicker';
import fetch from 'node-fetch';


window.onload = function () {
    document.getElementById('city').value = "";
}

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

function handleSubmit(event) {
    event.preventDefault()
    let userInput = document.getElementById('city').value
    const startDate = DateTime.fromISO(document.getElementById('pickerstart').value);
    const endDate = DateTime.fromISO(document.getElementById('pickerend').value);

    let duration = endDate.diff(startDate, 'days');

    console.log(startDate);
    console.log(endDate);
    console.log(duration.values.days);
    fetch('http://localhost:8081/appData', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
    })
    .then(res => res.json())
    .then(function(res) {
        console.log(res);
        document.getElementById('results').textContent = `${res.data[0].temp}°C`;
    })

}

export { handleSubmit }