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

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col">
     <div class="card bg-light">
  <img src="images/01d.png" class="card-img-top" alt="tomorrow">
  <div class="card-body">
         <div class="card-text" id="next-day">${day}</div>
        <div class="card-text">
             <span id="next-temp-min">22°</span> 
             <span id="next-temp-max">25°C</span>
        </div> 
      </div>
    </div>
   </div> 
 `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d7ead99ae6732fa4573f82431235f3c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showInputCityTemperature(response) {
  let inputCityTemperature = Math.round(response.data.main.temp);
  let inputCityTemp = document.querySelector("#temp-today");
  let descriptionElement = document.querySelector("#description");
  let inputCityHumidity = document.querySelector("#humidity");
  let inputCityWind = document.querySelector("#wind");
  let currentTime = document.querySelector("#current-time");
  let currentDate = document.querySelector("#current-callendar-date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  inputCityTemp.innerHTML = `${inputCityTemperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  inputCityHumidity.innerHTML = response.data.main.humidity;
  inputCityWind.innerHTML = Math.round(response.data.wind.speed);
  currentTime.innerHTML = `${hour}:${minutes}`;
  currentDate.innerHTML = `${date}.${month}.${year}, `;
  iconElement.src = `images/${response.data.weather[0].icon}.png`;
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "d7ead99ae6732fa4573f82431235f3c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentCityTemperature);
  axios.get(apiUrl).then(displayForecast);
}
search("Anchorage");

function inputCity(event) {
  event.preventDefault();
  let writeCity = document.querySelector("#city-input");
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${writeCity.value}`;
  let apiKey = "d7ead99ae6732fa4573f82431235f3c9";
  let apiUrlInputCity = `https://api.openweathermap.org/data/2.5/weather?q=${writeCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlInputCity).then(showInputCityTemperature);
}
let enterCity = document.querySelector("#city-input-form");
enterCity.addEventListener("submit", inputCity);

function showCurrentCityTemperature(response) {
  let currentCityTemperature = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#temp-today");
  tempToday.innerHTML = `${currentCityTemperature}`;
  let descriptionElement = document.querySelector("#description");
  let currentCityHumidity = document.querySelector("#humidity");
  let currentCityWin = document.querySelector("#wind");
  let currentTime = document.querySelector("#current-time");
  let currentDate = document.querySelector("#current-callendar-date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  descriptionElement.innerHTML = response.data.weather[0].description;
  currentCityHumidity.innerHTML = response.data.main.humidity;
  currentCityWin.innerHTML = Math.round(response.data.wind.speed);
  currentTime.innerHTML = `${hour}:${minutes}`;
  currentDate.innerHTML = `${date}.${month}.${year}, `;
  iconElement.src = `images/${response.data.weather[0].icon}.png`;
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-today");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-today");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
