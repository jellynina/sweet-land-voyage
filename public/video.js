// Connect to video

const video = document.getElementById("webcamfeed"),
      captureWebcam = document.getElementById("capturewebcam");

const targetID = 'vC4umQBBEQHHs9k6Wd4+m6WP60B7DBCyEVIFLRVXXM4=';
// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: false,
  video: true
};

let videoSource = 'vC4umQBBEQHHs9k6Wd4+m6WP60B7DBCyEVIFLRVXXM4=';
let videoSourceFlag = false;

function gotDevices(devices) {
  devices.forEach(device => {
    if (device.kind === 'videoinput'){
      //console.log('====== get device object:');
      //console.dir(device);
      videoSourceFlag = true;
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
  if(window.stream){
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const constraints = {
    audio: false,
    video: {
      deviceId: videoSource ? { exact: videoSource } : undefined
    }
  };
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

start();
