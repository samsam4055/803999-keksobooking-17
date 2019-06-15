'use strict';

(function () {

  var mapSetup = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFiltersSetupSelect = document.querySelectorAll('.map__filters > select');
  var mapFiltersSetupFieldset = document.querySelectorAll('.map__filters > fieldset');
  var adFormSetup = document.querySelector('.ad-form');
  var adFormSetupFieldset = document.querySelectorAll('.ad-form > fieldset');
  var adFormInputAddress = adFormSetup.querySelector('#address');

  for (var h = 0; h < mapFiltersSetupSelect.length; h++) {
    mapFiltersSetupSelect[h].disabled = 1;
  }

  for (var n = 0; n < mapFiltersSetupFieldset.length; n++) {
    mapFiltersSetupFieldset[n].disabled = 1;
  }

  for (var k = 0; k < adFormSetupFieldset.length; k++) {
    adFormSetupFieldset[k].disabled = 1;
  }

  adFormInputAddress.value = mapPinMain.style.left.replace(/[^+-\d.]/g, '') + ', ' + mapPinMain.style.top.replace(/[^+-\d.]/g, '');

  var onMapPinMainMouseup = function () {

    adFormSetup.classList.remove('ad-form--disabled');

    mapSetup.classList.remove('map--faded');

    for (var x = 0; x < mapFiltersSetupSelect.length; x++) {
      mapFiltersSetupSelect[x].disabled = 0;
    }

    for (var z = 0; z < mapFiltersSetupFieldset.length; z++) {
      mapFiltersSetupFieldset[z].disabled = 0;
    }

    for (var y = 0; y < adFormSetupFieldset.length; y++) {
      adFormSetupFieldset[y].disabled = 0;
    }

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
    mapPinMain.removeEventListener('mouseup', onMapPinMainMouseup);
  };

  mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);

})();
