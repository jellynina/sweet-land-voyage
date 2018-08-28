// Connect to video

const startStream = document.getElementById("webcamfeed"),
      captureWebcam = document.getElementById("capturewebcam");
console.log('we go the video.js');

const getUserMedia = () => {
  if (navigator.getUserMedia){
    console.log('==v==Navigation:');
    console.dir(navigator.getUserMedia);
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  } else {
    navigator.getUserMedia = navigator.mediaDevices.getUserMedia;
  }
  return navigator.getUserMedia;
}

captureWebcam.addEventListener('click', () => {
  var media = getUserMedia();
  if(media){}
})