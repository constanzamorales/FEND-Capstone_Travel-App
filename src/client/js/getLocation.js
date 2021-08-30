import { convertLocation } from './convertLocation'

function getLocation(event) {
    event.preventDefault();

    let userInput = document.getElementById('city').value;
    fetch('http://localhost:8081/locationData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput }),
    })
    .then(res => res.json())
    .then(function(res) {
        console.log(res);
        
        // document.getElementById('results').textContent = city;
    })
}

export { getLocation }