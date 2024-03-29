// Weather object to handle API calls and display weather information
let weather = {
    apiKey: '933619b45620c611230cb4a21de7f4ee',

      // Async function to fetch weather data from OpenWeather API
    fetchWeather: async function (city) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
        );
        if (!response.ok) {
          throw new Error("No weather found.");
        }
        const data = await response.json();
        this.displayWeather(data);
      } catch (error) {
        alert(error.message);
      }
    },

    // Function to display weather information on the webpage
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
      const formattedDate = currentDate.toLocaleDateString('en-US', options);


      // Update HTML elements with weather information
      document.querySelector(".time-date").innerText = formattedDate;
      document.querySelector(".city").innerText = `Weather in ${name}`;
      document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = `${temp}°C`;
      document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
      document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },

    // Function to initiate weather search based on user input
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  // Geocode object to handle reverse geocoding for obtaining location information
  let geocode = {
    reverseGeocode: async function (latitude, longitude) {
      try {

        // Async function to perform reverse geocoding
        const apikey = "75fe9f6705434da2a1e67e3aa643474b";
        const api_url = "https://api.opencagedata.com/geocode/v1/json";
        const request_url =
          `${api_url}?key=${apikey}&q=${encodeURIComponent(latitude + "," + longitude)}&pretty=1&no_annotations=1`;
  
        const response = await fetch(request_url);
        if (!response.ok) {
          throw new Error(`Unable to geocode! Response code: ${response.status}`);
        }
  
        const data = await response.json();
        const city = data.results[0].components.city;
        weather.fetchWeather(city);
        console.log(city);
      } catch (error) {
        console.error(error.message);
      }
    },

    // Function to obtain user's location
    getLocation: function () {
      function success(data) {
        geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, console.error);
      } else {
        weather.fetchWeather("nairobi");
      }
    },
  };
  
  // Event listeners for search functionality
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });
  
  // Initial call to obtain user's location and fetch weather data
  geocode.getLocation();
  