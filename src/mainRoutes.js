const express = require('express');
const router = express.Router();

const cscAPIKey = process.env.CSC_API_KEY;
const rapidAPIKey = process.env.RAPID_API_KEY;
const owAPIKEY = process.env.OW_API_KEY;

// gets countries
router.get('/countries', async (req, res, next) => {

    try {
        const url = `https://api.countrystatecity.in/v1/countries`;

        let response = await fetch(url, {
            headers: { 'X-CSCAPI-KEY': cscAPIKey }
        });

        let countriesData = await response.json();

        res.status(200).json(countriesData);
    } catch (err) {
        console.error(err);
        res.status(500).json('/countries', err);
    }
    
});

// NOT IN uSE (BUGGED)
// router.get('/cities/:country', async (req, res, next) => {

//     try {
//         const countryCode = req.params.country;
//         const url = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`;

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: { 
//                 'X-RapidAPI-Key': rapidAPIKey,
//                 'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//             }
//         });

//         let citiesData = await response.json();
//         console.log(citiesData);
//         res.status(200).json(citiesData.data);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json('/cities/:country', err);
//     }

// });

// gets weather based on latitude and longitude
router.get('/weather/:lat/:lon', async (req, res, next) => {

    try {
        const lat = req.params.lat;
        const lon = req.params.lon;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${owAPIKEY}&units=metric`;

        const response = await fetch(url);

        let weatherData = await response.json();
        console.log(weatherData);
        res.status(200).json(weatherData);

    } catch (err) {
        console.error(err);
        res.status(500).json('/weather/:lat/:lon', err);
    }

})

// gets cities by country
router.get('/cities/:country', async (req, res, next) => {

    try {
        const countryCode = req.params.country;

        const url = `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`;

        let response = await fetch(url, {
            headers: { 'X-CSCAPI-KEY': cscAPIKey }
        });

        if (response.ok) {
            let citiesData = await response.json();
            res.status(200).json(citiesData);

        } else {
            console.error('Error getCitiesByCountry: Country not found or no cities available');
            res.status(404).json();
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json('/cities/:country', err);
    }


});

// gets states by country
router.get('/states/:country', async (req, res, next) => {

    try {
        const countryCode = req.params.country;

        const url = `https://api.countrystatecity.in/v1/countries/${countryCode}/states`;

        let response = await fetch(url, {
            headers: { 'X-CSCAPI-KEY': cscAPIKey }
        });

        if (response.ok) {
            let citiesData = await response.json();
            res.status(200).json(citiesData);

        } else {
            console.error('Error getStatesByCountry: Country not found or no cities available');
            res.status(404).json();
        }        
    } catch (err) {
        console.error(err);
        res.status(500).json('/states/:country', err);
    }

})

// get location by city (lat, lon)
router.get('/location/:cityName/:countryCode', async (req, res, next) => {

    try {
        const cityName = req.params.cityName;
        const countryCode = req.params.countryCode;

        const encodedCity = encodeURIComponent(cityName);

        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodedCity},${countryCode}&appid=${owAPIKEY}`;

        let response = await fetch(url);

        if (response.ok) {
            let cityData = await response.json();
            console.log('location: cityData', cityData)
            res.status(200).json(cityData);

        } else {
            console.error('Error getLocationByCity: City not found');
            res.status(404).json();
        }        

    } catch (err) {
        console.error(err);
        res.status(500).json('/location/:cityName', err);
    }

})

module.exports = router;