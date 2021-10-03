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
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

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

let apiKey = "d7ead99ae6732fa4573f82431235f3c9";

function showInputCityTemperature(response) {
  let inputCityTemperature = Math.round(response.data.main.temp);
  let inputCityTemp = document.querySelector("#temp-today");
  let descriptionElement = document.querySelector("#description");
  let inputCityHumidity = document.querySelector("#humidity");
  let inputCityWind = document.querySelector("#wind");
  let currentTime = document.querySelector("#current-time");
  let currentDate = document.querySelector("#current-callendar-date");
  let iconElement = document.querySelector("#icon");
  inputCityTemp.innerHTML = `${inputCityTemperature} °C`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  inputCityHumidity.innerHTML = response.data.main.humidity;
  inputCityWind.innerHTML = Math.round(response.data.wind.speed);
  currentTime.innerHTML = `${hour}:${minutes}`;
  currentDate.innerHTML = `${date}.${month}.${year}`;
  iconElement.src = `images/${response.data.weather[0].icon}.png`;
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
  let currentCityHumidity = document.querySelector("#humidity");
  let currentCityWin = document.querySelector("#wind");
  descriptionElement.innerHTML = response.data.weather[0].description;
  currentCityHumidity.innerHTML = response.data.main.humidity;
  currentCityWin.innerHTML = Math.round(response.data.wind.speed);
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
