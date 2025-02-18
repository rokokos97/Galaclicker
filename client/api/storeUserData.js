export function storeUserData(user){
    localStorage.setItem('external_id_telegram', user.external_id_telegram);
    localStorage.setItem('username', user.username);
    localStorage.setItem('first_name', user.first_name);
    localStorage.setItem('last_name', user.last_name);
    localStorage.setItem('score', user.score);
    localStorage.setItem('dailyScore', user.dailyScore);
    localStorage.setItem('monthlyScore', user.monthlyScore);
    localStorage.setItem('lastUpdated', user.lastUpdated);
    localStorage.setItem('lastUpdatedMonthly', user.lastUpdatedMonthly);
    localStorage.setItem('availableLines', String(user.availableLines));
}