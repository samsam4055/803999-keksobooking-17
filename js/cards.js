

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

  window.onMapPinClick = function (mapPinClickEvt) {
    var tmp = '';
    if(mapPinClickEvt.originalTarget.classList.contains('map__pin_filter') || mapPinClickEvt.originalTarget.nodeName === 'IMG' && mapPinClickEvt.originalTarget.alt != 'Метка объявления') { 
      tmp = mapPinClickEvt.target.alt;
      if (mapPinClickEvt.originalTarget.classList.contains('map__pin_filter')) {
        tmp = mapPinClickEvt.target.firstChild.alt;
      }

      Array.from(document.querySelectorAll('.map__card')).forEach(function (elem) {
        elem.parentNode.removeChild(elem);
      });

      var renderCards = function () {
        var cardsElement = similarCardsTemplate.cloneNode(true);

        window.ads.forEach(function (ads) {
          if(ads.offer.title === tmp){
            cardsElement.querySelector('.popup__title').innerText = ads.offer.title;
            cardsElement.querySelector('img').src = ads.author.avatar;
            cardsElement.querySelector('.popup__text--address').innerText = ads.offer.address;
            cardsElement.querySelector('.popup__text--price').innerText = ads.offer.price + ' р/ночь';
            cardsElement.querySelector('.popup__type').innerText = ads.offer.type; // требует доработки
            cardsElement.querySelector('.popup__text--capacity').innerText = 'комнат: ' + ads.offer.rooms + ' гостей: ' + ads.offer.guests; // требует доработки
            cardsElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
            // добавить удобства
            cardsElement.querySelector('.popup__description').innerText = ads.offer.description;
            window.cardPhotos = ads.offer.photos;
          }
        });

        return cardsElement;
      };

      var fragmentCards = document.createDocumentFragment();
      fragmentCards.appendChild(renderCards ());
      var setupSimilarListCards = document.querySelector('body');

      setupSimilarListCards.appendChild(fragmentCards);
      renderImages(window.cardPhotos);
    }

  };
