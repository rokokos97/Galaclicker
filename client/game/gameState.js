import { getScore } from "./score";
import { getNextLevel, getCurrentLevel } from "./levels";

const $progressFill = document.querySelector("#progress-fill");
const $circle = document.querySelector("#circle");
const $clicksLeft = document.querySelector("#clicks-left");
const $availableLines = document.querySelector("#available-lines");

let availableLines = Number(localStorage.getItem('availableLines')) || 100;
let recoveryInterval = null;

export function updateProgressBar() {
    const score = getLatestScore();
    const nextLevel = getNextLevel(score);
    const prevLevel = getCurrentLevel(score);
    const progress = (score - prevLevel.numberOfCodeLines) / (nextLevel.numberOfCodeLines - prevLevel.numberOfCodeLines) * 100;
    $progressFill.style.width = `${progress}%`;
    console.log('updateProgressBar');
}

export function updateImageAndLevel() {
    const level = getCurrentLevel(getLatestScore());
    $circle.setAttribute('src', `${level.imgUrl}`);
}

export function updateClicksLeft() {
    const score = getLatestScore();
    const nextLevel = getNextLevel(score);
    const level = getCurrentLevel(score);
    const clicksLeft = Math.ceil((nextLevel.numberOfCodeLines - score) / level.xlevel);
    $clicksLeft.textContent = `Lines left level ${nextLevel.name}: ${clicksLeft}`;
}

export function updateAvailableLines() {
    const level = getCurrentLevel(getLatestScore());
    $availableLines.textContent = `${getAvailableLines()} / ${level.maxLines}`;
}


export function getAvailableLines() {
    return availableLines;
}


export function setAvailableLines(value) {
    availableLines = value;
    localStorage.setItem("availableLines", availableLines);
    localStorage.setItem('availableLines', value);
    if (value > 0) {
        $circle.classList.remove('grayscale');
    } else {
        $circle.classList.add('grayscale');
    }
    updateAvailableLines();
}


export function decrementAvailableLines() {
    if (getAvailableLines() > 0) {
        setAvailableLines(getAvailableLines() - 1);
    }
}

export function incrementAvailableLines() {
    setAvailableLines(getAvailableLines() + 1);
    if (getAvailableLines() > 0) {
        $circle.classList.remove('grayscale');
    }
}




function getLatestScore() {
    return getScore();
}

export function startRecoveryProcess() {
    if (!recoveryInterval) {
        recoveryInterval = setInterval(() => {
            if (getAvailableLines() < getCurrentLevel(getScore()).maxLines) {
                incrementAvailableLines();
            } else {
                stopRecoveryProcess();
            }
        }, 5000);
    }
}

export function stopRecoveryProcess() {
    if (recoveryInterval) {
        clearInterval(recoveryInterval);
        recoveryInterval = null;
    }
}