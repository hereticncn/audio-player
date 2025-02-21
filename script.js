let next = document.querySelector('.next');
let prev = document.querySelector('.prev')
let player = document.querySelector('.player');
let stopPlay = document.querySelector('.btn__player')
let play = document.getElementById('play')
let card = document.querySelector('.card')
let nameArtist = document.querySelector('.artist');
let nameSong = document.querySelector('.song')
let songTimer = document.querySelector('.song__timer')
let songTime = document.querySelector('.song__time')
let progressBar = document.querySelector('.black__progress')
let coverSong = document.querySelector('.cover')
let body = document.querySelector('body')
let image = document.querySelector('.img__play')

const myAudio = new Audio();

const songs = [
    { 
        'cover': '2.jpg',
        'artist': 'Deftones',
        'displayName': 'Be Quiet and Drive',
        'path': '2.mp3'
    },
    { 
        'cover': '3.jpg',
        'artist': 'Enter Shikari',
        'displayName': 'Sorry You’re Not a Winner',
        'path': '3.mp3'
    },
    { 
        'cover': '4.jpg',
        'artist': 'Pastel Ghost',
        'displayName': 'Silhouette',
        'path': '4.mp3'
    },
    { 
        'cover': '6.jpg',
        'artist': 'Baden Baden',
        'displayName': 'Le courage des oiseaux',
        'path': '6.mp3'
    },
    { 
        'cover': '7.jpg',
        'artist': 'System Of A Down',
        'displayName': 'I-E-A-I-A-I-O',
        'path': '7.mp3'
    }
];
let numberCard = 0;
let isPlaying = false;

let durationSong;
myAudio.addEventListener('loadedmetadata', () => { //Событие loadedmetadata запускается после загрузки метаданных.
    durationSong = myAudio.duration; //duration возвращает длительность аудио в секундах
});

myAudio.addEventListener('timeupdate', () => { //Событие timeupdate происходит при изменении позиции воспроизведения аудио/видео.
    const durationMinutes = String(Math.floor(durationSong / 60)).padStart(2, '0');
    const durationSeconds = String(Math.floor(durationSong % 60)).padStart(2, '0');
    
    const progressMinutes = String(Math.floor(myAudio.currentTime / 60)).padStart(2, '0'); //делим текущее время (currentTime) на 60 сек, 
    const progressSeconds = String(Math.floor(myAudio.currentTime % 60)).padStart(2, '0');           //чтобы получить минуты, мат флор округляет до целого числа (минуты). 
    songTimer.textContent = `${progressMinutes}:${progressSeconds}`;                                 //padstart преобразует число в строку и добавляет ведущий ноль, если строка короче 2-ух символов
    songTime.textContent = `${durationMinutes}:${durationSeconds}`; //фигурные скобки для упрощённой передачи переменных с ':'

    progressBar.style.width = Math.floor((myAudio.currentTime / durationSong) * 100) + '%' //получение доли прошедшего времени трека и перевод в проценты

    if (durationSong) {
        const currentTime = myAudio.currentTime;
        if (currentTime === durationSong) {
            nextSong();
        }
    }});

function av(){
    if(isPlaying){
        stopSong()
    }else{
        playSong()
    }
}

play.addEventListener('click', av)
next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)

function loadSong(){
    body.style.backgroundImage = `url(${songs[numberCard].cover})`;
    coverSong.src = songs[numberCard].cover;
    myAudio.src = songs[numberCard].path;
    nameArtist.textContent = songs[numberCard].artist;
    nameSong.textContent = songs[numberCard].displayName;
}
loadSong()

function playSong(){
    image.src = 'pause.svg'
    document.querySelector('.container').classList.add('container__animat')
    coverSong.classList.add('cover__animat')
    isPlaying = true
	myAudio.play();
}

function stopSong(){
    document.querySelector('.container').classList.remove('container__animat')
    coverSong.classList.remove('cover__animat')
    image.src = 'play.svg'
    isPlaying = false
    myAudio.pause();
}

function nextSong(){
    if(numberCard === (songs.length - 1)){
        numberCard = 0;
    }else{
        ++numberCard
    }
    loadSong()
    playSong()
}

function prevSong(){
    if(numberCard == 0){
        numberCard = songs.length - 1;
    }else{
        --numberCard
    }
    loadSong()
    playSong()
}

















