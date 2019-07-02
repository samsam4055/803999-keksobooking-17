'use strict';

(function () {
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
    var filterOfType = function (elem) {
      return elem.offer.type === housingType.value;
    };

    var cleanPin = function () {
      Array.from(document.querySelectorAll('.map__pin_filter')).forEach(function (elem) {
        elem.parentNode.removeChild(elem);
      });
    };

    cleanPin();
    housingType.value = 'any';
    var getRandomPinSlice = function () {
      var randomAdsSlise = window.util.getRandomInt(window.ads.length - 4);

      window.ads.slice(randomAdsSlise, randomAdsSlise + 5).forEach(function (ads) {
        fragment.appendChild(renderAds(ads));
        setupSimilarList.appendChild(fragment);
      });
    };
    getRandomPinSlice();
    housingType.addEventListener('change', function () {
      if (housingType.value === 'any') {
        cleanPin();
        getRandomPinSlice();
      } else {
        cleanPin();
        window.ads.filter(filterOfType).slice(0, 5).forEach(function (ads) {
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
