'use strict';

(function () {
  window.ACTIVE_MAP_START = 130;
  window.ACTIVE_MAP_FINISH = 630;
  window.mapPinMain = document.querySelector('.map__pin--main');
  var adFormElements = document.querySelectorAll('.ad-form__element');

  var firstUserPinClickHandler = function () {

    if (!sceneIsActive) {
      activateScene();
    }
    window.mapPinMain.removeEventListener('click', firstUserPinClickHandler);
  };

  window.mapPinMain.addEventListener('click', firstUserPinClickHandler);

  var sceneIsActive = false;

  var activateScene = function () {
    window.mapSetup.classList.remove('map--faded');
    window.adFormSetup.classList.remove('ad-form--disabled');
    window.util.updateElementsDisabledProperty(adFormElements);
    window.backend.load(createApartments, errorHandler);
    sceneIsActive = true;
  };

  var disableScene = function () {
    window.util.updateElementsDisabledProperty(adFormElements, true);
    window.mapSetup.classList.add('map--faded');
    window.adFormSetup.classList.add('ad-form--disabled');
    sceneIsActive = false;
  };
  var errorHandler = function () {
    var errorParent = document.querySelector('main');
    var errorContainer = document.querySelector('#error')
      .content
      .querySelector('.error').cloneNode(true);

    errorParent.appendChild(errorContainer);

    disableScene();

    var removeErrorMessage = function () {
      errorParent.removeChild(errorContainer);
      document.removeEventListener('click', onErrorClose);
      document.removeEventListener('keydown', onErrorClose);
      activateScene();
    };

    var onErrorClose = function (evt) {
      window.util.isEscOrClick(evt, removeErrorMessage);
    };

    document.addEventListener('click', onErrorClose);
    document.addEventListener('keydown', onErrorClose);

  };
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
