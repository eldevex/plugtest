(function () {
    'use strict';

    var tmdb_proxy = {
        name: 'TMDB Proxy',
        version: '1.0.3',
        description: 'Проксирование постеров и API сайта TMDB',
        // path_image: 'imagetmdb.cub.red/',
        // path_image: 'tmdbimage.ab2024.ru/',
        path_image: 'nl.imagetmdb.com/',
        path_api: 'apitmdb.' + (Lampa.Manifest && Lampa.Manifest.cub_domain ? Lampa.Manifest.cub_domain : 'cubnotrip.top') + '/3/'
    };

    function account(url){
        var email = Lampa.Storage.get('account_email')
        if(email) url = Lampa.Utils.addUrlComponent(url,'account_email=' + encodeURIComponent(email))
        return url
    }

    Lampa.TMDB.image = function (url) {
        var base = Lampa.Utils.protocol() + 'image.tmdb.org/' + url;
        // return Lampa.Storage.field('proxy_tmdb') ? Lampa.Utils.protocol() + tmdb_proxy.path_image + url : base;
        return 'https://nl.imagetmdb.com/' + url;
    };

    Lampa.TMDB.api = function (url) {
        var base = Lampa.Utils.protocol() + 'api.themoviedb.org/3/' + url;
        // return Lampa.Storage.field('proxy_tmdb') ? '//tmdb.ab2024.ru/3/' + url : base;
        // return Lampa.Storage.field('proxy_tmdb') ? '//apitmdb.cubnotrip.top/3/' + url : base;
        // return Lampa.Storage.field('proxy_tmdb') ? '//apitmdb.cubnotrip.top/3/' + url : base;
        return 'https://apitmdb.cubnotrip.top/3/' + url;
        // return 'https://lam5.akter-black.com/cub/tmdb./3/' + url
    };

    Lampa.Settings.listener.follow('open', function (e) {
        if (e.name == 'tmdb') {
            e.body.find('[data-parent="proxy"]').remove();
        }
    });

})();
