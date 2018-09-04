"use strict";

const Sphero = require("./node_modules/sphero/lib/sphero"),
leapjs = require('leapjs'),
express = require('express'),
path = require('path');

const app = express();
const theBall = new Sphero('af1f81cb842f4308a56657398413d334');

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

//spheroModule();
