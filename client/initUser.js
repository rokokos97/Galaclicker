import { fetchUser } from "./api/userApi";
import { storeUserData } from "./api/storeUserData/storeUserData";

export function initUser(telegramUser) {
    const tg = window.Telegram?.WebApp;
    const userPicUrl =  tg?.initDataUnsafe?.user?.photo_url
    console.log('userPicUrl', userPicUrl);
    if(userPicUrl){
        const img = document.querySelector('.user__img-container img');
        if (img) {
            img.src = `${userPicUrl}`;
        }
    }
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
        });

    tg.expand();
    tg.ready();
}
