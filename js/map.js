'use strict';

(function () {
  window.adFormSetup = document.querySelector('.ad-form');
  window.adFormInputAddress = window.adFormSetup.querySelector('#address');
  window.mapSetup = document.querySelector('.map');
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
        y: Math.min(Math.max(moveEvt.clientY, window.ACTIVE_MAP_START - window.scrollY - window.mapPinMain.offsetHeight), window.ACTIVE_MAP_FINISH - window.scrollY)
      };

      window.mapPinMain.style.top = Math.min(Math.max((window.mapPinMain.offsetTop - shift.y), window.ACTIVE_MAP_START - window.mapPinMain.offsetHeight), window.ACTIVE_MAP_FINISH) + 'px';
      window.mapPinMain.style.left = Math.min(Math.max((window.mapPinMain.offsetLeft - shift.x), 0 - (window.mapPinMain.offsetWidth / 2)), mapSetup.offsetWidth - (window.mapPinMain.offsetWidth / 2)) + 'px';
      window.adFormInputAddress.value = Math.round((window.mapPinMain.offsetWidth / 2) + parseInt(window.mapPinMain.style.left, 10)) + ', ' + parseInt(window.mapPinMain.style.top, 10);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.onMapPinMainMouseup();

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
})();
