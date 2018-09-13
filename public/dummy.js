var socket = io();
var batteryInfoText = document.querySelector('#batteryStatus');
var soketFlagText = document.querySelector('#soketFlag');
var BTNStartGame = document.querySelector('#Start');
var BTNEndGame = document.querySelector('#End');
var gameTimmer = document.querySelector('#gameTimmer');

gameTimmer.innerHTML = '1000';



BTNStartGame.addEventListener('click', () => {
  socket.emit('getConnectionClick');
  //socket.emit('getBatteryClick');
  // Start Count Down
});

socket.on('timerChange', (data) => {
  console.log("timer trigger" + data.countdown);
  gameTimmer.innerHTML = 'Time: ' + data.countdown;
});


socket.on('batteryUpdate', (data) => {
  batteryInfoText.innerHTML = "data: <br>" + "  batteryState:" + data.batteryState + "<br>  batteryVoltage:" + data.batteryVoltage;
});
