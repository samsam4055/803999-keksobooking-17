'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  window.util = (function () {

    return {

      updateElementsDisabledProperty: function (elements, disable) {
        if (typeof elements === 'object') {
          for (var i = 0; i < elements.length; i++) {
            elements[i].disabled = !!disable;
          }
        } else {
          elements.disabled = !!disable;
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

  window.util.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
