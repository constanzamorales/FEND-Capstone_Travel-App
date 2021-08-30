function getCity(event) {
    event.preventDefault();

    let userInput = document.getElementById('city').value;
    fetch('http://localhost:8081/weatherData', {
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
        // const lat = res.data[0].lat;
        // const long = res.data[0].lon;
        // Here goes the function call to convert lat and lon to city
        // convertLocation(res.data[0].lat, res.data[0].lon);
        document.getElementById('results').textContent = res.data[0].app_temp;
    })
}

export { getCity }