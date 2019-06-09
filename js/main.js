'use strict';

var mapSetup = document.querySelector('.map');

mapSetup.classList.remove('map--faded');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateAds = function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var authors = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var offers = ['palace', 'flat', 'house', 'bungalo'];

  var ads = [];

  for (var i = 0; i < 8; i++) {
    ads.push({
      avatar: authors[i],
      type: offers[getRandomInt(0, offers.length)],
      location: {
        x: getRandomInt(0 - PIN_WIDTH / 2, document.querySelector('.map__pins').offsetWidth - PIN_WIDTH / 2),
        y: getRandomInt(130 - PIN_HEIGHT, 630 - PIN_HEIGHT)
      }
    });
  }

  return ads;
};

var similarAdsTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderAds = function (ads) {
  var adsElement = similarAdsTemplate.cloneNode(true);

  adsElement.style = 'left: ' + ads.location.x + 'px; top: ' + ads.location.y + 'px;';
  adsElement.querySelector('img').src = ads.avatar;

  return adsElement;
};

var fragment = document.createDocumentFragment();

var ads = generateAds();

for (var j = 0; j < ads.length; j++) {
  fragment.appendChild(renderAds(ads[j]));
}

var setupSimilarList = document.querySelector('.map__pins');
var setupSimilarDialog = document.querySelector('.map__pin');

setupSimilarList.appendChild(fragment);
