const apiKey = `a28a5fc49c451afefe61fe6fa718183c`;
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const cityButtons = document.getElementById('city-buttons');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const cities = ['Orlando', 'Atlanta', 'Boston', 'New York', 'Cleveland', 'Dallas', 'Seattle'];

cities.forEach(city => {
    const button = document.createElement('button');
    button.textContent = city;
    button.addEventListener('click', () => fetchWeather(city));
    cityButtons.appendChild(button);
});


searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) fetchWeather(city);
});

function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            const { name, main, wind, weather } = data;
            currentWeather.innerHTML = `
                <h2>${name}</h2>
                <p>Temp: ${main.temp} °F</p>
                <p>Wind: ${wind.speed} MPH</p>
                <p>Humidity: ${main.humidity} %</p>
            `;
            fetchForecast(city);
        })
        .catch(error => console.error('Error fetching weather:', error));
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
                    <p>Temp: ${main.temp} °F</p>
                    <p>Wind: ${wind.speed} MPH</p>
                    <p>Humidity: ${main.humidity} %</p>
                `;
                forecast.appendChild(forecastCard);
            });
        })
        .catch(error => console.error('Error fetching forecast:', error));
}