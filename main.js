import clearUrl from '/images/weather/clear.png'
import thunderstormUrl from '/images/weather/thunderstorm.png'
import snowUrl from '/images/weather/snow.png'
import fewCloudsUrl from '/images/weather/fewClouds.png'
import scatteredCloudsUrl from '/images/weather/scatteredClouds.png'
import brokenCloudsUrl from '/images/weather/brokenClouds.png'
import showerRainUrl from '/images/weather/showerRain.png'
import rainUrl from '/images/weather/rain.png'
import mistUrl from '/images/weather/mist.png'

let currentTemp = document.getElementById("currentTemp");
let place = document.getElementById("place");
let weatherIcon = document.getElementById("weatherIcon");
let weatherIconSM = document.getElementById("weatherIconSM");
let weather = document.getElementById("weather");
let weatherDescription = document.getElementById("weatherDescription");
let dateElement = document.getElementById("date");

let tempMinElement = document.getElementById("tempMinElement");
let tempMaxElement = document.getElementById("tempMaxElement");
let pressureElement = document.getElementById("pressureElement");
let humidityElement = document.getElementById("humidityElement");
let visibilityElement = document.getElementById("visibilityElement");
let windSpeedElement = document.getElementById("windSpeedElement");

const date = new Date();
dateElement.textContent = date.toDateString();

let searchInput = document.getElementById("searchInput");
let btn = document.getElementById('searchButton');


async function successCallback(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0457eebadc454500403d879cb7f5358a`);
    const data = await res.json();
    currentTemp.textContent = Math.round(data.main.temp - 273.15);
    let weatherMain = data.weather[0].main;
    let weatherDetail = data.weather[0].description;
    tempMinElement.textContent = Math.round(data.main.temp_min - 273.15);
    tempMaxElement.textContent = Math.round(data.main.temp_max - 273.15);
    pressureElement.textContent = data.main.pressure;
    humidityElement.textContent = data.main.humidity;
    visibilityElement.textContent = data.visibility;
    windSpeedElement.textContent = data.wind.speed;
    //for small weather icon
    weatherIconSM.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weather.textContent = data.weather[0].main;
    //for weather descriptiion
    weatherDescription.textContent = data.weather[0].description;
    //for weather icon
    if (weatherMain === "Clear") weatherIcon.src = clearUrl
    else if (weatherMain === "Thunderstorm") weatherIcon.src = thunderstormUrl
    else if ((weatherMain === "Snow") || (weatherDetail === "freezing rain")) weatherIcon.src = snowUrl
    else if (weatherDetail === "few clouds") weatherIcon.src = fewCloudsUrl
    else if (weatherDetail === "scattered clouds") weatherIcon.src = scatteredCloudsUrl
    else if ((weatherDetail === "broken clouds") || (weatherDetail === "overcast clouds")) weatherIcon.src = brokenCloudsUrl
    else if (weatherMain === "Drizzle") weatherIcon.src = showerRainUrl
    else if (weatherDetail === "light intensity shower rain") weatherIcon.src = showerRainUrl
    else if (weatherDetail === "shower rain") weatherIcon.src = showerRainUrl
    else if (weatherDetail === "heavy intensity shower rain") weatherIcon.src = showerRainUrl
    else if (weatherDetail === "ragged shower rain") weatherIcon.src = showerRainUrl
    else if (weatherDetail === "light rain") weatherIcon.src = rainUrl
    else if (weatherDetail === "moderate rain") weatherIcon.src = rainUrl
    else if (weatherDetail === "heavy intensity rain") weatherIcon.src = rainUrl
    else if (weatherDetail === "very heavy rain") weatherIcon.src = rainUrl
    else if (weatherDetail === "extreme rain") weatherIcon.src = rainUrl
    else weatherIcon.src = mistUrl

    const res2 = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=0457eebadc454500403d879cb7f5358a`);
    const data2 = await res2.json();
    place.textContent = `${data2[0].name},${data2[0].state}`

}

function errorCallback() {
    temp.textContent = "couldnot find your location";
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);



btn.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=5&appid=0457eebadc454500403d879cb7f5358a`)
        .then(response => response.json())
        .then(data => {
            event.preventDefault();
            let newPosition = {
                coords: { latitude: data[0].lat, longitude: data[0].lon }
            }
            successCallback(newPosition);
        })
});

async function searchEvent(event) {
    event.preventDefault();
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=5&appid=0457eebadc454500403d879cb7f5358a`);
    const data3 = await res.json();
    let newPosition = {
        coords: { latitude: data3[0].lat, longitude: data3[0].lon }
    }
    successCallback(newPosition);

}