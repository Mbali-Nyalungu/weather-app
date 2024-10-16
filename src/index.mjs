const form = document.getElementById("city-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperatureElement = document.getElementById("temperature");

const defaultCity = "Paris"; // Default city
const defaultOffset = 0; // Default timezone offset

function displayCurrentDateTime(offset) {
  const now = new Date();
  const localTime =
    now.getTime() + now.getTimezoneOffset() * 60000 + offset * 3600000;
  const date = new Date(localTime);
  const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  document.getElementById("current-date").textContent =
    formattedDate.split(",")[0]; // Day
  document.getElementById("local-time").textContent =
    formattedDate.split(",")[1]; // Time
}

function displayForecast(response) {
  const city = response.data.city;
  const country = response.data.country;
  const forecast = response.data.daily[0]; // Get today's forecast

  cityName.textContent = `${city}, ${country}`;
  const temperature = Math.round(forecast.temperature.day);
  const description = forecast.condition.description;

  temperatureElement.innerHTML = `The forecast temperature for today is ${temperature}°C (${description}).`;
}

function fetchForecast(city) {
  const apiKey = "your_api_key"; // Replace with your secure API key
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios
    .get(apiUrl)
    .then(displayForecast)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Could not fetch weather data. Please try again.");
    });
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    fetchForecast(city);
    cityInput.value = ""; // Clear input after search
  } else {
    alert("Please enter a valid city name.");
  }
});

// Initialize with the default city
fetchForecast(defaultCity);
displayCurrentDateTime(defaultOffset);
