"use strict";
const express = require('express'),
      path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);



//Leap and Sphero
const Sphero = require("./node_modules/sphero/lib/sphero"),
      Leap = require('leapjs');
const theBall = new Sphero('af1f81cb842f4308a56657398413d334');

// Leap motion controller
let newDirection = '?';
let previousDirection, controller;
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const UP = 'UP';
const DOWN = 'DOWN';
const FORWARD = 'FORWARD';
const BACKWARD = 'BACKWARD';
const configCountdown =203;

let countdown = configCountdown;
let gameOn = false;

const initConnections = () => {
  console.log("Waiting for Sphero connection...");
  theBall.connect(() => {
    console.log('Connected to Sphero');
    initLeapMotionConnection();
    getBattery();
    trytry();
    startCountdown();
  });
}

io.on('connection', (client) => {
  client.on('getConnectionClick', () => {
    gameOn = true;
    initConnections();
    // startCountdown();
    io.emit('GameOn');
 });
 client.on('endClick', () => {
   gameOn = false;
  endConnection();
  resetCounting();
  io.emit('GameSTOP');
 });
  
});


const startCountdown = () => {
  setInterval(() => {
    if (countdown > 0 && gameOn) {
      countdown--;
      io.emit('timerChange', {
        countdown: countdown
      });
    } else {
      io.emit('GameSTOP');
    }
  }, 1000);
}

const resetCounting = () => {
  countdown = configCountdown;
  io.emit('timerChange', {
    countdown: countdown
  });
}

const endConnection = () => {
  //停止Leapmotion
  //停止sphero
  console.log('endConnection');
  stopConnection();
}

const stopConnection = () => {
  controller = Leap.loop({
    frameEventName: 'deviceFrame',
    enableGestures: false
  });
  controller.disconnect();
  io.emit('GameSTOP');
}


const getBattery = () => {
  theBall.getPowerState(function (err, data) {
    if (err) {
      console.log("error: ", err);
    } else {
      io.emit('batteryUpdate', data);
      console.log("data:");
      console.log("  recVer:", data.recVer);
      console.log("  batteryState:", data.batteryState);
      console.log("  batteryVoltage:", data.batteryVoltage);
      console.log("  chargeCount:", data.chargeCount);
      console.log("  secondsSinceCharge:", data.secondsSinceCharge);
    }
  });
}


const trytry = () => {
  theBall.detectCollisions();
  theBall.on("collision", function (data) {
    console.log("collision data:");
    console.log("  x:", data.x);
    console.log("  y:", data.y);
    console.log("  z:", data.z);
    console.log("  axis:", data.axis);
    console.log("  xMagnitud:", data.xMagnitud);
    console.log("  yMagnitud:", data.yMagnitud);
    console.log("  speed:", data.timeStamp);
    console.log("  timeStamp:", data.timeStamp);
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
  controller.on('disconnect', () => {
    console.log('!!!LEAP disconnected!!!');
  });
  controller.on('frame', frame => {
    if (frame.hands[0]) {
      handleSwipe(frame.hands[0]);
    }
  });
/*
  setInterval(() => {
    console.log('=======FLAG=========');
    if (controller.connected()) {
      console.log('悠忽～還在');
    } else {
      console.log('斷線啦');
    }
    console.dir(controller.inBrowser());
    console.dir(controller.frame().valid);

  }, 5000);
  */
}

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
