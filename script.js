// window.onresize (#event) to display the size of the window live
// source: https://stackoverflow.com/a/7935753/22952433
var scrHeight = window.innerHeight;

window.onresize = displayWindowSize;
window.onload = displayWindowSize;

function displayWindowSize() {
  move();
  myWidth = window.innerWidth;
  myHeigth = window.innerHeight;
  document.querySelector("#dimensions span").innerHTML = myWidth + " x " + myHeigth;
}

// display current date, time and timezone
// source ?
function displayDateTime() {
    var date = new Date();
    var day = date.toLocaleString('en-US', { weekday: 'long'});
    // var ddmmyy = ("0" + (date.getDate())).slice(-2) + '.' + (date.getMonth() + 1) + '.' + date.getFullYear().toString().substr(-2);
    var ddmmyy = date.toLocaleDateString("de-DE", { 
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

    var hhmmss = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var timezone = date.getTimezoneOffset() / 60 === 0 ? 'UTC' : 'UTC' + (date.getTimezoneOffset() / 60 < 0 ? '+' : '') + date.getTimezoneOffset() / 60;

    document.getElementById('clock').innerText = day + "\n" + ddmmyy + '\n' + hhmmss; 

    setTimeout(displayDateTime, 1000); // Call the function again in 1 second
}
displayDateTime(); // Start the process

// GET MOUSE POSITION AND SHOW IN #mouse_pos DIV
var mouse_pos = document.querySelector('#mouse_pos span');
// onmousemove = (e) => console.log(e)
function tellPos(p){
  mouse_pos.innerHTML = "(" + p.pageX + ", " + p.pageY + ")"; 
  // PageX and PageY are event-object-keys ===> check console.log(e)
}
addEventListener('mousemove', tellPos, false);

// PLAY AUDIO ON CLICK ON SPECIFIED ELEMENT ===> onclick="play()" attribute in HTML
var audio = new Audio("/sounds/vroom.mp3");
audio.preload = "auto"; // Set preload property
function play() {
  audio.currentTime = 0; 
  audio.play(); // Use the same Audio object for playback
}

// SHOW KEY CODE AND KEY PRESSED IN #key-log DIV
const var_KeyCode = document.querySelector("#key-code span");
let KeyKey = document.querySelector("#key-key span");
document.addEventListener("keydown", function(e) { // e is just a var, it just accesses the event 
  // e.preventDefault();
  var_KeyCode.innerText = String(e.keyCode);
  KeyKey.innerText = String(e.key);
});

const circle = document.getElementById('circle');
const circle_pos = getComputedStyle(circle).bottom;
let yPos = 0;
let velocity = 0;
const gravity = 0.5;

function bounce() {
  velocity -= gravity; // Apply gravity

  yPos += velocity; // Update position
  if (yPos <= 0) {
    // If the circle hits the bottom, reset values
    yPos = 0;
    velocity *= -0.8; // Simulate bounce (damping)
  }
  // Apply the new position
  circle.style.bottom = yPos + 'px';
  // Continue the animation
  requestAnimationFrame(bounce);
}
// Trigger the bounce animation on click
circle.addEventListener('click', function() {
  velocity = 20; // Initial upward velocity
  requestAnimationFrame(bounce);
});
// Trigger the bounce animation on click

// flying ball
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scr = canvas.getContext('2d');
// x and y are coordinates of circle
// vx and vy are the speeds
let x = Math.floor(Math.random() * innerWidth);
let y = Math.floor(Math.random() * innerHeight);
let vx = Math.floor(Math.random() * 50);
let vy = Math.floor(Math.random() * 50);
let radius = 10;

move();
// move() will do the animation 
function move(){
  requestAnimationFrame(move);

  // clear the specified pixels within the given rectangle
  scr.clearRect(0, 0, innerWidth, innerHeight);

  // create circle
  scr.beginPath();
  scr.fillStyle = "white";
  scr.arc(x,y, radius, 0, radius, false);
  scr.fill();

  // make ball bounce from edges
  if( radius + x > innerWidth ) vx = 0 - vx;
  if( x - radius < 0 ) vx = 0 - vx;
  if( radius + y > innerHeight ) vy = 0 - vy;
  if( y - radius < 0 ) vy = 0 - vy;

  x = x + vx;
  y = y + vy;
};
// window.onresize = stopFunctions(){
//   clearTimeout(move);
//   clearTimeout(animate);
// };