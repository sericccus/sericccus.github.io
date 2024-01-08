// window.onresize (#event) to display the size of the window live
// source: https://stackoverflow.com/a/7935753/22952433

window.onresize = displayWindowSize;
window.onload = displayWindowSize;

function displayWindowSize() {
  myWidth = window.innerWidth;
  myHeigth = window.innerHeight;
  document.querySelector("#dimensions span").innerHTML = myWidth + " x " + myHeigth;
}

// display current date, time and timezone
// source ?
function displayDateTime() {
    var date = new Date();
    var day = date.toLocaleString('en-US', { weekday: 'short'});
    var ddmmyy = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear().toString().substr(-2);
    var hhmmss = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var timezone = date.getTimezoneOffset() / 60 === 0 ? 'UTC' : 'UTC' + (date.getTimezoneOffset() / 60 < 0 ? '+' : '') + date.getTimezoneOffset() / 60;

    document.getElementById('clock').innerText = day.slice(0, 2) + " " + ddmmyy + '\n' + hhmmss; 

    setTimeout(displayDateTime, 1000); // Call the function again in 1 second
}
displayDateTime(); // Start the process



// GET MOUSE POSITION AND SHOW IN #mouse_pos DIV
var mouse_pos = document.querySelector('#mouse_pos span');
onmousemove = (e) => console.log(e)
function tellPos(p){
  mouse_pos.innerHTML = "(" + p.pageX + ", " + p.pageY + ")"; 
  // PageX and PageY are event-object-keys ===> check console.log(e)
}
addEventListener('mousemove', tellPos, false);

// PLAY AUDIO ON CLICK ON SPECIFIED ELEMENT ===> onclick="play()" attribute in HTML
var audio = new Audio("/sounds/vroom.mp3").preload;
function play() {
  audio.currentTime = 0; 
  new Audio("/sounds/vroom.mp3").play();;
}

// SHOW KEY CODE AND KEY PRESSED IN #key-log DIV
const var_KeyCode = document.querySelector("#key-code span");
let KeyKey = document.querySelector("#key-key span");
document.addEventListener("keydown", function(e) { // e is just a var, it just accesses the event 
  var_KeyCode.innerText = String(e.keyCode);
  KeyKey.innerText = String(e.key);
});

// MAKE CHANGE ON MOUSEOVER
// MAKE THE BALL JUMP ON CLICK

// MAKE THE BALL JUMP ON CLICK IN DIRECTION OF MOUSE POS

// DARK AND LIGHT THEME SWITCHER

// MAKE THE BALL MOVE IN X and Y USING ARROW KEYS, HJKL, MOUSEDRAG, MOUSEMOVEMENT IN DIV, OR JOYSTICK (later)

// MAKE SPECIFIED ELEMENTS DRAGGABLE AFTER ACTVIATING A VISUAL SWITCH WITH INDICATOR (PLAY MODE?)

// IMPLEMENT BILLARD ON PAGE

// GRID DEVIDES INTO SECTIONS à 12vw x 12vh, 12x12=144