const audio  = document.getElementById('audioPlayer'); 
const volume = document.getElementById('audio_volume'); 
const back   = document.getElementById('pback'); 
const play   = document.getElementById('pplay'); 
const pause  = document.getElementById('ppause'); 
const stop   = document.getElementById('pstop'); 
const forw   = document.getElementById('pforw');
const volumen = document.getElementById('volumen'); 
const loader = document.getElementById('loader'); 
const canvas = document.getElementById('canvas'); 

var canvasCtx = canvas.getContext("2d");

window.AudioContext = window.AudioContext || window.webkitAudioContext;


var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();

var source = audioCtx.createMediaElementSource(audio); 

source.connect(analyser); 

analyser.connect(audioCtx.destination); 

proba();

var sours,vol,timer,duration, bars = 100, bar_x, bar_width, bar_height, canvass; 
const player = {}; 


function proba() {
    window.requestAnimationFrame(proba);
    var dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = "rgb(59, 200, 231)";

    for(var i = 0; i < bars; i++){
        bar_x = i * 3;
        bar_width = 2;
        bar_height = -(dataArray[i] / 2);

        canvasCtx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}


player.new_song = (sourse) => {
    sourse = sourse.trim();
    sours = `audio/${sourse}`;
    audio.src = sours; 
    audio.load(); 
    audio.play()
    player.volume(); 
    timer = setInterval(player.duration,100);
    return; 
}

player.play = () => {
      if(audio.paused)  {
            audio.play();
      }
      return;
}

player.pause = () => {
       if(audio.paused == "false") {
            audio.pause();
       }
        return;
}

player.volume = () => {
    vol = volumen.value / 100; 
    audio.volume = vol; 
    return; 
}

player.stop = () => {
    audio.load(); 
    return; 
}

player.back = () => {
    audio.currentTime = audio.currentTime - 1; 
    return; 
}

player.forw = () => {
    audio.currentTime = audio.currentTime + 1;
    return;
}

player.duration = () => {
    if(audio.duration == audio.currentTime) {
        clearInterval(timer); 
    } else {
        duration = audio.duration
        let loade = (audio.currentTime * 100) / duration; 
        loader.style.width = `${loade}%`; 
    }
}

function draw () {
    
    requestAnimationFrame(draw);

     analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    var sliceWidth = canvas.width * 1.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

         x += sliceWidth;
    }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
}


volumen.addEventListener("input" , player.volume);

back.addEventListener("mousedown", player.back); 
forw.addEventListener("click", player.forw); 
play.addEventListener("click", player.play); 
pause.addEventListener("click",player.pause); 
stop.addEventListener("mousedown", player.stop); 

document.addEventListener("click", function(event) {
    if(event.target.nodeName === "LI" || event.target.nodeName === "li") {
        player.new_song(event.target.childNodes[0].nodeValue);
    } 
});