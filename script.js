document.addEventListener('DOMContentLoaded', () => {

    // fetch weather information by calling API
    async function getWeatherInfo(url) {
        let response = await fetch(url)
        let data = await response.json();
    }


    getWeatherInfo()

    document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country-select');
    new Choices(countrySelect, {
        searchEnabled: true,   // Dropdown is searchable
        itemSelectText: '',    // Remove "Press to select" hint
        shouldSort: false      // Keep countries in original order
    });
});

})