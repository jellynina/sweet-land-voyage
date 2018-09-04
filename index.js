"use strict";

const Sphero = require("./node_modules/sphero/lib/sphero"),
Leap = require('leapjs'),
express = require('express'),
path = require('path');

const app = express();
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

app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});


/*== Sphero Connection ==*/

const spheroModule = () => {
  initConnections();
}
const initConnections = () => {
  console.log("Waiting for Sphero connection...");
  theBall.connect(() => { // Issue: 有沒有 err event可以處理，當一直連接不上的時候怎麼辦？
    console.log('Connected to Sphero');
    initLeapMotionConnection();
    getBluetoothData();
  });
}

const getBluetoothData = () => {
  theBall.getBluetoothInfo(function (err, data) {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log("data:");
      console.log("  name:", data.name);
      console.log("  btAddress:", data.btAddress);
      console.log("  separator:", data.separator);
      console.log("  colors:", data.colors);
    }
  });
}

spheroModule();

const initLeapMotionConnection = () => {
  controller = Leap.loop({ frameEventName: 'deviceFrame', enableGestures: true });
  console.log('waiting for Leap Motion connection...');

  controller.connect();

  controller.on('connect', () => {
    console.log('connected to leap motion');
  });
  controller.on('ready', () => {
    console.log('ready');
  });
  controller.on('deviceStreaming', () => {
    console.log('device connected');
  });
  controller.on('deviceStopped', () => {
    console.log('device disconnected');
  });
  controller.on('frame', frame => {
    if (frame.hands[0]) handleSwipe(frame.hands[0]);
  });
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
      break;
    case RIGHT:
      theBall.heading = 90;
      theBall.roll(70, 90, 1);
      break;
    case UP:
      stopSphero(theBall);
      break;
    case DOWN:
      stopSphero(theBall);
      break;
    case FORWARD:
      theBall.roll(70, 0, 1);
      break;
    case BACKWARD:
      theBall.heading = 180;
      theBall.roll(70, 180, 1);
      break;
    default:
      stopSphero(theBall);
  }
}

const stopSphero = theBall => {
  theBall.roll(0, theBall.heading || 0, 0);
};
