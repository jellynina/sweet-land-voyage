"use strict";

const express = require('express'),
path = require('path');
const leapSphero = require('./module/leapSphero.js')();


const app = express();

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
