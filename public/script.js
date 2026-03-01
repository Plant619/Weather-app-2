document.addEventListener('DOMContentLoaded', () => {

    //////////////////////////////////////////////////////////////////////////////////////
    // get countries (country state city docs)
    //////////////////////////////////////////////////////////////////////////////////////

    async function getCountries() {
        const url = `/api/countries`;

        let response = await fetch(url);
        let countriesData = await response.json();

        console.log(countriesData);

        return countriesData;
    }

    //////////////////////////////////////////////////////////////////////////////////////
    // display countries as select options
    //////////////////////////////////////////////////////////////////////////////////////

    // updates select menu showing all the possible countries
    function showCountries(countries) {
        const countrySelect = document.getElementById('country-select');
        // stores html that will be added to country select
        let tempHTML = ``;

        for (let i = 0; i < countries.length; i++) {
            let countryName = countries[i].name;
            let countryCode = countries[i].iso2;

            tempHTML += `<option value="${countryCode}">${countryName}</option>`;
        }

        countrySelect.innerHTML = tempHTML;
    }

    // calls function to get and display countries in the select menu
    getCountries().then(countries => {
        showCountries(countries);

        // Allows users to search for countries in dropdown
        const countrySelect = document.getElementById('country-select');
        new Choices(countrySelect, {
            searchEnabled: true,   // Dropdown is searchable
            itemSelectText: '',    // Remove "Press to select" hint
            shouldSort: false,     // Keep countries in original order
            placeholder: true,
            placeholderValue: 'Select a country'
        });

    })

    //////////////////////////////////////////////////////////////////////////////////////
    // Listening and responding to changes in country-select
    //////////////////////////////////////////////////////////////////////////////////////

    let cityChoices; 

    document.getElementById('country-select').addEventListener('change', async () => {
        const selectedCountryCode = document.getElementById('country-select').value;
        console.log(selectedCountryCode);

        // get cities of the selected country
        let cities = await getCitiesByCountry(selectedCountryCode);

        if (cities.length > 100) {
            // get states instead 
            cities = await getStatesByCountry(selectedCountryCode);
        }

        showCities(cities);

        // Allows users to search for cities in dropdown
        const citySelect = document.getElementById('city-select');

        if (cityChoices) {
            cityChoices.destroy(); // remove old instance
        }

        cityChoices = new Choices(citySelect, {
            searchEnabled: true,   // Dropdown is searchable
            itemSelectText: '',    // Remove "Press to select" hint
            shouldSort: false,     // Keep countries in original order
            placeholder: true,
            placeholderValue: 'Select a city/state'
        });
    })

    



    
    //////////////////////////////////////////////////////////////////////////////////////
    // get cities (country state city docs)
    //////////////////////////////////////////////////////////////////////////////////////

    async function getCitiesByCountry(countryCode) {
        const url = `/api/cities/${countryCode}`;

        let response = await fetch(url);

        if (response.ok) {
            let citiesData = await response.json();
            console.log(citiesData);

            return citiesData;
        } else {
            console.error('Error getCitiesByCountry: Country not found or no cities available');
            return [];
        }

    }

    // NOTE: some countries have many cities consider using states (US, India, China)

    //////////////////////////////////////////////////////////////////////////////////////
    // display cities as select options
    //////////////////////////////////////////////////////////////////////////////////////
    async function showCities(cities) {
        const citiesSelect = document.getElementById('city-select');
        // stores html that will be added to country select
        let tempHTML = ``;

        for (let i = 0; i < cities.length; i++) {
            // store the lat and long
            let cityName = cities[i].name;
            let lat = cities[i].latitude;
            let long = cities[i].longitude;

            tempHTML += `<option value="${[lat, long]}">${cityName}</option>`;
        }

        citiesSelect.innerHTML = tempHTML;
    }

    //////////////////////////////////////////////////////////////////////////////////////
    // get states (country state city docs)
    //////////////////////////////////////////////////////////////////////////////////////
    async function getStatesByCountry(params) {
        
    }


    //////////////////////////////////////////////////////////////////////////////////////
    // fetch weather information by calling API (openWeather)
    //////////////////////////////////////////////////////////////////////////////////////

    async function getWeatherInfo(url) {
        let response = await fetch(url);
        let data = await response.json();
    }


    // getWeatherInfo('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}');

    // How to make an API call 
    // Parameters: 
    //      1. lat: Latitude
    //      2. long: Longitude
    //      3. appid: API key
    //      4. mode (optional): Response format (xml, html) JSON by default
    //      5. units (optional): Units of measurement (standard, metric, imperial) standard by default
    //      6. lang (optional): get the output in your language

    // Use the Geocoding API to get latitude and longitude (convert city names and zip-codes to geo coordinates and the other way around.)

})

