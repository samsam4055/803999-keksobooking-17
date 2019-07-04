'use strict';
(function () {

  var similarCardsTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var renderImages = function (photos) {

    var imgTemplate = similarCardsTemplate.querySelector('.popup__photo');
    var nodes = document.createDocumentFragment();
    var imgContainer = document.querySelector('.popup__photos');

    imgContainer.removeChild(document.querySelector('.popup__photo'));

    for (var i = 0; i < photos.length; i++) {
      var imgModel = imgTemplate.cloneNode(true);
      imgModel.src = photos[i];
      nodes.appendChild(imgModel);
    }
  imgContainer.appendChild(nodes);
  };
  var closeCardPopup = function () {
    Array.from(document.querySelectorAll('.map__card')).forEach(function (elem) {
        elem.parentNode.removeChild(elem);
      });
  };

  var definitionTypeHousing = function (typeHousing) {
    var offerType = '';
    switch (typeHousing) {
      case 'flat':
        offerType = 'Квартира';
        break;

      case 'bungalo':
        offerType = 'Бунгало';
        break;

      case 'house':
        offerType = 'Дом';
        break;

      case 'palace':
        offerType = 'Дворец';
        break;
    }
    return offerType;
  };

  var renderFeature = function (cardFeatures) {
    var features = document.querySelectorAll('.popup__feature');
var setDisplayStyle = function (feature) {
        document.querySelector('.popup__feature--' + feature).style = 'display: inline-block';
      };
    features.forEach(function (it) {
      it.style = 'display: none';
    });

    for (var i = 0; i < cardFeatures.length; i++) {
      setDisplayStyle(cardFeatures[i]);
    }
  };
  window.onMapPinClick = function (mapPinClickEvt) {
    var tmp = '';
    if (mapPinClickEvt.originalTarget.classList.contains('map__pin_filter') || mapPinClickEvt.originalTarget.nodeName === 'IMG' && mapPinClickEvt.originalTarget.alt !== 'Метка объявления') {
      tmp = mapPinClickEvt.target.alt;
      if (mapPinClickEvt.originalTarget.classList.contains('map__pin_filter')) {
        tmp = mapPinClickEvt.target.firstChild.alt;
      }

      closeCardPopup();

      var renderCards = function () {
        var cardsElement = similarCardsTemplate.cloneNode(true);

        window.ads.forEach(function (ads) {
          if (ads.offer.title === tmp) {
            cardsElement.querySelector('.popup__title').innerText = ads.offer.title;
            cardsElement.querySelector('img').src = ads.author.avatar;
            cardsElement.querySelector('.popup__text--address').innerText = ads.offer.address;
            cardsElement.querySelector('.popup__text--price').innerText = ads.offer.price + ' р/ночь';
            cardsElement.querySelector('.popup__type').innerText = definitionTypeHousing(ads.offer.type);
            cardsElement.querySelector('.popup__text--capacity').innerText = 'комнат: ' + ads.offer.rooms + ' гостей: ' + ads.offer.guests;
            cardsElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
            // добавить удобства
            window.cardFeatures = ads.offer.features;
            cardsElement.querySelector('.popup__description').innerText = ads.offer.description;
            window.cardPhotos = ads.offer.photos;
          }
        });

        return cardsElement;
      };

      var fragmentCards = document.createDocumentFragment();
      fragmentCards.appendChild(renderCards());
      var setupSimilarListCards = document.querySelector('body');

      setupSimilarListCards.appendChild(fragmentCards);
      renderImages(window.cardPhotos);
      renderFeature(window.cardFeatures);
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', closeCardPopup);
    }

  };
})();
