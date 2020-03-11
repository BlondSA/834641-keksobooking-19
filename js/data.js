'use strict';
(function () {
  // Создание массива с данными пользователя
  var TYPES = ['PALACE', 'FLAT', 'HOUSE', 'BUNGALO'];
  var CHECKS = ['12:00', '13:00', '14:00']; // Массив один для заселения и выезда один, т.к. время въезда = время выезда и наоборот
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 100;
  var MIN_GUEST = 1;
  var MAX_GUEST = 3;
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var NUMBER_PINS = 8; // Кол-во вариантов жилья
  var MAP_PIN_MIN_Y = 130;
  var MAP_PIN_MAX_Y = 630;
  var MAP_PIN_MIN_X = 0;
  var map = document.querySelector('.map');


  var createUserData = function () {
    var pinData = [];
    // var location = {
    //   x: window.utils.getRandomIntInclusive(MAP_PIN_MIN_X, window.utils.getElementWidth(map)),
    //   y: window.utils.getRandomIntInclusive(window.utils.MAP_PIN_MIN_Y, MAP_PIN_MAX_Y)
    // };
    for (var i = 0; i < NUMBER_PINS; i++) {
      pinData.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        location: {
          x: window.utils.getRandomIntInclusive(MAP_PIN_MIN_X, window.utils.getElementWidth(map)),
          y: window.utils.getRandomIntInclusive(MAP_PIN_MIN_Y, MAP_PIN_MAX_Y)
        },

        offer: {
          title: 'Заголовок объявления',
          address: location.x + ', ' + location.y, // Локация x и y координаты задаются случаным образом
          price: window.utils.getRandomIntInclusive(MIN_PRICE, MAX_PRICE), // Цена за одну ночь
          type: window.utils.getRandomElement(TYPES), // Тип жилья
          rooms: window.utils.getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS), // Число, количество комнат,
          guests: window.utils.getRandomIntInclusive(MIN_GUEST, MAX_GUEST), // Число, количество гостей, которое можно разместить,
          checkin: window.utils.getRandomElement(CHECKS), // Время выезда - один случайный элемент массива CHECKS
          checkout: window.utils.getRandomElement(CHECKS), // Время выезда - один случайный элемент массива CHECKS
          features: window.utils.getRandomArrayElements(FEATURES), // Массив строк случайной длины из ниже предложенных(FEATURES)
          description: 'Описание', // Строка с описанием
          photos: window.utils.getRandomArrayElements(PHOTOS) // Массив строк случайной длины, содержащий адреса фотографий
        }
      });
    }

    return pinData;
  };

  var pinTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');

  // Функция создающая массив собранных данных пользователей

  var renderPin = function (element) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = element.location.x - window.utils.MAP_SHIFT_PIN_X + 'px';
    pinElement.style.top = element.location.y + 'px';
    pinElement.querySelector('img').src = element.author.avatar;
    pinElement.querySelector('img').alt = element.offer.title;

    return pinElement;
  };

  var pinsData = createUserData();

  window.data = {
    renderPin: renderPin,
    pinsData: pinsData,
  };
})();
