var socket = io();
var batteryInfoText = document.querySelector('#batteryStatus');
var trytryText = document.querySelector('#trytryData');

socket.on('batteryUpdate', (data) => {
  batteryInfoText.innerHTML = data;
});

socket.on('trytryDataStream', (data) => {
  trytryText.innerHTML = data;
  console.log('trytryDataStream fire');
});