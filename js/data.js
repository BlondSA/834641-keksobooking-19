'use strict';
(function () {
  // Создание массива с данными пользователя
  var createUserData = function () {
    var pinData = [];
    var location = {
      x: window.utils.getRandomIntInclusive(window.utils.MAP_PIN_MIN_X, window.utils.getElementWidth(window.utils.map)),
      y: window.utils.getRandomIntInclusive(window.utils.MAP_PIN_MIN_Y, window.utils.MAP_PIN_MAX_Y)
    };
    for (var i = 0; i < window.utils.NUMBER_PINS; i++) {
      pinData.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        location: {
          x: window.utils.getRandomIntInclusive(window.utils.MAP_PIN_MIN_X, window.utils.getElementWidth(window.utils.map)),
          y: window.utils.getRandomIntInclusive(window.utils.MAP_PIN_MIN_Y, window.utils.MAP_PIN_MAX_Y)
        },

        offer: {
          title: 'Заголовок объявления',
          address: location.x + ', ' + location.y, // Локация x и y координаты задаются случаным образом
          price: window.utils.getRandomIntInclusive(window.utils.MIN_PRICE, window.utils.MAX_PRICE), // Цена за одну ночь
          type: window.utils.getRandomElement(window.utils.TYPES), // Тип жилья
          rooms: window.utils.getRandomIntInclusive(window.utils.MIN_ROOMS, window.utils.MAX_ROOMS), // Число, количество комнат,
          guests: window.utils.getRandomIntInclusive(window.utils.MIN_GUEST, window.utils.MAX_GUEST), // Число, количество гостей, которое можно разместить,
          checkin: window.utils.getRandomElement(window.utils.CHECKS), // Время выезда - один случайный элемент массива CHECKS
          checkout: window.utils.getRandomElement(window.utils.CHECKS), // Время выезда - один случайный элемент массива CHECKS
          features: window.utils.getRandomArrayElements(window.utils.FEATURES), // Массив строк случайной длины из ниже предложенных(FEATURES)
          description: 'Описание', // Строка с описанием
          photos: window.utils.getRandomArrayElements(window.utils.PHOTOS) // Массив строк случайной длины, содержащий адреса фотографий
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
