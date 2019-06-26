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
          y: getRandomInt(window.ACTIVE_MAP_START - PIN_HEIGHT, window.ACTIVE_MAP_FINISH - PIN_HEIGHT)
        }
      });
    }

    return ads;
  };
  var errorHandler = 1; // временно для тестов
  var createApartments = function (apartmentServerSideData) {
    var apartmentsList = [];
    for (var i = 0; i < apartmentServerSideData.length; i++) {
      var apartment = apartmentServerSideData[i];
      apartmentsList.push(apartment);
    }
    window.ads = apartmentsList;
  };

  window.backend.load(createApartments, errorHandler);

})();
