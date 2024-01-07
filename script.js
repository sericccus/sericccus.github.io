// window.onresize (#event) to display the size of the window live
// source: https://stackoverflow.com/a/7935753/22952433

window.onresize = displayWindowSize;
window.onload = displayWindowSize;

function displayWindowSize() {
  myWidth = window.innerWidth;
  myHeigth = window.innerHeight;
  // your size calculation code here
  document.querySelector("#dimensions span").innerHTML = myWidth + " x " + myHeigth;
}

// display current date, time and timezone
// source ?
function displayDateTime() {
    var date = new Date();
    var day = date.toLocaleString('en-US', { weekday: 'short'});
    var ddmmyy = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear().toString().substr(-2);
    var hhmmss = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) // + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var timezone = date.getTimezoneOffset() / 60 === 0 ? 'UTC' : 'UTC' + (date.getTimezoneOffset() / 60 < 0 ? '+' : '') + date.getTimezoneOffset() / 60;

    document.getElementById('clock').innerText = day.slice(0, 2) + " " + ddmmyy + '\n' + hhmmss + " " + "BER"; // replaced timezone with "Berlin"

    setTimeout(displayDateTime, 1000); // Call the function again in 1 second
}
displayDateTime(); // Start the process

// onmousemove = (e) => console.log("mouse location:", e.x, e.y)

// getting the info div for the mouse position below
var info = document.querySelector('#info span');
function tellPos(p){ // creating function to get position of cursor
  info.innerHTML = "(" + p.pageX + ", " + p.pageY + ")"; 
  // PageX and PageY will getting position values and show them in P
}
addEventListener('mousemove', tellPos, false);

var audio = new Audio("/sounds/vroom.mp3").preload;
function play() {
  audio.currentTime = 0; 
  new Audio("/sounds/vroom.mp3").play();;
}