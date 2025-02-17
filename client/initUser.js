export function initUser() {
    const tg = window.Telegram?.WebApp;
    if (!tg || !tg.initDataUnsafe?.user) {
        console.warn('❗ Telegram WebApp API недоступний або користувач не авторизований.');
        startTestMode();
        return;
    }

    const telegramUserId = tg.initDataUnsafe.user.id;
    localStorage.setItem('external_id_telegram', telegramUserId);

    console.log(`🔍 Отримання даних про юзера з ID: ${telegramUserId}...`);

    fetchUser(telegramUserId)
        .then((dbUser) => {
            if (dbUser) {
                console.log('✅ Користувач знайдений у БД:', dbUser);
                storeUserData(dbUser);
                startGame();
            } else {
                console.warn('❗ Користувача немає в базі.');
            }
        })
        .catch((error) => {
            console.error('❌ Помилка при отриманні користувача:', error);
        });

    tg.expand();
    tg.ready();
}