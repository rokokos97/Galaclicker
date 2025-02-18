import { fetchUser } from "./api/userApi";
import { storeUserData } from "./api/userApi";

export function initUser(telegramUser) {
    const tg = window.Telegram?.WebApp;
    console.log('tg', tg);
    if (!telegramUser) {
        console.warn('❗ Telegram WebApp API недоступний або користувач не авторизований.');
        startTestMode();
        return;
    }

    // const telegramUserId = 244718113;
    
    console.log(`🔍 Initializing user with ID: ${telegramUser}...`);
    localStorage.setItem('external_id_telegram', telegramUser);

    fetchUser(telegramUser)
        .then((dbUser) => {
            if (!dbUser || typeof dbUser !== 'object') {
                throw new Error('Invalid user data received');
            }
            console.log('✅ User data received:', dbUser);

            storeUserData(dbUser);
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
