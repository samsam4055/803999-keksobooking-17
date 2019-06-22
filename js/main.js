'use strict';

(function () {

  var mapSetup = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFiltersSetupSelect = document.querySelectorAll('.map__filters > select');
  var mapFiltersSetupFieldset = document.querySelectorAll('.map__filters > fieldset');
  var adFormSetup = document.querySelector('.ad-form');
  var adFormSetupFieldset = document.querySelectorAll('.ad-form > fieldset');
  var adFormInputAddress = adFormSetup.querySelector('#address');
  var ACTIVE_MAP_START = 130;
  var ACTIVE_MAP_FINISH = 630;

  for (var i = 0; i < mapFiltersSetupSelect.length; i++) {
    mapFiltersSetupSelect[i].disabled = 1;
  }

  for (i = 0; i < mapFiltersSetupFieldset.length; i++) {
    mapFiltersSetupFieldset[i].disabled = 1;
  }

  for (i = 0; i < adFormSetupFieldset.length; i++) {
    adFormSetupFieldset[i].disabled = 1;
  }

  adFormInputAddress.value = parseInt(mapPinMain.style.left, 10) + ', ' + parseInt(mapPinMain.style.top, 10);

  var onMapPinMainMouseup = function () {

    adFormSetup.classList.remove('ad-form--disabled');

    mapSetup.classList.remove('map--faded');

    for (i = 0; i < mapFiltersSetupSelect.length; i++) {
      mapFiltersSetupSelect[i].disabled = 0;
    }

    for (i = 0; i < mapFiltersSetupFieldset.length; i++) {
      mapFiltersSetupFieldset[i].disabled = 0;
    }

    for (i = 0; i < adFormSetupFieldset.length; i++) {
      adFormSetupFieldset[i].disabled = 0;
    }

    var getRandomInt = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    var generateAds = function () {
      var PIN_WIDTH = 50;
      var PIN_HEIGHT = 70;
      var offers = ['palace', 'flat', 'house', 'bungalo'];

      var ads = [];

      for (i = 0; i < 8; i++) {
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

    for (i = 0; i < ads.length; i++) {
      fragment.appendChild(renderAds(ads[i]));
    }

    var setupSimilarList = document.querySelector('.map__pins');

    setupSimilarList.appendChild(fragment);
    mapPinMain.removeEventListener('mousedown', onMapPinMainMouseDown);
    timeInSelect.addEventListener('change', onTimeClickSelectChange);
    timeOutSelect.addEventListener('change', onTimeClickSelectChange);
    typeSelect.addEventListener('change', onTypeClickSelectChange);
  };

  var priceInput = adFormSetup.querySelector('#price');
  var typeSelect = adFormSetup.querySelector('#type');
  var timeInSelect = adFormSetup.querySelector('#timein');
  var timeOutSelect = adFormSetup.querySelector('#timeout');

  var MIN_PRICES = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var onTypeClickSelectChange = function (evt) {
    priceInput.placeholder = MIN_PRICES[evt.target.value];
    priceInput.min = MIN_PRICES[evt.target.value];
  };

  var onTimeClickSelectChange = function (evt) {
    if (evt.target.name === 'timein') {
      timeOutSelect.value = evt.target.value;
    } else {
      timeInSelect.value = evt.target.value;
    }
  };

  var onMapPinMainMouseDown = function (evtDialog) {

    evtDialog.preventDefault();

    var startCoords = {
      x: evtDialog.clientX,
      y: evtDialog.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: Math.min(Math.max(moveEvt.clientX, mapSetup.offsetLeft), mapSetup.offsetWidth + mapSetup.offsetLeft),
        y: Math.min(Math.max(moveEvt.clientY, ACTIVE_MAP_START - window.scrollY - mapPinMain.offsetHeight), ACTIVE_MAP_FINISH - window.scrollY)
      };

      mapPinMain.style.top = Math.min(Math.max((mapPinMain.offsetTop - shift.y), ACTIVE_MAP_START - mapPinMain.offsetHeight), ACTIVE_MAP_FINISH) + 'px';
      mapPinMain.style.left = Math.min(Math.max((mapPinMain.offsetLeft - shift.x), 0 - (mapPinMain.offsetWidth / 2)), mapSetup.offsetWidth - (mapPinMain.offsetWidth / 2)) + 'px';
      adFormInputAddress.value = Math.round((mapPinMain.offsetWidth / 2) + parseInt(mapPinMain.style.left, 10)) + ', ' + parseInt(mapPinMain.style.top, 10);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtDragged) {
          evtDragged.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
      onMapPinMainMouseup();

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);

})();
