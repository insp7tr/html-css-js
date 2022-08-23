const daysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "";

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timeZone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

setInterval(() => {
  const DateOBJ = new Date();
  const month = DateOBJ.getMonth();
  const date = DateOBJ.getDate();
  const day = DateOBJ.getDay();
  const hour = DateOBJ.getHours();
  const hoursIn12Format = hour >= 13 ? hour % 12 : hour;
  const minute = DateOBJ.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12Format < 10 ? "0" + hoursIn12Format : hoursIn12Format) +
    ":" +
    (minute < 10 ? "0" + minute : minute) +
    `<span id="am-pm">${ampm}</span>`;
  dateEl.innerHTML = daysArray[day] + ", " + date + " " + monthsArray[month];
}, 1000);

getWeatherData();

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  timeZone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + "N " + data.lon + "E";

  currentWeatherItemsEl.innerHTML = `<div class="weather-item">
              <p>Humidity</p>
              <p>${humidity}</p>
            </div>
            <div class="weather-item">
              <p>Pressure</p>
              <p>${pressure}</p>
            </div>
            <div class="weather-item">
              <p>Wind Speed</p>
              <p>${wind_speed}</p>
            </div>
            <div class="weather-item">
              <p>Sunrise</p>
              <p>${window.moment(sunrise * 1000).format("HH:mm a")}</p>
            </div>
            <div class="weather-item">
              <p>Sunset</p>
              <p>${window.moment(sunset * 1000).format("HH:mm a")}</p>
            </div>`;

  let otherDayForecast = "";
  data.daily.forEach((day, index) => {
    if (index == 0) {
      currentTempEl.innerHTML = `
      <div class="today" id="current-temp">
        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          alt="weather icon"
          class="w-icon"
        />
        <div class="other">
          <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
          <div class="temp">Day - ${day.temp.day}&#176;C</div>
          <div class="temp">Night - ${day.temp.night}&#176;C</div>
        </div>
      </div>`;
    } else {
      otherDayForecast += `
        <div class="weather-forecast-item">
          <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
          <img
            src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
            alt="weather icon"
            class="w-icon"
          />
          <div class="temp">Day - ${day.temp.day}&#176;C</div>
          <div class="temp">Night - ${day.temp.night}&#176;C</div>
        </div>`;
    }
  });

  weatherForecastEl.innerHTML = otherDayForecast;
}
