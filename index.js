"use strict";
/*== Sphero Connection ==*/
var Sphero = require("./node_modules/sphero/lib/sphero.js");
//var Sphero = require('sphero');

var theBall = new Sphero('af1f81cb842f4308a56657398413d334');

const spheroModule = () => {
  initConnections();

}

const initConnections = () => {
  console.log("Waiting for Sphero connection...");

  theBall.connect(() => {
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

spheroModule();