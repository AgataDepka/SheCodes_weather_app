let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentDay = document.querySelector("#weekday");
currentDay.innerHTML = `${day}`;

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

// show city name and current temp. in that city

let apiKey = "d7ead99ae6732fa4573f82431235f3c9";

function showInputCityTemperature(response) {
  let inputCityTemperature = Math.round(response.data.main.temp);
  let inputCityTemp = document.querySelector("#temp-today");
  inputCityTemp.innerHTML = `${inputCityTemperature} °C`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let inputCityHum = document.querySelector("#humidity");
  let inputCityHumidity = response.data.main.humidity;
  inputCityHum.innerHTML = `humidity: ${inputCityHumidity} %`;
  let inputCityWin = document.querySelector("#wind");
  let inputCityWind = Math.round(response.data.wind.speed);
  inputCityWin.innerHTML = `wind: ${inputCityWind} m/s`;
}

function inputCity(event) {
  event.preventDefault();
  let writeCity = document.querySelector("#city-input");
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${writeCity.value}`;
  let apiUrlInputCity = `https://api.openweathermap.org/data/2.5/weather?q=${writeCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlInputCity).then(showInputCityTemperature);
}
let enterCity = document.querySelector("#city-input-form");
enterCity.addEventListener("submit", inputCity);

// bonus task, make current location button display current city and temperature

function showCurrentCityTemperature(response) {
  let currentCityTemperature = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#temp-today");
  tempToday.innerHTML = `${currentCityTemperature} °C`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let currentCityHum = document.querySelector("#humidity");
  let currentCityHumidity = response.data.main.humidity;
  currentCityHum.innerHTML = `humidity: ${currentCityHumidity} %`;
  let currentCityWin = document.querySelector("#wind");
  let currentCityWind = Math.round(response.data.wind.speed);
  currentCityWin.innerHTML = `wind: ${currentCityWind} m/s`;
}
function showCurrentCity(response) {
  let currentCity = response.data[0].name;
  let positionCity = document.querySelector("h3");
  positionCity.innerHTML = `${currentCity}`;
}

function showCurrentPosition(position) {
  let actualLat = position.coords.latitude;
  let actualLon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${actualLat}&lon=${actualLon}&appid=${apiKey}&units=metric`;
  let apiUrlCurrentCity = `https://api.openweathermap.org/geo/1.0/reverse?lat=${actualLat}&lon=${actualLon}&limit=1&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentCityTemperature);
  axios.get(apiUrlCurrentCity).then(showCurrentCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
