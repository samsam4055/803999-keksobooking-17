'use strict';

var mapSetup = document.querySelector('.map');

mapSetup.classList.remove('map--faded');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateAds = function () {
  var authors = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var offers = ['palace', 'flat', 'house', 'bungalo'];

  var ads = [];

  for (var i = 0; i < 8; i++) {
    ads.push({
      avatar: authors[i],
      type: offers[getRandomInt(0, offers.length)],
      x: getRandomInt(0 - document.querySelector('.map__pin').offsetWidth / 2, document.querySelector('.map__pins').offsetWidth - document.querySelector('.map__pin').offsetWidth / 2),
      y: getRandomInt(130 - document.querySelector('.map__pin').offsetHeight, 630 - document.querySelector('.map__pin').offsetHeight)
    });
  }

  return ads;
};

var similarAdsTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderAds = function (ads) {
  var adsElement = similarAdsTemplate.cloneNode(true);

  adsElement.style = 'left: ' + ads.x + 'px; top: ' + ads.y + 'px;';
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
