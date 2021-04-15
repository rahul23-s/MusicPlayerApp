let fillbar = document.querySelector(".fill");
let audios = ["Namo Namo - Amit Trivedi - Slowed + Reverb.mp3",
            "Kabira - Tochi Raina and Rekha Bhardwaj (Slowed & Reverbed).mp3",
            "Tujhe Kitna Chahne Lage - Arjit Singh (Harrlin Flip).mp3",
            "Kyun - Papon  (Harrlin Flip)(Video by Kshitposts).mp3",
            "Toh phir aao - Awarapan - NDumboy Beats Remix - Lofi Remix - Lemon Nation.mp3"
        ];
let titles = ["Namo Namo -Amit Trivedi -Slowed + Reverb",
            "Kabira - Tochi Raina and Rekha Bhardwaj ",
            "Tujhe Kitna Chahne Lage - Arjit Singh (Harrlin Flip)",
            "Kyun - Papon  (Harrlin Flip)(Video by Kshitposts)",
            "Toh phir aao - Awarapan - Lofi Remix - Lemon Nation"
        ];
let covers = ["namo.jpg", "kabira.jpg", "tujhe.jpg","kyun.jpg","toh.jpg"];
let currentTime = document.querySelector(".time");
let songTitle = document.getElementById("song-title");

// Create An Object Of Audio

let audio = new Audio();
let currentSong = 0;

// whenever the window load, song should play automaticly

window.onload = playSong;

// let's play the song by this function whenever window load

function playSong() {
  audio.src = audios[currentSong];
  audio.play();
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    let playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft = "30px";
  } else {
    audio.pause();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
    playBtn.style.paddingLeft = "33px";
  }
}

// Now let's make dynamic the fillbar

audio.addEventListener("timeupdate", function() {
  let position = audio.currentTime / audio.duration;
  fillbar.style.width = position * 100 + "%";

  // let's work on the duration
  convertTime(Math.round(audio.currentTime));

  // let's work on the play next song when current song completed

  if (audio.ended) {
    nextAudio();
  }
});

function convertTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  // lets fix the songle digit
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent = min + ":" + sec;

  // Fix the total time
  totalTime(Math.round(audio.duration));
}

function totalTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  // lets fix the songle digit

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent += " - " + min + ":" + sec;
}

// Now let's Work on next and prev buttons

function changeSongName(){
    songTitle.innerHTML = titles[currentSong];
}

function nextAudio() {
  currentSong++;
  if (currentSong > 4) {
    currentSong = 0;
  }
  playSong();
  playBtn = document.querySelector(".play-pause");
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  playBtn.style.paddingLeft = "30px";
  //Change title
  changeSongName();
  // just one line jquery for changing the covers
  $(".img img").attr("src", covers[currentSong]);
}

function prevAudio() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = 4;
  }
  playSong();
  playBtn = document.querySelector(".play-pause");
  playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  playBtn.style.paddingLeft = "30px";
  
  //change title
  changeSongName();
  // just one line jquery for changing the covers

  $(".img img").attr("src", covers[currentSong]);
}

// let's work on the volume up , down and mute

function decreaseVolume() {
  audio.volume -= 0.25;
}

function increaseVolume() {
  audio.volume += 0.25;
}

// fix the speaker muted button

let volumeUp = document.querySelector(".volume-up");
volumeUp.addEventListener("click", function() {
  if (audio.volume === 1) {
    audio.volume = 0;
    document.querySelector(".volume-up i").className = "fa fa-volume-mute";
  } else {
    audio.volume = 1;
    document.querySelector(".volume-up i").className = "fa fa-volume-up";
  }
});
