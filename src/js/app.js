//variables
const btn = document.querySelector('#stoper-btn');
const clearTime = document.querySelector('#clear-stoper');
const showTime = document.querySelector('.time');
const lapBtn = document.querySelector('#lap-btn');
const lapList = document.querySelector('.lap-list');
const totalTimeDisplay = document.querySelector('.total-time');

let stoperRun = false;
let time = 0;
let laps = [];
let intervalId;
let sec = min = hours = restSec = restMin = restHours = 0;

const convertShowTime = (time) => {
    //calculate sec, min, hours from time 
    sec = Math.floor(time / 1000); //liczba całkowita sekund to milisekundy / 1000
    restSec = time % 1000; //reszta z powyższego dzielenia to liczba sekund po przecunku czyli ms

    min = Math.floor(sec / 60);
    restMin = sec % 60;

    hours = Math.floor(min / 60);
    restHours = min % 60;

    //display adjustment from format 0:0:0:000 to: 00:00:00:000
    restMin < 10 ? restMin = `0` + restMin : restMin;
    restHours < 10 ? restHours = `0` + restHours : restHours;
    hours < 10 ? hours = `0` + hours : hours;

    return `${hours}:${restHours}:${restMin}:${restSec}`; //dzielenie przez 10 powoduje usunięcie nadmiarowego '0' w wyświetlaczu
};

const startStoper = () => {
    stoperRun = true;
    btn.innerHTML = 'Stop';
    totalTimeDisplay.classList.add('d-none');
    intervalId = setInterval(() => {
        time += 1;
        showTime.innerHTML = convertShowTime(time);
    }, 1);
};

const stopStoper = () => {
    stoperRun = false;
    btn.innerHTML = 'Start';
    clearInterval(intervalId);
    console.log('total time from start [ms]: ', time); //czas wyrażony w ms z dokładnością 10 ms.
    totalTimeDisplay.innerHTML = `Total time: ${hours}h ${restHours}min ${restMin}sec ${restSec}ms`;
    totalTimeDisplay.classList.remove('d-none');
};

function toggleStoper() {
    stoperRun ? stopStoper() : startStoper();
};

function clearTimeDisplay() {
    if (!stoperRun) {
        time = 0;
        laps = [];
        showTime.innerHTML = '00:00:00:000';
        lapList.innerHTML = '';
        totalTimeDisplay.innerHTML = '';
        totalTimeDisplay.classList.add('d-none');
    };
};


function handleLap() {
    if (stoperRun) {
        laps.push({
            hours,
            restSec,
            restMin,
            restHours
        });

        lapList.innerHTML = laps.map((lap, index) => `<li class="lap-list-item">lap${index + 1}: ${lap.hours}:${lap.restHours}:${lap.restMin}:${lap.restSec}</li>`).join('');
    }
};

btn.addEventListener('click', toggleStoper);
lapBtn.addEventListener('click', handleLap);
clearTime.addEventListener('click', clearTimeDisplay);