

    var mapPin = document.querySelector('.map__pins');
    mapPin.addEventListener('click', window.onMapPinClick);

  window.onMapPinClick = function (mapPinClickEvt) {
    if(mapPinClickEvt.originalTarget.classList.contains('map__pin_filter')) {
      var similarCardsTemplate = document.querySelector('#card')
        .content
        .querySelector('.map__card');
      var similarPhotosTemplate = document.querySelector('#card')
        .content
        .querySelector('.popup__photos');

      var renderCards = function () {
        var cardsElement = similarCardsTemplate.cloneNode(true);
      
      
      window.ads.forEach(function (ads) {
        if(ads.offer.title === mapPinClickEvt.target.firstChild.alt){
          cardsElement.querySelector('.popup__title').innerText = ads.offer.title;
          cardsElement.querySelector('img').src = ads.author.avatar;
          cardsElement.querySelector('.popup__text--address').innerText = ads.offer.address;
          cardsElement.querySelector('.popup__text--price').innerText = ads.offer.price + ' р/ночь';
          cardsElement.querySelector('.popup__type').innerText = ads.offer.type; // требует доработки
          cardsElement.querySelector('.popup__text--capacity').innerText = 'комнат: ' + ads.offer.rooms + ' гостей: ' + ads.offer.guests; // требует доработки
          cardsElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
          // добавить удобства
          cardsElement.querySelector('.popup__description').innerText = ads.offer.description;
          //cardsElement.querySelector('.popup__photos > img').src = ads.offer.photos[0]; // доработать - нужны все фото
          
          ads.offer.photos.forEach(function (photo) {
            var photoElement = similarPhotosTemplate.cloneNode(true);
          cardsElement.querySelector('.popup__photos > img').src = photo; // доработать - нужны все фото
          });
        }
      });
      
      
      
      

      return cardsElement;
      };

      var fragmentCards = document.createDocumentFragment();
      fragmentCards.appendChild(renderCards ());
      var setupSimilarListCards = document.querySelector('body');

      setupSimilarListCards.appendChild(fragmentCards);
    }
  };

