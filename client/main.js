import './style.css';

import { storeUserData, updateUserInfo, fetchAllUsers } from './api/userApi'

import { setupLeaderboard, initializeLeaderboard, displayLeaderboard } from './ui/leaderboard';

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
const telegramUser = tg.initDataUnsafe.user.id;
// const telegramUser = 244718113
console.log("telegramUser", telegramUser)



if (telegramUser) {
    initUser(telegramUser);
    initializeApp();
    runGame();
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
    storeUserData({});
    initializeApp();
    runGame();
    console.error('User data not available run test game');
}

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
    initializeLeaderboard();

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

        const DEG = 40

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

// import './style.css';

// import { storeUserData, updateUserInfo, fetchAllUsers } from './api/userApi';
// import { setupLeaderboard, initializeLeaderboard, displayLeaderboard } from './ui/leaderboard';
// import {
//     checkAndResetDailyScore, checkAndResetMonthlyScore, setScore, getScore,
//     setDailyScore, getDailyScore, setMonthlyScore, getMonthlyScore, incrementScore
// } from './game/score';
// import {
//     updateProgressBar, updateImageAndLevel, updateClicksLeft, updateAvailableLines, getAvailableLines
// } from './game/gameState';
// import { getCurrentLevel } from './game/levels';

// // Перевіряємо, чи підтримується Telegram WebApp
// const tg = window.Telegram?.WebApp;
// if (!tg) {
//     console.error('Telegram WebApp API недоступний!');
// }

// const telegramUser = tg?.initDataUnsafe?.user;

// // Функція отримання користувача (припускаємо, що fetchUser потрібно імпортувати)
// async function fetchUser(userId) {
//     try {
//         const response = await fetch(`/api/users/${userId}`);
//         return response.ok ? await response.json() : null;
//     } catch (error) {
//         console.error('Помилка отримання даних користувача:', error);
//         return null;
//     }
// }

// if (telegramUser) {
//     fetchUser(telegramUser.id).then((dbUser) => {
//         if (dbUser) {
//             console.log('DB user:', dbUser);
//             storeUserData(dbUser);
//             startGame();
//         }
//     });
//     tg.expand();
//     tg.ready();
// } else {
//     console.warn('Дані користувача Telegram недоступні. Використовується тестовий режим.');
//     localStorage.setItem('userId', '007');
//     localStorage.setItem('username', 'Test');
//     localStorage.setItem('first_name', 'Test');
//     localStorage.setItem('last_name', 'Test');
//     localStorage.setItem('score', '0');
//     localStorage.setItem('dailyScore', '0');
//     localStorage.setItem('monthlyScore', '0');
//     localStorage.setItem('lastUpdated', '');
//     localStorage.setItem('lastUpdatedMonthly', '');
//     localStorage.setItem('availableLines', '100');
//     storeUserData({});
//     initializeApp();
//     runGame();
// }

// function resetScore() {
//     checkAndResetDailyScore();
//     checkAndResetMonthlyScore();

//     updateGameUi();
// }

// function runGame() {
//     resetScore();
//     updateGameUi();
//     handleUserUpdates();
// }

// function updateGameUi() {
//     updateProgressBar();
//     updateImageAndLevel();
//     updateClicksLeft();
//     updateAvailableLines();

//     if (getAvailableLines() < getCurrentLevel(getScore()).maxLines) {
//         recoverLines();
//     }
// }

// async function handleUserUpdates() {
//     updateUserInfo();
//     const users = await fetchAllUsers();
//     displayLeaderboard(users);

//     document.getElementById('loading-screen')?.style.setProperty('display', 'none');
//     document.getElementById('navigation')?.style.setProperty('display', 'block');
//     document.getElementById('game')?.classList.add("active");
// }

// function initializeApp() {
//     setupLeaderboard();
//     initializeLeaderboard();

//     document.querySelectorAll("nav ul li a").forEach(link => {
//         link.addEventListener("click", (e) => {
//             e.preventDefault();
//             const targetSection = e.target.getAttribute("data-section");

//             document.querySelectorAll(".section").forEach(section => {
//                 section.classList.toggle("active", section.id === targetSection);
//             });
//         });
//     });

//     document.querySelectorAll("img").forEach(img => {
//         img.addEventListener('contextmenu', e => e.preventDefault());
//         img.setAttribute('draggable', 'false');
//     });

//     const $circle = document.querySelector("#circle");
//     $circle.addEventListener('click', (event) => {
//         const rect = $circle.getBoundingClientRect();
//         const offsetX = event.clientX - rect.left - rect.width / 2;
//         const offsetY = event.clientY - rect.top - rect.height / 2;
//         const DEG = 40;

//         $circle.style.transform = `rotateX(${(offsetY / rect.height) * DEG}deg) rotateY(${(offsetX / rect.width) * -DEG}deg)`;

//         setTimeout(() => {
//             $circle.style.transform = '';
//         }, 200);

//         const plusOne = document.createElement('div');
//         plusOne.classList.add('plusOne');
//         plusOne.textContent = `+${getCurrentLevel(getScore()).xlevel}`;
//         plusOne.style.left = `${event.clientX - rect.left}px`;
//         plusOne.style.top = `${event.clientY - rect.top}px`;

//         $circle.parentElement.appendChild(plusOne);

//         incrementScore();

//         setTimeout(() => {
//             plusOne.remove();
//         }, 2000);
//     });
// }
