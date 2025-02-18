import { updateUserInfo } from '../api/userApi'
import { getCurrentLevel } from './levels'
import { updateProgressBar,
    updateImageAndLevel,
    updateClicksLeft,
    updateAvailableLines,
    decrementAvailableLines,
    getAvailableLines,
    stopRecoveryProcess,
    startRecoveryProcess
} from './gameState'
import { updateUser } from '../api/userApi'

const $circle = document.querySelector("#circle")
const $score = document.querySelector("#score")
const $dailyScore = document.querySelector("#daily-score")
const $monthlyScore = document.querySelector("#monthly-score")

export function checkAndResetDailyScore() {
    const lastUpdatedDaily = localStorage.getItem('lastUpdated')
    const today = new Date().toISOString().split('T')[0];
    if (lastUpdatedDaily !== today) {
        localStorage.setItem('dailyScore', 0)
        localStorage.setItem('lastUpdated', today)
    }
}
export function checkAndResetMonthlyScore() {
    const lastUpdatedMonthly = localStorage.getItem('lastUpdatedMonthly')
    const currentMonth = new Date().toISOString().split('T')[0].slice(0, 7)
    if (lastUpdatedMonthly!==currentMonth) {
        localStorage.setItem('monthlyScore', 0)
        localStorage.setItem('lastUpdatedMonthly', currentMonth)
    }
}


export function setScore (score){
    localStorage.setItem('score', score)
    $score.textContent = score
}
export function setDailyScore(score) {
    localStorage.setItem('dailyScore', score)
    $dailyScore.textContent = score
}
export function setMonthlyScore(score) {
    localStorage.setItem('monthlyScore', score)
    $monthlyScore.textContent = score
}


export function getScore (){return Number(localStorage && localStorage.getItem('score')) || 0}
export function getDailyScore(){return Number(localStorage.getItem('dailyScore')) || 0}
export function getMonthlyScore() {return Number(localStorage.getItem('monthlyScore')) || 0}






export function incrementScore (){
    if (getAvailableLines() > 0) {
    const score = getScore()
    const level = getCurrentLevel(score)
    const newScore = getScore() + level.xlevel
    const newDailyScore = getDailyScore() +level.xlevel
    const newMonthlyScore = getMonthlyScore() + level.xlevel

    decrementAvailableLines()
    updateAvailableLines()

    setScore(newScore)
    setDailyScore(newDailyScore)
    setMonthlyScore(newMonthlyScore)

    updateProgressBar()
    updateImageAndLevel()
    updateClicksLeft()

    const userBeforeUpdate = {
        external_id_telegram: localStorage.getItem('external_id_telegram'),
        first_name: localStorage.getItem('first_name'),
        last_name: localStorage.getItem('last_name'),
        username: localStorage.getItem('username'),
        score: newScore,
        dailyScore: localStorage.getItem('dailyScore'),
        monthlyScore: localStorage.getItem('monthlyScore'),
        lastUpdated: localStorage.getItem('lastUpdated'),
        lastUpdatedMonthly:localStorage.getItem('lastUpdatedMonthly'),
        availableLines: getAvailableLines(),
    };
    updateUserInfo()
    updateUser(userBeforeUpdate)

    stopRecoveryProcess()

    setTimeout(() => {
        startRecoveryProcess()
    }, 5000)
    } else {
        $circle.classList.add('grayscale')
        return
    }
}