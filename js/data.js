'use strict';

(function () {
  window.ACTIVE_MAP_START = 130;
  window.ACTIVE_MAP_FINISH = 630;
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var generateAds = function () {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var offers = ['palace', 'flat', 'house', 'bungalo'];

    var ads = [];

    for (var i = 0; i < 8; i++) {
      ads.push({
        avatar: 'img/avatars/user' + String(i + 1).padStart(2, '0') + '.png',
        headline: 'Заголовок ' + (i + 1),
        type: offers[getRandomInt(0, offers.length)],
        location: {
          x: getRandomInt(0 - PIN_WIDTH / 2, document.querySelector('.map__pins').offsetWidth - PIN_WIDTH / 2),
          y: getRandomInt(ACTIVE_MAP_START - PIN_HEIGHT, ACTIVE_MAP_FINISH - PIN_HEIGHT)
        }
      });
    }

    return ads;
  };
  window.ads = generateAds();

})();
