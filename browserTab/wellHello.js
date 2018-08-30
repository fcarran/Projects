//body alter
const timeOfDay = document.querySelector("body");
//TODO, at midnight, no CSS is selected, bc hour is 24. Add logic to rule this out
function isItDark(){
    var timeInMs = new Date().getHours()
    console.log("time is: " + timeInMs);
    //if time is less than noon (12)
    if(timeInMs >= 01 && timeInMs < 18){
        timeOfDay.classList.toggle("day"); //toggle morning css
    }
    //if time is more than 12
    if(timeInMs > 18){
        timeOfDay.classList.toggle("night"); //toggle day css
    }
}

isItDark();



//weather alter
//TODO refactor what is needed and what isnt when displaying weather
//var weather = document.querySelector(".weather");
// San Jose api call https://api.darksky.net/forecast/30140b1b2d59c74c554f1d3b9a88f167/37.3382,121.8863

var humidity;
var weatherIcon;
var pressure;
var uvIndex;
var temperature;
var temperatureIcon
var windBearing;
var windSpeed;
var weatherSummary;

window.onload = function() { //assign each global variable to it's respective ID element
  humidity = document.getElementById("current-humidity");
  weatherIcon = document.getElementById("current-icon");
  pressure = document.getElementById("current-pressure");
  uvIndex = document.getElementById("current-uvIndex");
  temperature = document.getElementById("current-temperature");
  temperatureIcon = document.getElementById("temperature-icon");
  windBearing = document.getElementById("current-wind-bearing");
  windSpeed = document.getElementById("current-wind-speed");
  weatherSummary = document.getElementById("weather-summary");
  getWeather();
}

function farenheitToCelsius(k) {
  return Math.round((k - 32) * 0.5556 );
}

function humidityPercentage(h) {
  return Math.round(h * 100);
}

function degreesToDirection(degrees) {
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    for (i in angles) {

        if(degrees>= low && degrees < high)
            return angles[i];

        low = (low + range) % 360;
        high = (high + range) % 360;
    }
}

function knotsToKilometres(knot) {
  return Math.round( knot * 1.852);
}

var weatherImages = {
  "clear-day": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Sun_icon.svg/252px-Sun_icon.svg.png",
  "clear-night": "http://www.clker.com/cliparts/f/S/2/p/7/u/gold-matte-moon.svg",
  "rain": "https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-512.png",
  "snow": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nuvola_weather_snow.svg/1000px-Nuvola_weather_snow.svg.png",
  "sleet": "http://www.clker.com/cliparts/f/6/7/4/1206565674431593790Anonymous_simple_weather_symbols_10.svg.hi.png",
  "wind": "http://www.haotu.net/up/4233/128/216-wind.png",
  "fog": "http://www.iconninja.com/files/81/344/943/fog-cloud-hiding-the-sun-weather-interface-symbol-icon.svg",
  "cloudy": "http://camera.thietbianninh.com/images/icon-2.png",
  "partly-cloudy-day": "http://meteo.cw/images_www/weather_icons1/weather_icon_03.png",
  "partly-cloudy-night": "http://icon-park.com/imagefiles/simple_weather_icons_cloudy_night.png",
  "hail": "http://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Hail-icon.png",
  "thunderstorm": "http://findicons.com/files/icons/2613/android_weather_extended/480/thunderstorms.png",
  "tornado": "http://hddfhm.com/images/clipart-of-a-tornado-11.png"
}


//prompt user to grant location permissions, put lat and long in variables for other functions
function getWeather() {
    if(navigator.geolocation){ //read-only property returns a geolocation object that gives web content access to the location of the computer
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(lat, long);
        showWeather(lat, long)
      })
    }
       else {
            window.alert("Could not get location");
      }
  }

 
  function showWeather(lat, long) {
    var url = `https://api.darksky.net/forecast/30140b1b2d59c74c554f1d3b9a88f167/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object)   
    console.log(url);
  }

var object;

 function displayWeather(object) {
    humidity.innerHTML = "Humidity: " + humidityPercentage(object.currently.humidity) + "%";
    weatherIcon.src = weatherImages[object.currently.icon];
    pressure.innerHTML = "Pressure: " + object.currently.pressure + " mb";
    uvIndex.innerHTML = "uvIndex: " + object.currently.uvIndex;
    temperature.innerHTML = farenheitToCelsius(object.currently.temperature) + " C" + " / " + object.currently.temperature + " F";
   temperatureIcon.src = "https://cdn4.iconfinder.com/data/icons/medicons-2/512/thermometer-512.png";
    windBearing.innerHTML = "Wind Direction: " + degreesToDirection(object.currently.windBearing);
    windSpeed.innerHTML = "Wind Speed: " + knotsToKilometres(object.currently.windSpeed) + " km/h";
    weatherSummary.innerHTML = "Weather Summary: " + object.currently.summary;
     //document.getElementById("current-icon").style.backgroundColor = "hsl(216, 100%, 60%)"; 
    //document.getElementById("weather-summary").style.backgroundColor = "hsl(216, 100%, 60%)"; 
    console.log("this is within the displayWeather function");
    console.log(object);
 }


//time alter
//TODO setup if statement for day/night clock color

const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate(){
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`; //adjust the number of degrees that secondsDegrees specifies
    //console.log(seconds);
        
    //set min hand interval
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minutesDegrees}deg)`; //adjust the number of degrees that minutesDegrees specifies
    //console.log(minutes);
    //set hour hand interval
    const hours = now.getHours();
    const hourDegrees = ((hours / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`; //adjust the number of degrees that hourDegrees specifies
    console.log(hours);
}
setInterval(setDate, 1000);




