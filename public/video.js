// Connect to video

const video = document.getElementById("webcamfeed"),
      captureWebcam = document.getElementById("capturewebcam");

//const targetID = 'vC4umQBBEQHHs9k6Wd4+m6WP60B7DBCyEVIFLRVXXM4=';
// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: false,
  video: true
};

let videoSourceFlag = false;
let VideoArray = [];

function gotDevices(devices) {
  devices.forEach(device => {
    if (device.kind === 'videoinput'){
      videoSourceFlag = true;
      VideoArray.push({
        kind: device.kind,
        label: device.label,
        id: device.deviceId
      });
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);


function gotStream(stream) {
  window.stream = stream; // make stream available to console
  video.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}


function start(){
  console.log(VideoArray);
  if(window.stream){
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  // VideoArray.forEach((obj) => {
  //   if (obj.label == 'USB2.0 PC CAMERA'){
  //     constraints.video = obj.id;
  //   }
  // });

  navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

document.querySelector('#Start').addEventListener('click', e => start());