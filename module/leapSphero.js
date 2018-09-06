const Sphero = require("../node_modules/sphero/lib/sphero"),
  Leap = require('leapjs');

const theBall = new Sphero('af1f81cb842f4308a56657398413d334');



const express = require('express'),
  path = require('path');

const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);


// Leap motion controller
let newDirection = '?';
let previousDirection, controller;
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const UP = 'UP';
const DOWN = 'DOWN';
const FORWARD = 'FORWARD';
const BACKWARD = 'BACKWARD';

let spheroDataStream = {};

const spheroModule = () => {
  initConnections();
}
const initConnections = () => {
  console.log("Waiting for Sphero connection...");
  theBall.connect(() => {
    console.log('Connected to Sphero');
    initLeapMotionConnection();
    trytry();

    io.on('connection', (socket) => {
      io.emit('batteryUpdate', 'hi');
    });
    
  });
    

}

const trytry = () => {
  theBall.streamImuAngles();
  theBall.on("imuAngles", function (data) {
    io.emit('trytryDataStream', data);
    console.log('trytry');
  });

}

const initLeapMotionConnection = () => {
  controller = Leap.loop({
    frameEventName: 'deviceFrame',
    enableGestures: true
  });
  console.log('waiting for Leap Motion connection...');
  controller.connect();
  controller.setBackground(true);

  controller.on('connect', () => {
    console.log('connected to leap motion');
  });
  controller.on('ready', () => {
    console.log('ready');

  });
  controller.on('deviceStreaming', () => {
    console.log('!!!LEAP connected');
  });
  controller.on('deviceStopped', () => {
    console.log('!!!LEAP disconnected!!!');

  });
  controller.on('disconnect', ()=>{
    console.log('!!!LEAP disconnected!!!');
  });
  controller.on('frame', frame => {
    if (frame.hands[0]) {
      handleSwipe(frame.hands[0]);
    }
  });

  setInterval(() => {
    console.log('=======FLAG=========');
    if(controller.connected()){
      console.log('悠忽～還在');
    } else {
      console.log('斷線啦');
    }
    console.dir(controller.inBrowser());
    console.dir(controller.frame().valid);

  }, 5000);
}

/*
setInterval(() => {
  console.log("到底有沒有在動呢？");
}, 15000);
*/
const handleSwipe = hand => {
  let previousFrame = controller.frame(1);
  let movement = hand.translation(previousFrame);
  previousDirection = newDirection;

  if (movement[0] > 4) {
    newDirection = RIGHT;
  } else if (movement[0] < -4) {
    newDirection = LEFT;
  }

  if (movement[1] > 4) {
    newDirection = UP;
  } else if (movement[1] < -4) {
    newDirection = DOWN;
  }

  if (movement[2] > 4) {
    newDirection = BACKWARD;
  } else if (movement[2] < -4) {
    newDirection = FORWARD;
  }

  if (previousDirection !== newDirection) {
    console.log('Direction: ', newDirection);
    moveSphero(newDirection);
  } else {
    return;
  }
}

const moveSphero = direction => {
  switch (direction) {
    case LEFT:
      //sphero.roll(speed, heading, state, option). Heading is expressed in degrees.
      theBall.roll(70, 270, 1);
      console.log(' Sphero MOVE:', direction);
      break;
    case RIGHT:
      theBall.heading = 90;
      theBall.roll(70, 90, 1);
      console.log(' Sphero MOVE:', direction);
      break;
    case UP:
      stopSphero(theBall);
      break;
    case DOWN:
      stopSphero(theBall);
      break;
    case FORWARD:
      theBall.roll(70, 0, 1);
      console.log(' Sphero MOVE:', direction);
      break;
    case BACKWARD:
      theBall.heading = 180;
      theBall.roll(70, 180, 1);
      console.log(' Sphero MOVE:', direction);
      break;
    default:
      stopSphero(theBall);
  }
}

const stopSphero = theBall => {
  theBall.roll(0, theBall.heading || 0, 0);
};
module.exports = spheroModule;