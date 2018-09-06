"use strict";

const express = require('express'),
path = require('path');
const leapSphero = require('./module/leapSphero.js')();

const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');
//  io.emit('batteryUpdate', 'hi');
});

/*== Express webserver ==*/
app.use(express.static('public'));
/*== Expree Webserver ==*/
app.set('view engine', 'pug');
app.get('/', (req, res) => {
  res.render('index', {
    data: "Push th button to get the information"
  });
});

app.post('/', (req, res) => {
  console.log("Post trigger");
  var dataTemp = "資料初始";
  spheroModule();
  res.render('index', {
    data: dataTemp
  });
});


http.listen(3000, function () {
  console.log('listening on *:3000');
});