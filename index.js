document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "933619b45620c611230cb4a21de7f4ee";
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

    const button = document.querySelector('.searchBtn');
    const inputValue = document.querySelector('.inputValue');
    const city = document.querySelector('.city');
    const date = document.querySelector('.date');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind-speed');
    const weatherIcon = document.querySelector('.weather-icon');

    button.addEventListener('click', () => {
        const cityValue = inputValue.value.trim();

        if (cityValue !== "") {
            fetchWeather(cityValue);
        } else {
            alert("Please enter a city name.");
        }
    });

    function fetchWeather(cityName) {
        const apiUrl = `${baseUrl}?q=${cityName}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                alert(`Error: ${error.message}`);
            });
    }

    function updateWeather(data) {
        city.textContent = `${data.name}, ${data.sys.country}`;
        date.textContent = new Date().toLocaleDateString();
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.src = iconUrl;
    }
});
