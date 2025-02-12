const SERVER_USERS_URL = import.meta.env.VITE_SERVER_USERS_URL;

export async function updateUser(updatedUser) {
    console.log('Updated USER', updatedUser)
    console.log('Updated USER ID', updatedUser.external_id_telegram)
    try {
        const response = await fetch(`${SERVER_USERS_URL}${updatedUser.external_id_telegram}`, {
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
        let response = await fetch(`${SERVER_USERS_URL}${userId}`)
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
        let response = await fetch(`${SERVER_USERS_URL}`)
        if (!response.ok) {
            throw new Error(`Request error! status: ${response.status}`);
        }
        return  await response.json()
    } catch (error) {
        console.error('Error fetching user:', error)
    }
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