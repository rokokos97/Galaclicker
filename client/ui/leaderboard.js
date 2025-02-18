import { fetchAllUsers } from '../api/userApi';

export function displayLeaderboard(users) {
    const sortedUsers = users.sort((a, b) => b.score - a.score);
    const tbodyHTML = sortedUsers.map((user, index) => `
        <tr>
            <td>${index+1}</td>
            <td>${user.username}</td>
            <td>${user.score}</td>
        </tr>
    `).join('');
    document.querySelector('#tbody').innerHTML = tbodyHTML
}

export function setupLeaderboard() {
    document.querySelector('#leaderboardLink').addEventListener('click', () => {
        fetchAllUsers().then(users => displayLeaderboard(users));
    });
}

// export function initializeLeaderboard() {
//     fetchAllUsers().then(users => {
//         console.log(users)
//         return displayLeaderboard(users)});
// }