// js/media.js – Random clip + sound playback
const clips = [
    'assets/clips/kiss1.mp4',
    'assets/clips/kiss2.mp4',
    'assets/clips/kiss3.mp4',
    'assets/clips/kiss4.mp4',
    'assets/clips/kiss5.mp4'
];

const meows = [
    'assets/sounds/meow1.mp3',
    'assets/sounds/meow2.mp3'
];

function playRandomMedia() {
    const video = document.getElementById('memePlayer');
    const audio = document.getElementById('meowPlayer');
    
    const randomClip = clips[Math.floor(Math.random() * clips.length)];
    const randomMeow = meows[Math.floor(Math.random() * meows.length)];
    
    video.src = randomClip;
    audio.src = randomMeow;
    
    video.play().catch(() => {});
    audio.play().catch(() => {});
}
