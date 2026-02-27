const express = require('express');
const router = express.Router();

const apiKey = process.env.CSC_API_KEY;

router.get('/countries', async (req, res, next) => {
    const url = `https://api.countrystatecity.in/v1/countries`;

    let response = await fetch(url, {
        headers: { 'X-CSCAPI-KEY': apiKey }
    });

    let countriesData = await response.json();

    console.log(countriesData);

    res.status(200).json(countriesData);
});


router.get('/cities/:country', async (req, res, next) => {

    const countryCode = req.params.country;

    const url = `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`;

    let response = await fetch(url, {
        headers: { 'X-CSCAPI-KEY': apiKey }
    });

    if (response.ok) {
        let citiesData = await response.json();
        console.log(citiesData);
        res.status(200).json(citiesData);

    } else {
        console.error('Error getCitiesByCountry: Country not found or no cities available');
        res.status(404).json();
    }

});

module.exports = router;
