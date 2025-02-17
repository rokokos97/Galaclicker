import { getScore } from "../game/score";
import { getCurrentLevel } from "../game/levels";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Ensure SERVER_URL ends with a slash
const getApiUrl = (endpoint) => {
    const baseUrl = SERVER_URL.endsWith('/') ? SERVER_URL : `${SERVER_URL}/`;
    return `${baseUrl}${endpoint}`;
};

/**
 * Updates user data on the server
 * @param {Object} userData - The user data to update
 * @param {string} userData.external_id_telegram - Telegram user ID
 * @param {number} userData.score - User's total score
 * @param {number} userData.dailyScore - User's daily score
 * @param {number} userData.monthlyScore - User's monthly score
 * @returns {Promise<Object>} Updated user data or error object
 */
export async function updateUser(userData) {
    try {
        console.log('🔄 Updating user data:', userData);
        
        if (!userData.external_id_telegram) {
            throw new Error('external_id_telegram is required');
        }

        const currentTime = new Date().toISOString();
        const dataToUpdate = {
            ...userData,
            lastUpdated: currentTime,
            lastUpdatedMonthly: currentTime
        };

        console.log('📤 Sending update request for user:', dataToUpdate);

        const response = await fetch(getApiUrl(`api/users/${userData.external_id_telegram}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(dataToUpdate)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedUser = await response.json();
        console.log('✅ User updated successfully:', updatedUser);
        return updatedUser;

    } catch (error) {
        console.error('❌ Error updating user:', error);
        return { error: error.message || 'Error updating user data' };
    }
}

export async function fetchUser(userId) {
    try {
        const url = getApiUrl(`api/users/${userId}`);
        console.log('🔍 Fetching user from:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Request error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Received user data:', data);
        
        if (!data) {
            throw new Error('No user data received');
        }
        
        return data;
    } catch (error) {
        console.error('❌ Error fetching user:', error);
        throw error; // Re-throw to handle in initUser
    }
}

export async function fetchAllUsers() {
    try {
        let response = await fetch(getApiUrl('api/users'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        })
        if (!response.ok) {
            throw new Error(`Request error! status: ${response.status}`);
        }
        console.log('response', response)
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