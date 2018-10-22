/*
Author: Fernando Carranza
Description: Chrome extension that will show current time and weather, along with different CSS depending on the time of day
*/

var weatherIcon;
var temperature;
var temperatureIcon
var weatherSummary;
var lat;
var long;

window.onload = function() { //assign each global variable to it's respective ID element
  weatherIcon = document.getElementById("current-icon");
  temperature = document.getElementById("current-temperature");
  temperatureIcon = document.getElementById("temperature-icon");
  weatherSummary = document.getElementById("weather-summary");
  setDate();
  isItDark();
  canWeGetWeather();

  console.log(localStorage);


  function canWeGetWeather() {
      if(localStorage.getItem("lat") === null || localStorage.getItem("long") === null){
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
      } else {
        console.log("We're now in the else statement for canWeGetWeather. Try to pass values lat and long from localStorage");
        var localLat = localStorage.getItem("lat");
        var localLong = localStorage.getItem("long");
        console.log(localLat);
        console.log(localLong);
        showWeather(localLat, localLong);
      }
    }

    function successLocation(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        localStorage.setItem("lat", JSON.stringify(lat));
        localStorage.setItem("long", JSON.stringify(long));
        showWeather(lat, long);
    }

    function errorLocation(){
      console.log("Need to ask for permissions");
    }   
} 

//body alter
const timeOfDay = document.querySelector("body");
function isItDark(){
    var timeInMs = new Date().getHours()
    console.log("time is: " + timeInMs);
    //if time is less than noon (12)
    if(timeInMs >= 01 && timeInMs <= 18){
        timeOfDay.classList.toggle("day"); //toggle morning css
    }
    //if time is more than 12
    if(timeInMs > 18){
        timeOfDay.classList.toggle("night"); //toggle day css
    }
}

function farenheitToCelsius(k) {
  return Math.round((k - 32) * 0.5556 );
}

function humidityPercentage(h) {
  return Math.round(h * 100);
}

function knotsToKilometres(knot) {
  return Math.round( knot * 1.852);
}

var weatherImages = {
  "clear-day": "/icons/clear-day-sun.png",
  "clear-night": "/icons/clear-night-moon.png",
  "rain": "/icons/rain.png",
  "snow": "/icons/snow.png",
  "sleet": "/icons/sleet.png",
  "wind": "/icons/wind.png",
  "fog": "/icons/fog.png",
  "cloudy": "/icons/cloudy-gray.png",
  "partly-cloudy-day": "/icons/partly-cloudy-day.png",
  "partly-cloudy-night": "/icons/partly-cloudy-night.png",
  "hail": "/icons/hail.png",
  "thunderstorm": "/icons/thunder.png",
  "tornado": "/icons/tornado.png"
}

 
  function showWeather(lat, long) {
    var url = `https://api.darksky.net/forecast/<KEY_HERE>/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object)   
    console.log(url);
  }

var object;

 function displayWeather(object) {
    weatherIcon.src = weatherImages[object.currently.icon];
    temperature.innerHTML = farenheitToCelsius(object.currently.temperature) + " C" + " / " + object.currently.temperature + " F";
   temperatureIcon.src = "https://cdn4.iconfinder.com/data/icons/medicons-2/512/thermometer-512.png";
    weatherSummary.innerHTML = "Current Weather: " + object.currently.summary;
    console.log("this is within the displayWeather function");
    console.log(object);
 }


//time alter

function setDate(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(setDate, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}