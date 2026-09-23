/*
    TMDB Proxy — проксирование постеров и API TMDB.

    Зачем: in RU api.themoviedb.org и image.tmdb.org недоступны,
    без этого скрипта в Lampa не работает ни каталог, ни картинки.

    Что делает: подменяет две функции Lampa —
        Lampa.TMDB.image()  — адреса постеров/кадров
        Lampa.TMDB.api()    — ВСЕ запросы к TMDB (поиск, карточки,
                              сезоны, эпизоды, персоны, коллекции)

    Из интерфейса Lampa ничего не удаляется: переключатель
    «Прокси TMDB» в настройках остаётся на месте и работает.
    Адреса серверов-прокси задаются ниже, в объекте PROXY.
*/
(function () {
    'use strict';

    var PROXY = {
        image: 'https://nl.imagetmdb.com/',
        api: 'https://apitmdb.cubnotrip.top/3/'
    };

    var DIRECT = {
        image: 'image.tmdb.org/',
        api: 'api.themoviedb.org/3/'
    };

    // Прокси включён по умолчанию. Явное false (пользователь сам снял
    // галочку в настройках) — работаем с TMDB напрямую, это осознанный
    // выбор тех, у кого есть доступ к сайту.
    function enabled() {
        return Lampa.Storage.get('proxy_tmdb') !== false;
    }

    function base(kind) {
        return enabled() ? PROXY[kind] : Lampa.Utils.protocol() + DIRECT[kind];
    }

    // При первом запуске фиксируем значение, чтобы переключатель
    // в настройках не показывал «выключено» при работающем прокси.
    var saved = Lampa.Storage.get('proxy_tmdb');
    if (saved === null || saved === undefined) {
        Lampa.Storage.set('proxy_tmdb', true);
    }

    Lampa.TMDB.image = function (url) {
        return base('image') + url;
    };

    Lampa.TMDB.api = function (url) {
        return base('api') + url;
    };

})();
