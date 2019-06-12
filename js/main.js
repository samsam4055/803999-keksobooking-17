'use strict';

(function () {

  var mapSetup = document.querySelector('.map');

  mapSetup.classList.remove('map--faded');

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
          y: getRandomInt(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
        }
      });
    }

    return ads;
  };

  var similarAdsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderAds = function (ads) {
    var adsElement = similarAdsTemplate.cloneNode(true);

    adsElement.style = 'left: ' + ads.location.x + 'px; top: ' + ads.location.y + 'px;';
    adsElement.querySelector('img').src = ads.avatar;
    adsElement.querySelector('img').alt = ads.headline;

    return adsElement;
  };

  var fragment = document.createDocumentFragment();

  var ads = generateAds();

  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(renderAds(ads[j]));
  }

  var setupSimilarList = document.querySelector('.map__pins');

  setupSimilarList.appendChild(fragment);

})();
