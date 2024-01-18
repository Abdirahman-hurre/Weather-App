document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', function () {
        const inputValue = document.querySelector('.inputValue').value;
        const temp = document.querySelector('.temp');
        const desc = document.querySelector('.desc');
        const humidity = document.querySelector('.humidity');
        const windSpeed = document.querySelector('.wind-speed');
        const errorMessage = document.querySelector('.error-message');
        const weatherIcon = document.querySelector('.weather-icon');

        // Fetch data from OpenWeatherMap API
        const apiKey = '933619b45620c611230cb4a21de7f4ee';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(weather => {
                errorMessage.innerText = '';
                temp.innerText = `${weather.main.temp}°C`;
                desc.innerText = weather.weather[0].main;
                humidity.innerText = `Humidity: ${weather.main.humidity}%`;
                windSpeed.innerText = `Wind Speed: ${weather.wind.speed} m/s`;

                // Set Weather Icon
                weatherIcon.src = getWeatherIcon(weather.weather[0].id);
            })
            .catch(err => {
                errorMessage.innerText = 'City not found';
                temp.innerText = '----°C';
                desc.innerText = '---';
                humidity.innerText = '';
                windSpeed.innerText = '';
                weatherIcon.src = ''; // Clear weather icon in case of error
            });
    });

    // Function to get Weather Icon based on Weather Condition Code
    function getWeatherIcon(weatherId) {
        
        if (weatherId >= 200 && weatherId < 300) {
            return 'http://openweathermap.org/img/wn/11d.png';
        } else if (weatherId >= 300 && weatherId < 400) {
            return 'http://openweathermap.org/img/wn/09d.png';
        } else if (weatherId >= 500 && weatherId < 600) {
            return 'http://openweathermap.org/img/wn/10d.png';
        } else if (weatherId >= 600 && weatherId < 700) {
            return 'http://openweathermap.org/img/wn/13d.png';
        } else if (weatherId >= 700 && weatherId < 800) {
            return 'http://openweathermap.org/img/wn/50d.png';
        } else if (weatherId === 800) {
            return 'http://openweathermap.org/img/wn/01d.png';
        } else if (weatherId > 800) {
            return 'http://openweathermap.org/img/wn/03d.png';
        }
        return 'http://openweathermap.org/img/wn/01d.png'; // Default to sunny
    }
});
