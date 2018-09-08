var socket = io();
var batteryInfoText = document.querySelector('#batteryStatus');
var soketFlagText = document.querySelector('#soketFlag');
var BTNStartGame = document.querySelector('#Start');




BTNStartGame.addEventListener('click', () => {
  socket.emit('getConnectionClick');
  //socket.emit('getBatteryClick');
  // Start Count Down
});


socket.on('batteryUpdate', (data) => {
  batteryInfoText.innerHTML = "data: <br>" + "  batteryState:" + data.batteryState + "<br>  batteryVoltage:" + data.batteryVoltage;
});
