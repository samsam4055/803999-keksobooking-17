'use strict';

(function () {
  var MAX_NUM_PINS = 5;
  var MAX_NUM_PINS_SLISE = MAX_NUM_PINS - 1;
  var mapFiltersSetupSelect = document.querySelectorAll('.map__filters > select');
  var mapFiltersSetupFieldset = document.querySelectorAll('.map__filters > fieldset');
  var adFormSetupFieldset = document.querySelectorAll('.ad-form > fieldset');

  var updateElementsDisabledProperty = function (selectors, isDisabled) {
    for (var i = 0; i < selectors.length; i++) {
      for (var j = 0; j < selectors[i].length; j++) {
        selectors[i][j].disabled = isDisabled;
      }
    }
  };

  updateElementsDisabledProperty([mapFiltersSetupSelect, mapFiltersSetupFieldset, adFormSetupFieldset], true);

  window.adFormInputAddress.value = parseInt(window.mapPinMain.style.left, 10) + ', ' + parseInt(window.mapPinMain.style.top, 10);

  window.onMapPinMainMouseup = function () {

    window.adFormSetup.classList.remove('ad-form--disabled');

    updateElementsDisabledProperty([mapFiltersSetupSelect, mapFiltersSetupFieldset, adFormSetupFieldset], false);

    var similarAdsTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

    var renderAds = function (ads) {
      var adsElement = similarAdsTemplate.cloneNode(true);

      adsElement.style = 'left: ' + ads.location.x + 'px; top: ' + ads.location.y + 'px;';
      adsElement.querySelector('img').src = ads.author.avatar;
      adsElement.querySelector('img').alt = ads.offer.title;
      adsElement.classList.add('map__pin_filter');

      return adsElement;
    };

    var fragment = document.createDocumentFragment();
    var setupSimilarList = document.querySelector('.map__pins');
    var housingType = document.querySelector('#housing-type');
    var typeFilter = function (elem) {
      return elem.offer.type === housingType.value;
    };

    var cleanPins = function () {
      Array.from(document.querySelectorAll('.map__pin_filter')).forEach(function (elem) {
        elem.parentNode.removeChild(elem);
      });
    };

    cleanPins();
    housingType.value = 'any';
    var drawingRandomSlicePins = function () {
      var randomAdsSlise = window.util.getRandomInt(window.ads.length - MAX_NUM_PINS_SLISE);

      window.ads.slice(randomAdsSlise, randomAdsSlise + MAX_NUM_PINS).forEach(function (ads) {
        fragment.appendChild(renderAds(ads));
        setupSimilarList.appendChild(fragment);
      });
    };
    drawingRandomSlicePins();
    housingType.addEventListener('change', function () {
      cleanPins();
      if (housingType.value === 'any') {
        drawingRandomSlicePins();
      } else {
        window.ads.filter(typeFilter).slice(0, MAX_NUM_PINS).forEach(function (ads) {
          fragment.appendChild(renderAds(ads));
          setupSimilarList.appendChild(fragment);
        });
      }
    });

    timeInSelect.addEventListener('change', onTimeClickSelectChange);
    timeOutSelect.addEventListener('change', onTimeClickSelectChange);
    typeSelect.addEventListener('change', onTypeClickSelectChange);
  };

  var priceInput = window.adFormSetup.querySelector('#price');
  var typeSelect = window.adFormSetup.querySelector('#type');
  var timeInSelect = window.adFormSetup.querySelector('#timein');
  var timeOutSelect = window.adFormSetup.querySelector('#timeout');

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

})();
