import './style.css';
import { storeUserData } from './api/storeUserData/storeUserData';

import { updateUserInfo, fetchAllUsers } from './api/userApi'

import { setupLeaderboard, displayLeaderboard } from './ui/leaderboard';

import { checkAndResetDailyScore,
    checkAndResetMonthlyScore,
    setScore,
    getScore,
    setDailyScore,
    getDailyScore,
    setMonthlyScore,
    getMonthlyScore,
    incrementScore
} from './game/score';

import { updateProgressBar,
    updateImageAndLevel,
    updateClicksLeft,
    updateAvailableLines,
    getAvailableLines,
    startRecoveryProcess,
 } from './game/gameState';

import { getCurrentLevel } from './game/levels';
import { initUser } from './initUser';

const tg = window.Telegram.WebApp;
console.log("tg user", tg.initDataUnsafe.user)
let telegramUser = tg.initDataUnsafe.user?.id;
if(!telegramUser){
    console.log("telegram id do not find")
    telegramUser = 244718113
}
// console.log("telegramUser", telegramUser)

if (telegramUser) {
    
    initUser(telegramUser);
} else {
    localStorage.setItem('userId', '007');
    localStorage.setItem('username', 'Test');
    localStorage.setItem('first_name', 'Test');
    localStorage.setItem('last_name', 'Test');
    localStorage.setItem('score', '0');
    localStorage.setItem('dailyScore', '0');
    localStorage.setItem('monthlyScore', '0');
    localStorage.setItem('lastUpdated', '');
    localStorage.setItem('lastUpdatedMonthly', '');
    localStorage.setItem('availableLines', '100');
    console.error('User data not available run test game');
}
initializeApp();
runGame();

function resetScore(){
    checkAndResetDailyScore()
    checkAndResetMonthlyScore()

    setScore(getScore())
    setDailyScore(getDailyScore())
    setMonthlyScore(getMonthlyScore())

    updateGameUi()
}

export function runGame(){
    resetScore();
    updateGameUi();
    handleUserUpdates();
}

export function updateGameUi(){
    updateProgressBar();
    updateImageAndLevel();
    updateClicksLeft();
    updateAvailableLines();

    if (getAvailableLines() < getCurrentLevel(getScore()).maxLines) {
        startRecoveryProcess();
    }

}

export function handleUserUpdates(){
    updateUserInfo();
    fetchAllUsers().then(users => displayLeaderboard(users));

    const $loading=document.querySelector("#loading-screen")
    const $navigation = document.querySelector("#navigation")

    if ($loading) $loading.style.display = 'none';
    document.getElementById('game').classList.add("active");
    if ($navigation) $navigation.style.display = 'block';

}

export function initializeApp() {
    setupLeaderboard();
    // initializeLeaderboard();

    const navLinks = document.querySelectorAll("nav ul li a")
    const sections = document.querySelectorAll(".section")

    navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = e.target.getAttribute("data-section");

        sections.forEach(section => {
        if (section.id === targetSection) {
            section.classList.add("active");
            } else {
            section.classList.remove("active");
            }
        });
        });
    });

    const images = document.querySelectorAll("img");
    images.forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault())
        img.setAttribute('draggable', 'false');
    });

    const $circle = document.querySelector("#circle")
    $circle.addEventListener('click', (event) => {
        const rect = $circle.getBoundingClientRect()

        const offsetX = event.clientX - rect.left - rect.width / 2
        const offsetY = event.clientY - rect.top - rect.height / 2

        const DEG = 50

        const tiltX = (offsetY / rect.height) * DEG
        const tiltY = (offsetX / rect.width) * -DEG

        $circle.style.setProperty('--tiltX', `${tiltX}deg`)
        $circle.style.setProperty('--tiltY', `${tiltY}deg`)

        setTimeout (()=> {
            $circle.style.setProperty('--tiltX', `0deg`)
            $circle.style.setProperty('--tiltY', `0deg`)
        }, 200)

        const plusOne = document.createElement('div')
        plusOne.classList.add('plusOne')
        plusOne.textContent = `+${getCurrentLevel(getScore()).xlevel}`
        plusOne.style.left = `${event.clientX - rect.left}px`
        plusOne.style.top = `${event.clientY - rect.top}px`

        $circle.parentElement.appendChild(plusOne)

        incrementScore()

        setTimeout(() => {
            plusOne.remove()
        },2000)
    } )
}
