// window.onresize (#event) to display the size of the window live
// source: https://stackoverflow.com/a/7935753/22952433
var scrHeight = window.innerHeight;

window.onresize = displayWindowSize;
window.onload = displayWindowSize;

function displayWindowSize() {

  myWidth = window.innerWidth;
  myHeigth = window.innerHeight;
  document.querySelector("#dimensions span").innerHTML = myWidth + " x " + myHeigth;
}

// display current date, time and timezone
function displayDateTime() {
  var date = new Date();
  var day = date.toLocaleString('en-US', { weekday: 'long' });
  var ddmmyy = date.toLocaleDateString('de-DE', { 
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
  });
  var hhmmss = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
  });
  var timezone = 'UTC' + (date.getTimezoneOffset() < 0 ? '+' : '-') + Math.abs(date.getTimezoneOffset() / 60);

  document.getElementById('clock').innerText = `${timezone} ${hhmmss} ${day} ${ddmmyy} `;

  setTimeout(displayDateTime, 1000);
}

displayDateTime();

// Get mouse position and show in #mouse_pos div
var mousePosElement = document.querySelector('#mouse_pos span');

function updateMousePosition(event) {
    var { pageX, pageY } = event;
    mousePosElement.textContent = `(${pageX}, ${pageY})`;
}

document.addEventListener('mousemove', updateMousePosition);

// Play audio on click on specified element
var audio = new Audio("/sounds/vroom.mp3");
audio.preload = "auto";

function playAudio() {
    audio.currentTime = 0;
    audio.play();
}

// Show key code and key pressed in #key-log div
var keyCodeElement = document.querySelector("#key-code span");
var keyKeyElement = document.querySelector("#key-key span");

function updateKeyInfo(event) {
  var { keyCode, key } = event;
  keyCodeElement.textContent = keyCode;

  switch (keyCode) {
      case 32:
          keyKeyElement.textContent = "Space";
          break;
      default:
          keyKeyElement.textContent = key;
  }
}

document.addEventListener("keydown", updateKeyInfo);


// Drawing a line and measure distance and mouse speed while mouse button is pressed
// Declare variables
// Declare variables
var isDrawing = false;
var distance = 0;
var speed = 0;
var startTime = 0;
var lastX = 0;
var lastY = 0;
var isCtrlPressed = false;
var lastLoggedPosition = null;


// Get the canvas element and context
var canvas = document.getElementById('canvas');
var context = canvas ? canvas.getContext('2d') : null;

// Get the mouse speed and traveled elements
var mouseSpeedElement = document.getElementById('mouse-speed');
var mouseTraveledElement = document.getElementById('mouse-traveled');

// Array to store click positions
var clickPositions = [];

// Set canvas dimensions to match the parent container
if (canvas) {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

// Helper function to calculate distance between two points
function calculateDistance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Helper function to update the mouse speed and traveled elements
function updateMouseInfo() {
    if (mouseSpeedElement) {
        mouseSpeedElement.textContent = speed.toFixed(2) + ' px/sec';
    }
    if (mouseTraveledElement) {
        mouseTraveledElement.textContent = distance.toFixed(2) + ' px';
    }
}

// Function to get a random color
function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Event listener for mousedown event on the canvas
function handleMouseDown(event) {
  if (event.button === 0) {
      isDrawing = true;
      [lastX, lastY] = [event.offsetX, event.offsetY];
      if (context) {
          context.beginPath();
          context.moveTo(lastX, lastY);
          context.lineWidth = 4;
      }
      distance = 0;
      startTime = Date.now();
      
      // Log start position only if it's different from the last logged position
      logPosition(lastX, lastY, 'Start');
  }
}

// Event listener for mousemove event on the canvas
function handleMouseMove(event) {
  if (isDrawing && context) {
      var currentX = event.offsetX;
      var currentY = event.offsetY;

      context.strokeStyle = getRandomColor();
      context.lineTo(currentX, currentY);
      context.stroke();
      distance += calculateDistance(lastX, lastY, currentX, currentY);
      lastX = currentX;
      lastY = currentY;
  }
  
  if (isCtrlPressed) {
      checkHoverEffect(event.offsetX, event.offsetY);
  }
}

// Event listener for mouseup and mouseout events on the canvas
function handleMouseUp(event) {
  if (isDrawing) {
      isDrawing = false;
      var endTime = Date.now();
      var elapsedTime = (endTime - startTime) / 1000;
      speed = distance / elapsedTime;
      updateMouseInfo();
      
      // Log end position only if the distance traveled is significant
      if (distance > 5) {  // Adjust this threshold as needed
          logPosition(event.offsetX, event.offsetY, 'End');
      }
  }
}

// Function to log position
function logPosition(x, y, label) {
  var position = `${label}: (${x.toFixed(2)}, ${y.toFixed(2)})`;
  
  // Check if this position is significantly different from the last logged position
  if (!lastLoggedPosition || calculateDistance(x, y, lastLoggedPosition.x, lastLoggedPosition.y) > 5) {
      // Set font and random color
      context.font = '14px Arial';
      var color = getRandomColor();
      context.fillStyle = color;

      // Draw text at click position
      context.fillText(position, x, y);

      // Log to console
      console.log(position);

      // Store position for hover effect
      clickPositions.push({x, y, color, text: position});

      // Update last logged position
      lastLoggedPosition = {x, y};
  }
}

// Function to log mouse clicks
function logMouseClicks() {
  canvas.addEventListener('click', function(event) {
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      
      // Only log the click if it's not the end of a draw operation
      if (!isDrawing) {
          logPosition(x, y, 'Click');
      }
  });
}

// Function to check and apply hover effect
function checkHoverEffect(mouseX, mouseY) {
    if (!context) return;

    // Clear previous hover effects
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    let hoveredPosition = null;

    // Check if mouse is directly over any logged position
    clickPositions.forEach(pos => {
        var distance = calculateDistance(mouseX, mouseY, pos.x, pos.y);
        if (distance <= 10) { // Adjust this value for "direct hover" sensitivity
            hoveredPosition = pos;
        }
    });

    // Apply fade effect to everything
    context.save();
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();

    // Redraw all logged positions with fade
    clickPositions.forEach(pos => {
        context.font = '14px Arial';
        context.fillStyle = `rgba(${hexToRgb(pos.color)}, 0.5)`;
        context.fillText(pos.text, pos.x, pos.y);
    });

    // If a position is being hovered, highlight it
    if (hoveredPosition) {
        context.beginPath();
        context.arc(hoveredPosition.x, hoveredPosition.y, 50, 0, 2 * Math.PI);
        context.fillStyle = 'rgba(255, 255, 255, 0.7)'; // Semi-transparent white
        context.fill();

        context.font = 'bold 14px Arial';
        context.fillStyle = hoveredPosition.color;
        context.fillText(hoveredPosition.text, hoveredPosition.x, hoveredPosition.y);
    }
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
    var result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i.exec(hex);
    return result ? result.slice(1).join(',') : null;
}

// Function to log mouse clicks
function logMouseClicks() {
    canvas.addEventListener('click', function(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        logPosition(x, y, 'Click');
    });
}

// Add event listeners to the canvas
if (canvas) {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp);
    logMouseClicks(); // Start logging mouse clicks
}