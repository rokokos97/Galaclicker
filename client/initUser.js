import { fetchUser } from "./api/userApi";
import { storeUserData } from "./api/userApi";
import { runGame } from "./main"
import { initializeLeaderboard } from "./ui/leaderboard";

export function initUser() {
    const tg = window.Telegram?.WebApp;
    if (!tg || !tg.initDataUnsafe?.user) {
        console.warn('❗ Telegram WebApp API недоступний або користувач не авторизований.');
        startTestMode();
        return;
    }

    const telegramUserId = tg.initDataUnsafe.user.id;
    // const telegramUserId = 244718113;
    
    console.log(`🔍 Initializing user with ID: ${telegramUserId}...`);
    localStorage.setItem('external_id_telegram', telegramUserId);

    fetchUser(telegramUserId)
        .then((dbUser) => {
            if (!dbUser || typeof dbUser !== 'object') {
                throw new Error('Invalid user data received');
            }

            console.log('✅ User data received:', dbUser);
            
            // Ensure all required fields have default values
            const userData = {
                external_id_telegram: telegramUserId,
                username: 'Player',
                first_name: 'New',
                last_name: 'Player',
                score: 0,
                dailyScore: 0,
                monthlyScore: 0,
                lastUpdated: new Date().toISOString(),
                lastUpdatedMonthly: new Date().toISOString(),
                availableLines: 100,
                ...dbUser // This will override defaults with actual values
            };

            console.log('✅ Storing user data:', userData);
            storeUserData(userData);
        })
        .catch((error) => {
            console.error('❌ Error initializing user:', error);
            // Fallback to default values on error
            const defaultUser = {
                external_id_telegram: telegramUserId,
                username: 'Player',
                first_name: 'New',
                last_name: 'Player',
                score: 0,
                dailyScore: 0,
                monthlyScore: 0,
                lastUpdated: new Date().toISOString(),
                lastUpdatedMonthly: new Date().toISOString(),
                availableLines: 100
            };
            console.log('⚠️ Using default user data:', defaultUser);
            storeUserData(defaultUser);
        });

    tg.expand();
    tg.ready();
}
