# Sweet Land Voyage


1. 目的一：擷取Leap motion 的指令，然後送到Sphero上面
    - [leapjs](https://github.com/leapmotion/leapjs)
2. 目的二：撈取usb影像播放
		- [HTML5 Webcam Tutorial](https://www.webcodegeeks.com/html5/html5-webcam-tutorial/)

# Connect with UUID

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

# Sphero data有哪些東西

```
{ desc: 'Get Bluetooth Info',
  idCode: undefined,
  event: 'bluetoothInfo',
  did: 0,
  cid: 17,
  packet:
   { sop1: 255,
     sop2: 255,
     mrsp: 0,
     seq: 0,
     dlen: 33,
     data:
      Buffer [
        83,
        75,
        45,
        52,
        101,
        49,
        50,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        102,
        55,
        49,
        97,
        97,
        98,
        97,
        55,
        52,
        101,
        49,
        50,
        0,
        0,
        0,
        0 ],
     checksum: 145 },
  name: 'SK-4e12000000000',
  btAddress: 'f71aaba74e12',
  separator: 0,
  colors: '0x0' }
```

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