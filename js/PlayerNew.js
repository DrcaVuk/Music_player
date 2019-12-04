var vid = document.getElementById('video');
var sors = document.getElementById('sors');
var volume = document.getElementById('butt_volume');
var liric = document.getElementById('liric');
var videodiv = document.getElementById('videodiv');
var number = document.getElementById('number');

var ul = document.getElementById('lista');

var pleyer = document.getElementById('pleyer'); 



const VideoPlayer = {
    Chang: function(video) {
        console.log(number.value);
        if(number.value !== video) {
            var sours = "video/" + video; 
            number.value = video; 
            var myVideo = document.createElement("video"); 
            myVideo.setAttribute('id', 'video');
            myVideo.src = sours; 
            videodiv.innerHTML = ""; 
            videodiv.appendChild(myVideo);
            myVideo.poster = "img/black.jpg"; 
            myVideo.autoplay; 
            myVideo.controls;  
            myVideo.play();
            VideoPlayer.Volume();
          } else if(document.querySelector('video').paused) {
            VideoPlayer.Volume();  
            document.querySelector('video').load();  
            document.querySelector('video').play();         
        } else {
            document.querySelector('video').pause();
        }
        return;
    }, 
    Volume: function() {
        document.querySelector('video').volume = volume.value / 10;
        return;
    }
}

// Add event form voluem controle 
volume.addEventListener('input', VideoPlayer.Volume);

// Add event from object
document.addEventListener('click',function(event) {
    if(event.target.nodeName === 'button' || event.target.nodeName === 'BUTTON' && event.target.classList.contains("px-2")) {
        VideoPlayer.Chang(event.target.value);
        var q = ul.querySelectorAll('li');
        for (i = 0; i < q.length; i++ ) {
            q[i].classList.remove('list-group-item-active');
            q[i].classList.add('list-group-item');
        }
        event.target.parentNode.parentNode.classList.add('list-group-item-active');
        event.target.parentNode.parentNode.classList.remove('list-group-item');
        liric.src = "img/" + event.target.parentNode.querySelector('input').value;
    }
    if (event.target.nodeName === "li" || event.target.nodeName === "LI") {
        var q = ul.querySelectorAll('li');
        for (i = 0; i < q.length; i++) {
            q[i].classList.remove('list-group-item-active');
            q[i].classList.add('list-group-item');
        }
        event.target.classList.add('list-group-item-active');
        event.target.classList.remove('list-group-item')
        var x = event.target.querySelectorAll('button');
        var y = event.target.querySelectorAll('input'); 
        liric.src = "img/" + y[0].value;
        VideoPlayer.Chang(x[2].value); 
    }
    if(event.target.nodeName === 'label' || event.target.nodeName === "LABEL") {
        var q = ul.querySelectorAll('li');
        for (i = 0; i < q.length; i ++) {
            q[i].classList.remove('list-group-item-active');
            q[i].classList.add('list-group-item');
        }
        event.target.parentElement.classList.add('list-group-item-active');
        event.target.parentElement.classList.remove('list-group-item');
        var x = event.target.parentElement.querySelectorAll('button');
        var y = event.target.parentElement.querySelectorAll('input'); 
        liric.src = "img/" + y[0].value;
        VideoPlayer.Chang(x[2].value);
    }
}); 


function ReplayCheck() {
    if(document.getElementById('replay').checked == true) {
       document.getElementById('pleyer').autoplay = true;
    } else {
        document.getElementById('pleyer').autoplay = false;
    }
    document.getElementById('pleyer').load();
};

function ReplayS() {
    document.getElementById('pleyer').autoplay = false;
    document.getElementById('pleyer').pause();
}
