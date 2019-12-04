navigator.getUserMedia = ( navigator.getUserMedia ||
							navigator.webkitGetUserMedia ||
							navigator.mozGetUserMedia ||
							navigator.msGetUserMedia);
//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var recorder; 						//WebAudioRecorder object
var input; 							//MediaStreamAudioSourceNode  we'll be recording
var encodingType; 					//holds selected encoding for resulting audio (file)
var encodeAfterRecord = true;       // when to encode

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //new audio context to help us record


var recordButton = document.getElementById("start_record");
var stopButton = document.getElementById("stop_record");
var audio_box  = document.getElementById("audio_box");
var link_box  = document.getElementById("link_box");
var micRec = document.getElementById('mic_rec'); 
var mic_time;

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

function startRecording() {

	/*
		Simple constraints object, for more advanced features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: {
		sampleRate: {
			ideal: 48000,
			min: 16000
		},
		channelCount: {
			ideal: 2,
			min: 1
		},
		noiseSuppression: true,
		autoGainControl: false, 
		echoCancellation: true,
		volume: 1.0
	}, video:false }

    /*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/


	// Older browsers might not implement mediaDevices at all, so we set an empty object first
	if (navigator.mediaDevices === undefined) {
	navigator.mediaDevices = {};
  }

   console.log(navigator.mediaDevices.getUserMedia(constraints));
	
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device
		*/
		audioContext = new AudioContext();
		var myContext = new AudioContext(); 

		var source = myContext.createMediaElementSource(myMediaElement);
		source.connect(gainNode);
		var gainNode = myContext.createGain();
		gainNode.connect(myContext.destination); 
		gainNode.gain.value = 0.1 // 10 %

		 


		if (audioContext.createScriptProcessor == null) {
			audioContext.createScriptProcessor = audioContext.createJavaScriptNode;
		  }

		//update the format 
	

		//assign to gumStream for later use
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);
		
		//stop the input from playing back through the speakers
		//input.connect(audioContext.destination)

		//get the encoding 
		encodingType = 'mp3';
 
		recorder = new WebAudioRecorder(input, {
		  workerDir: "js/", // must end with slash
		  encoding: encodingType,
		  numChannels:2, //2 is the default, mp3 encoding supports only 2
		  onEncoderLoading: function(recorder, encoding) {
		  },
		  onEncoderLoaded: function(recorder, encoding) {
		  }
		});

		recorder.onComplete = function(recorder, blob) { 
			createDownloadLink(blob,recorder.encoding);
		}

		recorder.setOptions({
		  timeLimit:120,
		  encodeAfterRecord:encodeAfterRecord,
	      ogg: {quality: 1.0},
	      mp3: {bitRate: 320}
	    });

		//start the recording process
		recorder.startRecording();


	}).catch(function(err) {
	     console.log(err);

	});

	//disable the record button
}

function stopRecording() {
  
  audio_box.innerHTML = "Your .mp3 file is being created."
  link_box.innerHTML = "Please wait a moment.";
	//stop microphone access
	gumStream.getAudioTracks()[0].stop();
	
	//tell the recorder to finish the recording (stop recording + encode the recorded audio)
	recorder.finishRecording();
}

function createDownloadLink(blob,encoding) {
	var url = url = URL.createObjectURL(blob);
	var mp3Name = new Date().toISOString() + '.mp3';
	
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');
	console.log(url);
	//add controls to the <audio> element
	au.controls = true;
	au.type = "audio/mp3";
	au.src = url;

	//link the a element to the blob
	link.href = url;
	link.download = mp3Name; 
	if (window.navigator && window.navigator.msSaveOrOpenBlob) {
		mp3files = navigator.msSaveOrOpenBlob(blob, mp3Name);
	} else {
	link.innerHTML = "Download";
	}
	
  //add the new audio and a elements to the li element
  audio_box.innerHTML = ""; 
  link_box.innerHTML= "";

  audio_box.appendChild(au);
	link_box.appendChild(link);

}

function MicBlink() {
  micRec.classList.toggle('mic-active');
}

function AllPause(){ 
	document.querySelector("audio").pause();
}


//recordButton.addEventListener("click", startRecording); 
//stopButton.addEventListener("click", stopRecording); 