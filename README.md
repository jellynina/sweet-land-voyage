# Sweet Land Voyage


1. 目的一：擷取Leap motion 的指令，然後送到Sphero上面
    - [leapjs](https://github.com/leapmotion/leapjs)
2. 目的二：撈取usb影像播放
		- [HTML5 Webcam Tutorial](https://www.webcodegeeks.com/html5/html5-webcam-tutorial/) : 
		這個在Firefox裡面會有type err. 不知道為什麼？
		- [Choose Cameras, Microphones and Speakers from Your Web App ](https://developers.google.com/web/updates/2015/10/media-devices#enumeratedevices)

3. 待辦：expree sass整合
4. 按鈕啟動機器球




# USB2.0 PC CAMERA

狀況：如果Leap motion連接，則會讀不到`USB2.0 PC CAMERA`，所以需要把input source固定，而不是使用選擇的方式。
一開始串接的範本 [github](https://github.com/webrtc/samples/tree/gh-pages/src/content/getusermedia/gum)


## 使用 `enumerateDevices()` 去抓取連接media狀況

取得DeviceId資料
```js
navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
  devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
  });
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});
```

`videoinput: USB2.0 PC CAMERA id = vC4umQBBEQHHs9k6Wd4+m6WP60B7DBCyEVIFLRVXXM4= debugger eval code:4:5 `


參考
- [git](https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js)寫法
- [MDN MediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)


# Sphero issue

有人有跟我一樣的問題[issue 93](https://github.com/orbotix/sphero.js/issues/93)

```
Unhandled rejection Error: Command sync response was lost.
    at Sphero.handler (/Users/ikeatouchbar/Documents/Sphero/sweetVoyage/node_modules/sphero/lib/sphero.js:252:21)
    at ontimeout (timers.js:482:11)
    at tryOnTimeout (timers.js:317:5)
    at Timer.listOnTimeout (timers.js:277:5)
```



# Connect Sphero with UUID

使用noble尋找UUID

```
$ node ./node_modules/noble/examples/advertisement-discovery.js
```

```
peripheral discovered (af1f81cb842f4308a56657398413d334 with address <unknown, unknown>, connectable true, RSSI -61:
	hello my local name is:
		SK-4E12
	can I interest you in any of the following advertised services:
		[]
	here is my manufacturer data:
		"3530"
	my TX power level is:
		-10
```

# node `play.js`

```js

"use strict";
var Sphero = require("./lib/sphero");
var theBall =   new Sphero('af1f81cb842f4308a56657398413d334');
theBall.connect(function () {
  console.log("Now connected to Sphero Sperk +");
});
```

---


# 尋找網路上的各種案例

Controlling Sphero with Leap Motion + Cylon.js

-[blog](http://blog.leapmotion.com/controlling-sphero-leap-motion-cylon-js/) |
[github](https://github.com/charliegerard/leap_sphero)
- 這個是使用express 建立web server的


Framer and Firebase
- [github](https://github.com/mamezito/SpheroBB8FramerNodeJS)


----
# 不清不楚

- `package-lock.json`是幹嘛的？
- 需要寫test嗎？