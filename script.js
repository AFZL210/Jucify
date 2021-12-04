console.log("WELCOME TO JUCIFY");

// INITIAISE THE VARIABLES
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");  // STORE AUDIO FILE
let masterPlay = document.getElementById("masterPlay"); // MAIN PLAY BUTTON
let myProgressBar = document.getElementById("progressBar");  // PROGRESS BAR
let gif = document.getElementById("gif");  // PLAYING GIF ANIMATION
let masterSongName = document.getElementById('masterSongName');  // DISPLAY CURRENT PLAYING SONG NAME
let progress;


// IMP  - Make an array of songItem by Targeting same Class Name
let songItem = Array.from(document.getElementsByClassName("songItem"));


// Store Song Info in array of objects
let songs = [
    {songName: "All Girls Are The Same", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg",songDurationText: "2:50"},
    {songName: "Walk This Way", filePath: "songs/2.mp3", coverPath: "covers/cover1.jpg",songDurationText: "2:38"},
    {songName: "Space Travelling", filePath: "songs/3.mp3", coverPath: "covers/cover2.jpg",songDurationText: "3:00"},
    {songName: "Confide", filePath: "songs/4.mp3", coverPath: "covers/cover1.jpg",songDurationText: "3:35"},
    {songName: "NCS SONG", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg",songDurationText: "2:50"}
]


// HANDLE PLAY & PAUSE
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        masterSongName.innerHTML = songs[songIndex].songName
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterSongName.innerHTML = songs[songIndex].songName
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


// LISTEN EVENTS 
audioElement.addEventListener('timeupdate', () => {
    // UPDATE PROGRESS BAR
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


// IMP - Update Data of Each Song Item Element using forEach Function
// like iterating over array and updating information
songItem.forEach((element, i) => {
    // console.log(element, i)
   element.getElementsByTagName("img")[0].src = songs[i].coverPath;
   element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
   element.getElementsByClassName("songDurationText")[0].innerText = songs[i].songDurationText;
  
})

// Play Song If Click on Song Play Button Individual

// Make All Button PLAY
function makeAllPlay(){
    Array.from(document.getElementsByClassName("playSongList")).forEach((element) => {
        element.classList.remove("fa-pause-circle")
        element.classList.add("fa-play-circle")
 
    })
} 
Array.from(document.getElementsByClassName("playSongList")).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target)
        makeAllPlay();
        songIndex = parseInt(e.target.id)  // Update ID of Element in SongIndex Variable
        e.target.classList.remove("fa-play-circle")
        e.target.classList.add("fa-pause-circle")
        audioElement.src = `songs/${songIndex+1}.mp3`
        masterSongName.innerHTML = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
})


document.getElementById('forward').addEventListener('click', () => {
    if(songIndex>=4) {
        songIndex =0;
    }

    else{
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerHTML = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0) {
        songIndex =3;
    }

    else{
        songIndex -= 1;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerHTML = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})