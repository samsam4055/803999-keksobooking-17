'use strict';

(function () {
  var mapFiltersSetupSelect = document.querySelectorAll('.map__filters > select');
  var mapFiltersSetupFieldset = document.querySelectorAll('.map__filters > fieldset');
  var adFormSetupFieldset = document.querySelectorAll('.ad-form > fieldset');

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

  window.onMapPinMainMouseup = function () {

    adFormSetup.classList.remove('ad-form--disabled');

    for (i = 0; i < mapFiltersSetupSelect.length; i++) {
      mapFiltersSetupSelect[i].disabled = 0;
    }

    for (i = 0; i < mapFiltersSetupFieldset.length; i++) {
      mapFiltersSetupFieldset[i].disabled = 0;
    }

    for (i = 0; i < adFormSetupFieldset.length; i++) {
      adFormSetupFieldset[i].disabled = 0;
    }

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

    for (i = 0; i < ads.length; i++) {
      fragment.appendChild(renderAds(ads[i]));
    }

    var setupSimilarList = document.querySelector('.map__pins');

    setupSimilarList.appendChild(fragment);
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

})();
