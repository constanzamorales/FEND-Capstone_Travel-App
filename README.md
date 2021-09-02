# Front-End Developer Nanodegree - Capstone Project

## 1. What is this about?
This is the final project in the Front-End Developer Nanodegree by Udacity. It combines everything the nanodegree teaches and then some.

##### a. User scenario
You just took a few days off work and you want to visit a particular city, but you need to know what the weather is/will be like so you can pack appropriate clothes.

##### b. User tasks
1. Enter start and end date of your vacation.
2. Enter the city you want to visit.
3. Click Search button.

##### c. Expected outcomes
The app displays:
1. City name, country name.
2. Min and max temperatures within a date range.
3. A photo of the city the user entered.

## 2. How does it work?
1. App takes the three inputs: Start date, end date, city name.
2. Then with the city name, the app makes a request to Geonames API to get the latitude and longitude.
3. The coordinates previously requested along with the dates the user entered are used to make a request to Weatherbit API* to get the weather within that range of days.
4. The city name is also used to make a request to the Pixabay API, to get a picture of the destination.

## 3. Technologies and resources used
1. HTML + CSS + JavaScript
2. Node, Express.js, Webpack, Babel, Luxon.js (for dates), Litepicker (for date picker)

## 4. How do I run this project?
Asuming you have everything listed in the package.json installed, you start the server with:
```npm start```
Run production mode:
```npm run build-prod```
Run development mode:
```npm run build-dev```

