const cityInput = document.getElementById("cityInput");
const todayDate = document.getElementById("todayDate");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const tempFeelsLike = document.getElementById("tempFeelsLike");
const icon = document.getElementById("icon");
const windSpeed = document.getElementById("windSpeed");
const cloudy = document.getElementById("cloudy");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

function showWeather(content) {
  const today = new Date();
  todayDate.innerHTML = today.toLocaleDateString();
  cityName.innerHTML = content.name;
  icon.src = `http://openweathermap.org/img/wn/${content.weather[0].icon}@2x.png`;
  temp.innerHTML = `${Math.floor(content.main.temp)}&deg;C`;
  tempFeelsLike.innerHTML = `Feels like ${Math.floor(
    content.main.feels_like
  )}&deg;C, ${content.weather[0].description}`;
  windSpeed.innerHTML = `Wind: ${Math.floor(content.wind.speed)}m/s`;
  cloudy.innerHTML = `Humidity: ${content.clouds.all}%`;
  let sunriseFormatted = new Date(content.sys.sunrise * 1000);
  sunrise.innerHTML = `Sunrise: ${sunriseFormatted.toLocaleTimeString()}`;
  let sunsetFormatted = new Date(content.sys.sunset * 1000);
  sunset.innerHTML = `Sunset: ${sunsetFormatted.toLocaleTimeString()}`;
  function initMap() {  //doesn't work :(
    const location = {
      lng: content.coord.lon,
      lat: content.coord.lat,
    };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: location,
    });
  }
  initMap();
}

window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition(
    (geolocationPosition) => {
      const lat = geolocationPosition.coords.latitude;
      const long = geolocationPosition.coords.longitude;
      (async function () {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=24326cb29094dcf470059c19079a4db4`
        );
        if (response.ok) {
          const content = await response.json();
          showWeather(content);
        }
      })();
    },
    (error) => alert(error.message)
  );
});

weatherBtn.addEventListener("click", () => {
  if (!cityInput.value) {
    cityName.innerHTML = `Please input city name`;
  } else {
    (async function () {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=24326cb29094dcf470059c19079a4db4`
      );
      if (response.ok) {
        const content = await response.json();
        showWeather(content);
        cityInput.value = "";
      }
    })();
  }
});

currentPosition.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (geolocationPosition) => {
      const lat = geolocationPosition.coords.latitude;
      const long = geolocationPosition.coords.longitude;
      (async function () {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=24326cb29094dcf470059c19079a4db4`
        );
        if (response.ok) {
          const content = await response.json();
          showWeather(content);
        }
      })();
    },
    (error) => alert(error.message)
  );
});