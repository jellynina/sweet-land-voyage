# Sweet Land Voyage


1. 目的一：擷取Leap motion 的指令，然後送到Sphero上面
    - [leapjs](https://github.com/leapmotion/leapjs)
2. 目的二：撈取usb影像播放
		- [HTML5 Webcam Tutorial](https://www.webcodegeeks.com/html5/html5-webcam-tutorial/) : 
		這個在Firefox裡面會有type err. 不知道為什麼？
		- [Choose Cameras, Microphones and Speakers from Your Web App ](https://developers.google.com/web/updates/2015/10/media-devices#enumeratedevices)

3. 待辦：expree sass整合

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