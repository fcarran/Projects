
//isItDark();

//TODO: On page load, use a new wallpaper image

//weather alter
//var weather = document.querySelector(".weather");
// San Jose api call https://api.darksky.net/forecast/30140b1b2d59c74c554f1d3b9a88f167/37.3382,121.8863

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


  /* if(localStorage.getItem(lat, long) === "null" && navigator.geolocation){
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
  } else {
    localStorage.getItem(lat, long);
    showWeather(lat, long);
  } */

/*   do{
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation)
  } while (localStorage.getItem() == null);  */ 

  /* if(localStorage.getItem(lat, long) == true){
    console.log("we have the values!");
    localStorage.getItem(lat, long);
    showWeather(lat, long);
  }
  else{
    console.log("youre in the getitem if statement, need to ask for permissions");
    canWeGetWeather();
  } */

  function canWeGetWeather() {
      if(localStorage.getItem("lat") === null || localStorage.getItem("long") === null){ //STILL FAILING TO CHECK IF THIS VALUE EXISTS OR NOT
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
        //canWeGetWeather();
        //console.log(lat, long);
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
/* function canWeGetWeather() {
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
  } */
/* function canWeGetWeather(){
    //run below getCurrentPosition, else, pull it into showWeather so you don't have to see the permission prompt }
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
    }
} */
    
  

  /* function errorLocation(){
      canWeGetWeather();
  } */

  /* function checkAuthorized(){
      if(typeof localStorage['lat'] == "undefined" || localStorage['long'] == "undefined" ){
        errorLocation();
      }
      else 
      successLocation();
  }  */
  

/* 
  We're currently getting this when localStorage exists...seems I cannot getItems...
  https://api.darksky.net/forecast/30140b1b2d59c74c554f1d3b9a88f167/undefined,undefined?format=jsonp&callback=displayWeather 
 */

 
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




