const apiKey = `a28a5fc49c451afefe61fe6fa718183c`;
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const searchHistory = document.getElementById('search-history');


searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) { fetchWeather(city);
                addSearchHistory(city);
    }      
});

function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            const { name, main, wind, weather, dt } = data;
            const currentDate = new Date(dt * 1000).toLocaleDateString();
            currentWeather.innerHTML = `
                <h2>${name} (${currentDate}) </h2>
                <p>Temp: ${main.temp.toFixed(1)} °F</p>
                <p>Wind: ${wind.speed.toFixed(1)} MPH</p>
                <p>Humidity: ${main.humidity}%</p>
            `;
            fetchForecast(city);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            const forecastData = data.list.filter((_, index) => index % 8 === 0);
            forecast.innerHTML = '';
            forecastData.forEach(day => {
                const { dt_txt, main, wind, weather } = day;
                const date = new Date(dt_txt).toLocaleDateString();
                const forecastCard = document.createElement('div');
                forecastCard.className = 'forecast-card';
                forecastCard.innerHTML = `
                    <h4>${date}</h4>
                    <p>Temp: ${main.temp.toFixed(1)} °F</p>
                    <p>Wind: ${wind.speed.toFixed(1)} MPH</p>
                    <p>Humidity: ${main.humidity}%</p>
                `;
                forecast.appendChild(forecastCard);
            });
        })
        .catch(error => console.error('Error fetching weather forecast:', error));
}

function addSearchHistory(city) {
    const button = document.createElement('button');
    button.textContent = city;
    button.addEventListener('click', () => fetchWeather(city));
    searchHistory.appendChild(button);
}