var socket = io();
var batteryInfoText = document.querySelector('#batteryStatus');
var trytryText = document.querySelector('#trytryData');
var soketFlag = document.querySelector('#soketFlag');
var BTNsocketRender = document.querySelector('#socketRender');



BTNsocketRender.addEventListener('click', () => {
  socket.emit('soketClick');
});

socket.on('soketFlag', (data) => {
  soketFlag.innerHTML = data;
});

socket.on('batteryUpdate', (data) => {
  batteryInfoText.innerHTML = "data: <br>" + "  batteryState:" + data.batteryState + "<br>  batteryVoltage:", data.batteryVoltage;
});

socket.on('trytryDataStream', (data) => {
  trytryText.innerHTML = data;
  console.log('trytryDataStream fire');
});