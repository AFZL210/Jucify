console.log("WELCOME TO JUCIFY");

// INITIAISE THE VARIABLES
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName')
let progress;


// IMP  - Make an array of songItem by Targeting same Class Name
let songItem = Array.from(document.getElementsByClassName("songItem"));


let songs = [
    {songName: "All Girls Are The Same", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Walk This Way", filePath: "songs/2.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Space Travelling", filePath: "songs/3.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Confide", filePath: "songs/4.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "NCS SONG", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg"}
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


// IMP
songItem.forEach((element, i) => {
    // console.log(element, i)
   element.getElementsByTagName("img")[0].src = songs[i].coverPath;
   element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  
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
        makeAllPlay()
        songIndex = parseInt(e.target.id)
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