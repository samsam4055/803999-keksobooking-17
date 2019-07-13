'use strict';
(function () {

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
      isEsc: function (evt, action) {
        if (evt.code === 'Escape') {
          action();
        }
      },
      isEscOrClick: function (evt, action) {
        if (evt.type === 'click') {
          action();
        } else if (evt.code === 'Escape') {
          action();
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
