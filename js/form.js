'use strict';

(function () {

  var MAX_NUM_PINS = 5;
  var MAX_NUM_PINS_SLISE = MAX_NUM_PINS - 1;
  var PIN_MAIN_START_X = 570;
  var PIN_MAIN_START_Y = 375;
  var LOWER_PRICE_LIMIT = 10000;
  var UPPER_PRICE_LIMIT = 50000;
  window.mapPinMain.querySelector('img').classList.add('map__pin--main--img');
  var mapFiltersSetupSelect = document.querySelectorAll('.map__filters > select');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersSetupFieldset = document.querySelectorAll('.map__filters > fieldset');
  var adFormSetupFieldset = document.querySelectorAll('.ad-form > fieldset');
  var mapFiltersListenerIsAdd = false;

  var updElementsDisabledProperty = function (selectors, isDisabled) {
    for (var i = 0; i < selectors.length; i++) {
      for (var j = 0; j < selectors[i].length; j++) {
        selectors[i][j].disabled = isDisabled;
      }
    }
  };

  updElementsDisabledProperty([mapFiltersSetupSelect, mapFiltersSetupFieldset, adFormSetupFieldset], true);

  window.adFormInputAddress.value = parseInt(window.mapPinMain.style.left, 10) + ', ' + parseInt(window.mapPinMain.style.top, 10);
  var cleanPins = function () {
    Array.from(document.querySelectorAll('.map__pin_filter')).forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  };
  window.onMapPinMainMouseup = function () {

    window.adFormSetup.classList.remove('ad-form--disabled');

    updElementsDisabledProperty([mapFiltersSetupSelect, mapFiltersSetupFieldset, adFormSetupFieldset], false);

    var similarAdsTemplate = document
      .querySelector('#pin')
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
    var housingRooms = document.querySelector('#housing-rooms');
    var housingGuests = document.querySelector('#housing-guests');
    var housingPrice = document.querySelector('#housing-price');

    var typeFilter = function (elem) {
      if (housingType.value === 'any') {
        return true;
      }
      return elem.offer.type === housingType.value;
    };

    var numRoomsFilter = function (elem) {
      if (housingRooms.value === 'any') {
        return true;
      }
      return elem.offer.rooms === Number(housingRooms.value);
    };

    var numGuestsFilter = function (elem) {
      if (housingGuests.value === 'any') {
        return true;
      } else if (Number(housingGuests.value) === 0) {
        return elem.offer.guests === 0;
      }
      return elem.offer.guests === Number(housingGuests.value);
    };

    var numPricesFilter = function (elem) {
      if (housingPrice.value === 'any') {
        return true;
      } else if (housingPrice.value === 'high') {
        return elem.offer.price >= UPPER_PRICE_LIMIT;
      } else if (housingPrice.value === 'low') {
        return elem.offer.price <= LOWER_PRICE_LIMIT;
      } else if (housingPrice.value === 'middle') {
        if (elem.offer.price >= LOWER_PRICE_LIMIT && elem.offer.price <= UPPER_PRICE_LIMIT) {
          return true;
        }
      }
      return false;
    };

    var featuresFilter = function (elem) {
      var filterFeaturesCheckboxes = document.querySelectorAll('.map__features input[type=checkbox]:checked');
      var filtered = true;
      if (filterFeaturesCheckboxes.length) {
        filterFeaturesCheckboxes.forEach(function (chBox) {
          if (!elem.offer.features.includes(chBox.value)) {
            filtered = false;
          }
        });
      }
      return filtered;
    };

    var supeFilter = function (elem) {
      return typeFilter(elem) && numRoomsFilter(elem) && numGuestsFilter(elem) && numPricesFilter(elem) && featuresFilter(elem);
    };

    window.closeCardPopup();
    cleanPins();
    mapFiltersForm.reset();
    var drawRandomSlicePins = function () {
      var randomAdsSlise = window.util.getRandomInt(window.ads.length - MAX_NUM_PINS_SLISE);

      window.ads.slice(randomAdsSlise, randomAdsSlise + MAX_NUM_PINS).forEach(function (ads) {
        fragment.appendChild(renderAds(ads));
        setupSimilarList.appendChild(fragment);
      });
      var mapPin = document.querySelector('.map__pins');
      mapPin.addEventListener('click', window.onMapPinClick);
    };
    drawRandomSlicePins();

    var onPinFilterChange = function () {
      cleanPins();
      window.closeCardPopup();
      window.ads.filter(supeFilter).slice(0, MAX_NUM_PINS).forEach(function (ads) {
        fragment.appendChild(renderAds(ads));
        setupSimilarList.appendChild(fragment);
      });
    };

    if (!mapFiltersListenerIsAdd) {
      mapFiltersForm.addEventListener('change', window.util.debounce(onPinFilterChange));
      mapFiltersListenerIsAdd = true;
    }

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

  var inputRoomNumber = document.querySelector('#room_number');
  var inputCapacity = document.querySelector('#capacity');
  var inputCapacityOptions = inputCapacity.querySelectorAll('option');

  var inputRoomValidateNumber = function () {

    inputCapacityOptions.forEach(function (element) {
      element.remove();
    });

    var insertInputCapacityOptions = function (elements) {
      elements.forEach(function (element) {
        inputCapacity.appendChild(inputCapacityOptions[element]);
      });
    };

    switch (inputRoomNumber.selectedIndex) {
      case 0:
        insertInputCapacityOptions([2]);
        break;
      case 1:
        insertInputCapacityOptions([1, 2]);
        break;
      case 2:
        insertInputCapacityOptions([0, 1, 2]);
        break;
      case 3:
        insertInputCapacityOptions([3]);
        break;
    }
  };

  inputRoomValidateNumber();

  var changeInputRoomNumber = function () {
    inputRoomValidateNumber();
  };

  inputRoomNumber.addEventListener('change', changeInputRoomNumber);
  var formReset = document.querySelector('.ad-form__reset');

  var resetPinCoordinates = function (xCoordinate, yCoordinate) {
    window.mapPinMain.style.left = xCoordinate + 'px';
    window.mapPinMain.style.top = yCoordinate + 'px';
  };

  var resetForm = function () {
    document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
    Array.from(document.querySelectorAll('.ad-form__photo')).forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
    window.adFormSetup.reset();
    mapFiltersForm.reset();
    resetPinCoordinates(PIN_MAIN_START_X, PIN_MAIN_START_Y);
    cleanPins();
    updElementsDisabledProperty([mapFiltersSetupSelect, mapFiltersSetupFieldset, adFormSetupFieldset], true);
    window.mapSetup.classList.add('map--faded');
    window.adFormSetup.classList.add('ad-form--disabled');
    window.closeCardPopup();
  };

  formReset.addEventListener('click', resetForm);

  var successParent = document.querySelector('main');
  var successContainer = document
      .querySelector('#success')
      .content
      .querySelector('.success').cloneNode(true);

  var removeSuccessMessage = function () {
    successParent.removeChild(successContainer);
    document.removeEventListener('click', onSuccessClose);
    document.removeEventListener('keydown', onSuccessClose);
  };

  var onSuccessClose = function (evt) {
    window.util.isEscOrClick(evt, removeSuccessMessage);
  };

  var errorParent = document.querySelector('main');
  var errorContainer = document
      .querySelector('#error')
      .content
      .querySelector('.error').cloneNode(true);

  var removeErrorMessage = function () {
    errorParent.removeChild(errorContainer);
    document.removeEventListener('click', onErrorClose);
    document.removeEventListener('keydown', onErrorClose);
  };

  var onErrorClose = function (evt) {
    window.util.isEscOrClick(evt, removeErrorMessage);
  };

  var errorHandler = function () {
    errorParent.appendChild(errorContainer);
    document.addEventListener('click', onErrorClose);
    document.addEventListener('keydown', onErrorClose);
  };

  var successHandler = function () {
    successParent.appendChild(successContainer);
    resetForm();
    document.addEventListener('click', onSuccessClose);
    document.addEventListener('keydown', onSuccessClose);
  };

  window.adFormSetup.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.adFormSetup), successHandler, errorHandler);
    evt.preventDefault();
  });

})();
