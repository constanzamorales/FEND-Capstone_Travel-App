const { DateTime } = require("luxon");
let dateTime = DateTime.local();
console.log("Current Date", dateTime.toISO());

function handleSubmit(event) {
    event.preventDefault();

    const userInput = document.getElementById('city').value;
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