// script.js

// Get the DOM elements
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const songsListContainer = document.getElementById('songs-list'); // List container

// Array of songs 
const songs = [
  {
    title: 'Touchline - Actions over captions',
    src: 'song1.mp3'
  },
  {
    title: 'Touchline - Say it to yourself',
    src: 'song2.mp3'
  },
  {
    title: 'Tylar-ART',
    src: 'song3.mp3'
  }
  ,
  {
    title: 'Chirs Brown - ',
    src: 'song4.mp3'
  }
  ,
  {
    title: 'Azana for a Reason ',
    src: 'azana.mp3'
  }
];

let currentSongIndex = 0;
let isPlaying = false;

// Load the song
function loadSong(songIndex) {
  const song = songs[songIndex];
  audioPlayer.src = song.src;
  trackTitle.textContent = song.title;

  // Highlight the active song in the list
  document.querySelectorAll('#songs-list li').forEach((li, index) => {
    li.classList.toggle('active', index === songIndex);
  });
}

// Play or Pause the song
function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';  // Change to play icon
  } else {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';  // Change to pause icon
  }
  isPlaying = !isPlaying;
}

// Update the progress bar as the song plays
function updateProgress() {
  const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progressPercent;

  // Update time info
  currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
  durationDisplay.textContent = formatTime(audioPlayer.duration);
}

// Format time to mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Seek the song
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
}

// Change volume
function setVolume() {
  audioPlayer.volume = volumeControl.value;
}

// Play next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸️';
}

// Play previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸️';
}

// Select song from the list
function selectSong(index) {
  currentSongIndex = index;
  loadSong(currentSongIndex);
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸️';
}

// Generate song list dynamically
function generateSongList() {
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.title;
    li.addEventListener('click', () => selectSong(index)); // Click listener to select song
    songsListContainer.appendChild(li);
  });
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlayPause);
audioPlayer.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
volumeControl.addEventListener('input', setVolume);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Load the first song on page load
loadSong(currentSongIndex);

// Generate the song list on page load
generateSongList();
