const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");

let homeScore = 0;
let guestScore = 0;

function updateScore(team, points) {
    if (team === 'home') {
        homeScore += points;
        homeScoreEl.textContent = homeScore;
    } else if (team === 'guest') {
        guestScore += points;
        guestScoreEl.textContent = guestScore;
    }
}

function resetHomeScore() {
    homeScore = 0;
    homeScoreEl.textContent = homeScore;
}

function resetGuestScore() {
    guestScore = 0;
    guestScoreEl.textContent = guestScore;
}


let minutes = 12;
let seconds = 0;
let currentQuarter = 1;
const totalQuarters = 4;
let timerInterval;

const timerEl = document.getElementById("timer");
const quarterEl = document.getElementById("quarter");
const startBtn = document.getElementById("start-timer-btn");
const stopBtn = document.getElementById("stop-timer-btn");

function updateTimerEl() {
    const min = minutes.toString().padStart(2, '0');
    const sec = seconds.toString().padStart(2, '0');
    timerEl.textContent = `${min}:${sec}`;
}

function startTimer() {
    if (timerInterval || currentQuarter > totalQuarters) return;

    timerInterval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                if (currentQuarter < totalQuarters) {
                    currentQuarter++;
                    minutes = 12;
                    seconds = 0;
                    quarterEl.textContent = `Quarter: ${currentQuarter}`;
                    updateTimerEl();
                    startTimer();
                } else {
                    quarterEl.textContent = `Final`;
                }
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateTimerEl();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    minutes = 12;
    seconds = 0;
    currentQuarter = 1;
    quarterEl.textContent = `Quarter: ${currentQuarter}`;
    updateTimerEl();
}

window.updateScore = updateScore;
window.resetHomeScore = resetHomeScore;
window.resetGuestScore = resetGuestScore;
window.startTimer = startTimer;
window.stopTimer = stopTimer;
window.resetTimer = resetTimer;