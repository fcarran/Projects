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

var weather = document.querySelector("#weather");
weather.style.color = "blue";