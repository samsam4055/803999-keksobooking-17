'use strict';
(function () {
  var ESC_KEYCODE = 27;
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
        if (evt.keyCode === ESC_KEYCODE) {
          action();
        }
      },
      isEscOrClick: function (evt, action) {
        if (evt.type === 'click') {
          action();
        } else if (evt.type === 'keydown') {
          if (evt.keyCode === ESC_KEYCODE) {
            action();
          }
        }
      }
    };

  })();

})();
