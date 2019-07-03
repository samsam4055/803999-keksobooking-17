'use strict';
(function () {

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
      }
    };

  })();

})();
