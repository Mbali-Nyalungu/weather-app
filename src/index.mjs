const form = document.getElementById("city-form");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperatureElement = document.querySelector(".sun");

const defaultCity = "Paris";
const defaultOffset = 0;
const apiKey = "b0bct32424950fe6524aodcf40a33f25";

function displayCurrentDateTime(offset) {
  const now = new Date();
  const localTime =
    now.getTime() + now.getTimezoneOffset() * 60000 + offset * 3600000;
  const date = new Date(localTime);
  const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
  const formattedDate = date.toLocaleString(undefined, options);

  document.getElementById("current-date").textContent =
    formattedDate.split(",")[0];
  document.getElementById("local-time").textContent =
    formattedDate.split(",")[1];
}

function displayForecast(response) {
  const city = response.data.city;

  const forecast = response.data.daily[0];

  cityName.textContent = `${city}`;
  const temperature = Math.round(forecast.temperature.day);

  temperatureElement.innerHTML = `☀️ ${temperature}°C `;
}

function fetchForecast(city) {
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios
    .get(apiUrl)
    .then(displayForecast)
    .catch((error) => {
      console.error(
        "Error fetching weather data:",
        error.response ? error.response.data : error.message
      );
      temperatureElement.innerHTML =
        "Could not fetch weather data. Please try again.";
    });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    fetchForecast(city);
    cityInput.value = "";
  } else {
    alert("Please enter a valid city name.");
  }
});

fetchForecast(defaultCity);
displayCurrentDateTime(defaultOffset);
