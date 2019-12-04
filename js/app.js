const audio  = document.getElementById('audioPlayer'); 
const volume = document.getElementById('audio_volume'); 
const back   = document.getElementById('pback'); 
const play   = document.getElementById('pplay'); 
const pause  = document.getElementById('ppause'); 
const stop   = document.getElementById('pstop'); 
const forw   = document.getElementById('pforw');
const volumen = document.getElementById('volumen'); 
const loader = document.getElementById('loader'); 
const myCanvas = document.getElementById('canvas'); 

var sours,vol,timer,duration, audioCtx; 
const player = {}; 

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
      if(audio.paused){
        audio.play();
      }
        return;
}

player.pause = () => {
        audio.pause();
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

player.canvas = () => {
    audioCtx = new AudioContext(); 
    let sours = audioCtx.createMediaElementSource(audio);   
    let analiser = "";
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