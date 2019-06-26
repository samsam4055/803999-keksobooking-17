'use strict';
window.util = (function () {

  return {

    toggleElementsDisabledValue: function (element, disable) {
      if (typeof element === 'object') {
        for (var i = 0; i < element.length; i++) {
          element[i].disabled = !!disable;
        }
      } else {
        element.disabled = !!disable;
      }
    },
  };

})();
