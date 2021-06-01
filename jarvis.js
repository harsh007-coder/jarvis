// google part
const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()==="stop recording") {
      recognition.stop();
    }
    else if(!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else {
      if(transcript.toLowerCase().trim()==="go") {
        searchForm.submit();
      }
      else if(transcript.toLowerCase().trim()==="reset input") {
        searchFormInput.value = "";
      }
      else {
        searchFormInput.value = transcript;
      }
    }
    
  }
  
  info.textContent = 'Voice Commands: "stop recording", "reset input", "go"';
  
}
else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}

// digital clock part

function run(){
        var d = new Date();
        var h = d.getHours();
        var m  = d.getMinutes();
        var s = d.getSeconds();
        var session = "A.M";

        if(h == 0){ h = 12; }

            if(h>12){
                 h = h - 12;
                 session ="P.M"; }

             h = (h<10)? "0"+h:h;
             m = (m<10)? "0"+m:m;
             s = (s<10)? "0"+s:s;
             
  document.getElementById("clock").innerHTML = h +":"+m+":"+s + "   " +session;
        var t = setInterval(run,1000);
    }
    run();

    // calender part

    const navlang = navigator.language;
    let d = new Date();
    let date = d.getDate();//get the day as a number
    let month = d.getMonth();// get the month(0-11)
    let weekname = d.toLocaleString(navlang,{weekday:'long'});
    let monthy = d.toLocaleString(navlang,{month:'long'});
    let year = d.getFullYear();

    document.getElementById('month').innerHTML = monthy;
    document.getElementById('week').innerHTML = weekname;
    document.getElementById('todayDate').innerHTML = date;
    document.getElementById('year').innerHTML =year;


    // weather js
    window.addEventListener('load',() => {
        let long;
        let lat;
     let temperatureDescription = document.querySelector('.temperature-description')
     let temperatureDegree = document.querySelector('.temperature-degree')
     let temperatureSection = document.querySelector('.temperature')
     let locationtimezone = document.querySelector('.location-timezone')
     let tempIcon = document.getElementById('temp-icon')
     let iconFile;
    
     if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {  
            long =  position.coords.longitude; 
            lat = position.coords.latitude;
    
       const proxy = 'https://cors-anywhere.herokuapp.com/' 
       const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ba90859e5c4692e6a444aaab756fd922`
        
       console.log(api)
       fetch(api)
       .then(response =>{
           return response.json();
       })
       .then(data => {
        
        const {name} = data;
        const {feels_like} = data.main;
        const {id, main} = data.weather[0];
        
        locationtimezone.textContent = name;
        temperatureDescription.textContent = main;
        temperatureDegree.textContent = Math.round(feels_like - 273);
        console.log(data);
    
        if (id < 250){
            tempIcon.src ='./IMAGES/thundercloud.png'
        }
        else if(id < 550){
            tempIcon.src ='./IMAGES/rainy.png'
        }
        else if(id < 650){
            tempIcon.src ='https://library.kissclipart.com/20180831/kxq/kissclipart-weather-symbols-clipart-weather-forecasting-clip-a-c178cc9ed1174847.jpg'
        }
        else if(id > 800){
            tempIcon.src ='https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png'
        }
        else if(id === 800){
            tempIcon.src= "./IMAGES/cloud.png"
        }
        else if(id < 800){
            tempIcon.src ='./IMAGES/sun.png'
        }
       });
     });
     }
    });
    // chatbot part
    function talk(){
        var know ={
            "Hi":"Hello",
            "How Are You?":"Great !",
            "Bye":"Have A Nice Day !",
            "Hello":"Hi , Whats Up",
            "what is your name?":"jarvis",
            "corona" : "haryana 2.15Cr"
        };
        var user = document.getElementById('userBox').value;
        document.getElementById('chatLog').innerHTML = user + "<br>";
        if(user in know){
            document.getElementById('chatLog').innerHTML = know[user] + "<br>";
        }else{
            document.getElementById('chatLog').innerHTML = "I do not understand .";
        }
    }

// music part
//     const play = document.getElementById('play');
// const music = document.querySelector('audio');
// const title = document.querySelector('.title')
// const artist = document.querySelector('.artist')
// const img = document.querySelector('.image')
// const prev = document.querySelector('#prev')
// const next = document.querySelector('#next')
// let total_duration = document.getElementById('duration');
// let progress = document.getElementById('progress')
// let current_time = document.getElementById('current_time')
// const progress_div =document.getElementById('progress_div')
// const songs = [{
//     name : "song-1",
//     title :"faded",
//     artist :"Alan Walker",
// },
// {
//     name : "song-2",
//     title :"Back To You",
//     artist :"Selena Gomez",
// },
// {
//     name : "song-3",
//     title :"Bad blood",
//     artist :"Taylor shift",
// }
// ]

// isPlaying = false;
// const playMusic =()=>{
//     isPlaying = true;
//     music.play();
//     play.classList.replace('fa-play','fa-pause');

// }
// const pauseMusic = ()=>{
//     isPlaying = false;
//     music.pause();
//     play.classList.replace('fa-pause','fa-play');

// }
// play.addEventListener("click", ()=>{
//   isPlaying? pauseMusic() :playMusic()
// })

// const loadSong = (songs) =>{
//     title.textContent = songs.title;
//     artist.textContent = songs.artist;
//     music.src = `music/${songs.name}.mp3`;
//     img.src =`IMAGES/${songs.name}.jpg`;
// }
// songIndex = 0;
// const nextSong =()=>{
//     songIndex = (songIndex + 1) % songs.length;
//     loadSong(songs[songIndex]);
//     playMusic();
// }

// const prevSong =()=>{
//     songIndex = (songIndex -1 + songs.length) % songs.length;
//     loadSong(songs[songIndex]);
//     playMusic();
// }

// music.addEventListener('timeupdate', (e) =>{
// console.log(e);
// const {currentTime, duration} = e.srcElement;
// let progress_time = (currentTime/duration)*100;
// progress.style.width = `${progress_time}%`;

// let min_duration = Math.floor(duration/60);
// let sec_duration = Math.floor(duration % 60);
// let tot_duration = `${min_duration}:${sec_duration}`;
// if(duration){
//     total_duration.textContent = (tot_duration);
// }

// let min_current = Math.floor(currentTime/60);
// let sec_current = Math.floor(currentTime % 60);
// if(sec_current < 10){
//     sec_current = `0${sec_current}`

// }

// let tot_current= `${min_current}:${sec_current}`;
// current_time.textContent = (tot_current);
// });

// progress_div.addEventListener('click',(e) =>{
//     const {duration} = music;
//     let move_progress =( e.offsetX/e.srcElement.clientWidth)*duration;
// music.currentTime = move_progress;
// })

// music.addEventListener('ended', nextSong)

// next.addEventListener("click" , nextSong);
// prev.addEventListener("click" , prevSong);

//   battery part
navigator.getBattery().then(function(battery) {
    document.querySelector('.progress-bar').style.width= ('width', battery.level * 100 + '%');
    document.querySelector('#level').innerHTML =('Battery: ' + (battery.level * 100).toFixed() + '%')
    battery.onlevelchange = function() {
        document.querySelector('#level').innerHTML =('Battery: ' + (this.level * 100).toFixed() + '%')
        document.querySelector('.progress-bar').style.width =( this.level * 100 + '%');
    };
});

