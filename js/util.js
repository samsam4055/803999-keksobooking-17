'use strict';
(function () {
  window.ESC_KEYCODE = 27;
  window.util = (function () {

    return {

      updateElementsDisabledProperty: function (element, disable) {
        if (typeof element === 'object') {
          for (var i = 0; i < element.length; i++) {
            element[i].disabled = !!disable;
          }
        } else {
          element.disabled = !!disable;
        }
      },
      getRandomInt: function (max) {
        return Math.floor(Math.random() * max);
      },
      isEsc: function (evt, action) {
        if (evt.keyCode === window.ESC_KEYCODE) {
          action();
        }
      }
    };

  })();

})();
