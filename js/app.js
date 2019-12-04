const audio  = document.getElementById('audioPlayer'); 
const volume = document.getElementById('audio_volume'); 
const bass   = document.getElementById('bass'); 
const treble = document.getElementById('treble'); 
const back   = document.getElementById('back'); 
const play   = document.getElementById('play'); 
const pause  = document.getElementById('pause'); 
const stop   = document.getElementById('stop'); 
const forw   = document.getElementById('forw');
const volumen = document.getElementById('volumen'); 
const loader = document.getElementById('loader'); 

var sours,vol,timer,duration; 
const player = {}; 

player.new_song = (sourse) => {
    sourse = sourse.trim();
    sours = `audio/${sourse}`; 
    console.log(sours);
    audio.src = sours; 
    audio.load(); 
    audio.play()
    player.volume(); 
    timer = setInterval(player.duration,100);
    console.log(audio.paused);   
    return; 
}

player.play = () => {
      if(audio.paused == 'false'){
        audio.play();
      }
        return;
}

player.pause = () => {
        audio.pause();
        console.log(audio.paused);
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
    audio.currentTime = audio.currentTime - 1;
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

volumen.addEventListener("input" , player.volume);

back.addEventListener("click", player.back()); 
forw.addEventListener("click", player.forw()); 
play.addEventListener("click", player.play()); 
pause.addEventListener("click", ()=>{
    audio.pause();
}); 
stop.addEventListener("click", player.stop()); 

document.addEventListener("click", function(event) {
    if(event.target.nodeName === "LI" || event.target.nodeName === "li") {
        console.log(event.target.childNodes[0].nodeValue)
        player.new_song(event.target.childNodes[0].nodeValue) 
    }
});