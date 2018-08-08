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

var timeOfDay = document.querySelector("body");

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

var weather = document.querySelector(".weather");
// San Jose api call https://api.darksky.net/forecast/30140b1b2d59c74c554f1d3b9a88f167/37.3382,121.8863

/*var click = document.querySelector("button");
var bod = document.querySelector("body");
var isColor = false;

click.addEventListener("click", function(){
    if(isColor){
        bod.style.backgroundColor = "white";
        isColor = false;
    } else {
        bod.style.backgroundColor = "orange";
        isColor = true;
    }
});
*/





