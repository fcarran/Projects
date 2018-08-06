/*
---Example DOM manipulation, changes body color from white to blue every 1 second
var body = document.querySelector("body");
var isBlue = false; 

setInterval(function(){
    if(isBlue){
        body.style.background = "white";
    } else {
        body.style.background = "#3498db";
    }
    isBlue = !isBlue;
}, 1000);
*/

var weather = document.querySelector(".weather");
// San Jose api call https://api.darksky.net/forecast/30140b1b2d59c74c554f1d3b9a88f167/37.3382,121.8863