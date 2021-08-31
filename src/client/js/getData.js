function getCity(event) {
    event.preventDefault();

    let userInput = document.getElementById('city').value;
    fetch('http://localhost:8081/appData', {
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
        /*
        const lat = res.geonames[0].lat;
        const lon = res.geonames[0].lng;
        console.log(lat, lon);
        */
    })
}

export { getCity }