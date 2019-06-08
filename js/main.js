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
      x: getRandomInt(10, 1200),
      y: getRandomInt(130, 630)
    });
  }

  return ads;
};


var ads = generateAds();

console.log(ads);
