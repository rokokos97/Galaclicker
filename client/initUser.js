import { fetchUser } from "./api/userApi";
import { storeUserData } from "./api/userApi";

export function initUser(telegramUser) {
    const tg = window.Telegram?.WebApp;
    console.log('tg', tg);
    if (!telegramUser) {
        console.warn('❗ Telegram WebApp API unavelo');
        startTestMode();
        return;
    }
    // console.log(`🔍 Initializing user with ID: ${telegramUser}...`);
    fetchUser(telegramUser)
        .then((dbUser) => {
            if (!dbUser || typeof dbUser !== 'object') {
                throw new Error('Invalid user data received');
            }
            // console.log('✅ User data received:', dbUser);
            storeUserData(dbUser);
        })
        .catch((error) => {
            console.error('❌ Error initializing user:', error);
            storeUserData();
        });

    tg.expand();
    tg.ready();
}
