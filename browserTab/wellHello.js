//body alter
const timeOfDay = document.querySelector("body");

function isItDark(){
    var timeInMs = new Date().getHours()
    // console.log(timeInMs);
    //if time is less than noon (12)
    if(timeInMs < 12){
        timeOfDay.classList.toggle("day"); //toggle morning css
    }
    //if time is more than 12
    if(timeInMs > 12){
        timeOfDay.classList.toggle("night"); //toggle day css
    }
}

isItDark();

//weather alter
var weather = document.querySelector(".weather");
// San Jose api call https://api.darksky.net/forecast/30140b1b2d59c74c554f1d3b9a88f167/37.3382,121.8863

var getWeather = function() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            showWeather(lat, long)
        })
    }
    else {
        window.alert("Unable to find location");
    }
}

function showWeather(lat, long){
    var url = `https://api.darksky.net/forecast/30140b1b2d59c74c554f1d3b9a88f167/${lat},${long}`;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object);
}

function farenheitToCelsius(k) {
    return Math.round((k - 32) * 0.5556);
}

function humidityPercentage(h) {
    return Math.round(h * 100);
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




