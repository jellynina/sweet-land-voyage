var socket = io();
var batteryInfoText = document.querySelector('#batteryStatus');
var soketFlagText = document.querySelector('#soketFlag');
var BTNStartGame = document.querySelector('#Start');
var BTNEndGame = document.querySelector('#End');
var gameTimmer = document.querySelector('#gameTimmer');

BTNEndGame.style.visibility = 'hidden';



BTNStartGame.addEventListener('click', () => {
  socket.emit('getConnectionClick');
});

BTNEndGame.addEventListener('click', () => {
  socket.emit('endClick');
})

socket.on('timerChange', (data) => {
  // console.log("timer trigger" + data.countdown);
  gameTimmer.innerHTML = 'Time: ' + data.countdown;
});


socket.on('batteryUpdate', (data) => {
  batteryInfoText.innerHTML = "data: <br>" + "  batteryState:" + data.batteryState + "<br>  batteryVoltage:" + data.batteryVoltage;
});

// Basic Status
socket.on('GameOn', (data) => {
  BTNStartGame.style.visibility = 'hidden';
  //BTNEndGame.style.visibility = 'visible';
});

socket.on('GameSTOP', (data) => {
  BTNStartGame.style.visibility = 'visible';
  //BTNEndGame.style.visibility = 'hidden';
});