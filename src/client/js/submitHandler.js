const { DateTime } = require("luxon");
import Litepicker from 'litepicker';

const userInput = document.getElementById('city').value;
const startDate = document.getElementById('pickerstart').value;
const endDate = document.getElementById('pickerend').value;

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
});

const handleSubmit = function(event) {
    event.preventDefault();

    // Dates
    console.log(startDate);
    console.log(endDate);
    
    fetch('http://localhost:8081/appData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput }),
    })
        .then(res => res.json())
        .then(function (res) {
            console.log(res);
        })
}



export { handleSubmit }