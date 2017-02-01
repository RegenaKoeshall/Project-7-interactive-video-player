/*synchronizes the video and the transcript. 
highlight as the video progresses.
When a user clicks any part of the transcript it should take them to the appropriate place in the video.*/


  
  // Video
  let myVideo = document.getElementById("my-video");

  // Buttons
  let playButton = document.getElementById("play-pause");
  let muteButton = document.getElementById("mute");
  let fullScreenButton = document.getElementById("full-screen");

//Seek bar and time
  let seekBar = document.getElementById("seek-bar");
  let sbarContainer = document.getElementById("sbar-container");
  let timeField = document.getElementById("time-field");

 let videoContainer =  document.getElementById("video-container");
  let videoControls = document.getElementById("video-controls");
 

window.addEventListener("load", function() {
  playButton.addEventListener("click", playOrPause, false);
  sbarContainer.addEventListener("click", skip, false);
  muteButton.addEventListener("click", muteOrUnmute, false);
  videoControls.addEventListener("mouseover", mouseOver);
  videoControls.addEventListener("mouseout", mouseOut);
  updatePlayer();
  
}, false);


// Event listener for the play/pause button
function playOrPause() {
  if (myVideo.paused) {
    myVideo.play();

    // Update the button text to 'Pause'
    playButton.src = "icons/pause-icon.png";
    update = setInterval(updatePlayer, 30);
  } else {
    // Pause the video
    myVideo.pause();
    playButton.src = "icons/play-icon.png";
    window.clearInterval(update);
    }
  }

function updatePlayer() {
  let percentage = (myVideo.currentTime/myVideo.duration)*100;
  seekBar.style.width = percentage + "%";
  timeField.innerHTML = getFormattedTime();
  if (myVideo.ended) {
    window.clearInterval(update);
  }
}
function skip(ev) {
  let mouseX = ev.pageX - sbarContainer.offsetLeft;
  let width =window.getComputedStyle(sbarContainer).getPropertyValue("width");
  width = parseFloat(width.substr(0, width.length - 2));
  
  myVideo.currentTime = (mouseX/width)*myVideo.duration;
  updatePlayer(); 
}

function getFormattedTime() {
  let seconds = Math.round(myVideo.currentTime);
  let minutes = Math.floor(seconds/60);
  if (minutes > 0) seconds -= minutes*60;
  if (seconds.toString().length === 1) seconds = '0' + seconds;
  
  let totalSeconds = Math.round(myVideo.duration);
  let totalMinutes = Math.floor(totalSeconds/60);
  if (totalMinutes > 0) totalSeconds -= totalMinutes*60;
  if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;
  
  return minutes + ':' + seconds + '/' + totalMinutes + ':' + totalSeconds;
}


// Event listener for the mute button
function muteOrUnmute() {
  if (myVideo.muted ===false) {
    // Mute the video
    myVideo.muted = true;

    // Update the button text
    muteButton.src="icons/volume-off-icon.png";
  } else {
    // Unmute the video
    myVideo.muted = false;

    // Update the button text
    muteButton.src="icons/volume-on-icon.png";
  }
};


// Pause the video when the slider handle is being dragged
seekBar.addEventListener("mousedown", function() {
  myVideo.pause();
});

// Play the video when the slider handle is dropped
seekBar.addEventListener("mouseup", function() {
  myVideo.play();
});

// Event listener for the full-screen button
fullScreenButton.addEventListener("click", function() {
  if (myVideo.requestFullscreen) {
    myVideo.requestFullscreen();
  } else if (myVideo.mozRequestFullScreen) {
    myVideo.mozRequestFullScreen(); // Firefox
  } else if (myVideo.webkitRequestFullscreen) {
    myVideo.webkitRequestFullscreen(); // Chrome and Safari
  }
});


let lines = document.getElementById("captions-container").getElementsByTagName("span"); 
let now = myVideo.currentTime;

    // Update the time as the video plays
myVideo.addEventListener("timeupdate", function() {
    // loop through each span
for (var i = 0; i < lines.length; i++) {

    var now = myVideo.currentTime;
    var start = lines[i].getAttribute("data-start");
    var end = lines[i].getAttribute("data-end");    

      if (now >= start && now <= end) {
        lines[i].className = "current";
      } else {
        lines[i].className = "";
      }
    }
});


function mouseOver() {
     videoControls.style.display = "inline";
}

function mouseOut() {
      videoControls.style.display = "none";  
}


