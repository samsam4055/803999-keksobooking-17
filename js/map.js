'use strict';

(function () {
  window.mapPinMain = document.querySelector('.map__pin--main');
  window.adFormSetup = document.querySelector('.ad-form');
  window.adFormInputAddress = adFormSetup.querySelector('#address');
  var mapSetup = document.querySelector('.map');
  var onMapPinMainMouseDown = function (evtDialog) {
    mapSetup.classList.remove('map--faded');
    evtDialog.preventDefault();

    var startCoords = {
      x: evtDialog.clientX,
      y: evtDialog.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
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

      onMapPinMainMouseup();

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
})();
