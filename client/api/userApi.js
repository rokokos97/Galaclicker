import { getScore } from "../game/score";
import { getCurrentLevel } from "../game/levels";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function updateUser(updatedUser) {
    console.log('Updated USER', updatedUser)
    console.log('Updated USER ID', updatedUser.external_id_telegram)
    try {
        const response = await fetch(`${SERVER_URL}/api/users/${updatedUser.external_id_telegram}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        console.error('Error updating user:', error)
        return { error: 'Error updating user data' }
    }
}

export async function fetchUser(userId) {
    try {
        let response = await fetch(`${SERVER_URL}/api/users/${userId}`)
        if (!response.ok) {
            throw new Error(`Request error! status: ${response.status}`);
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching user:', error)
    }
}

export async function fetchAllUsers() {
    try {
        let response = await fetch(`${SERVER_URL}/api/users`)
        if (!response.ok) {
            throw new Error(`Request error! status: ${response.status}`);
        }
        return  await response.json()
    } catch (error) {
        console.error('Error fetching user:', error)
    }
}

export function updateUserInfo() {
    const userInfoDiv = document.querySelector('.user__info');
    const score = getScore();
    const level = getCurrentLevel(score);
    const first_name = localStorage.getItem('first_name');
    const last_name = localStorage.getItem('last_name');

    userInfoDiv.innerHTML = `
        <p>Total Clicks: ${score}</p>
        <p>Current Level: ${level.name}</p>
        <p>First Name: ${first_name}</p>
        <p>Last Name: ${last_name}</p>
    `;
}

export function storeUserData(user){
    localStorage.setItem('external_id_telegram', user.external_id_telegram || '007');
    localStorage.setItem('username', user.username || 'Test');
    localStorage.setItem('first_name', user.first_name || 'Test');
    localStorage.setItem('last_name', user.last_name || 'Test');
    localStorage.setItem('score', user.score || '0');
    localStorage.setItem('dailyScore', user.dailyScore || '0');
    localStorage.setItem('monthlyScore', user.monthlyScore || '0');
    localStorage.setItem('lastUpdated', user.lastUpdated || '');
    localStorage.setItem('lastUpdatedMonthly', user.lastUpdatedMonthly || '');
    localStorage.setItem('availableLines', String(user.availableLines || '100'));
}

// async function fetchLevels() {
//     try {
//         let response = await fetch(`${SERVER_LEVELS_URL}`)
//         if (!response.ok) {
//             throw new Error(`Request error! status: ${response.status}`);
//         }
//         let data = await response.json()
//         return data;
//     } catch (error) {
//         console.error('Error fetching user:', error)
//     }
// }