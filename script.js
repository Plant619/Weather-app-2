document.addEventListener('DOMContentLoaded', () => {
    //////////////////////////////////////////////////////////////////////////////////////
    // get countries (country state city docs)
    //////////////////////////////////////////////////////////////////////////////////////

    async function getCountries() {
        const url = `https://api.countrystatecity.in/v1/countries`;

        let response = await fetch(url, {
            headers: { 'X-CSCAPI-KEY': '536ea2549dd578bcaf72d6d341ca744cf183d4fce45c87c5d11678c6b1ec5eca' }
        });

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

    // calls function to get and display countries
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


    // gets all countries and their flags (used for options beside names) ? 


    //////////////////////////////////////////////////////////////////////////////////////
    // get cities (country state city docs)
    //////////////////////////////////////////////////////////////////////////////////////

    async function getCitiesByCountry(countryCode) {
        const url = `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`;

        let response = await fetch(url, {
            headers: { 'X-CSCAPI-KEY': '536ea2549dd578bcaf72d6d341ca744cf183d4fce45c87c5d11678c6b1ec5eca' }
        });

        if (response.ok) {
            let citiesData = await response.json();
            return citiesData;
        } else {
            console.error('Error getCitiesByCountry: Country not found or no cities available');
            return [];
        }

    }

    // NOTE: some countries have many cities consider using states
    // getCitiesByCountry()





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

// conutry state docs
// 536ea2549dd578bcaf72d6d341ca744cf183d4fce45c87c5d11678c6b1ec5eca