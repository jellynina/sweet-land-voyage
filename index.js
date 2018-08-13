"use strict";
/*== Sphero Connection ==*/
var Sphero = require("./node_modules/sphero/lib/sphero.js");
var theBall = new Sphero('af1f81cb842f4308a56657398413d334');
theBall.connect(function () {
  console.log("Now connected to Sphero Sperk +");
});