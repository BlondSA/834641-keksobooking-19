'use strict';

(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKS = ['12:00', '13:00', '14:00']; // Массив один для заселения и выезда один, т.к. время въезда = время выезда и наоборот
  var MIN_PRICE = 0;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 100;
  var MIN_GUEST = 1;
  var MAX_GUEST = 3;
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var NUMBER_PINS = 8; // Кол-во вариантов жилья
  var MAP_PIN_MIN_Y = 130;
  var MAP_PIN_MAX_Y = 630;
  var MAP_PIN_MIN_X = 0;
  var MAP_SHIFT_PIN_X = 25; // Смещение пина по оси X
  var PIN_MAIN_WIDTH = 62; // Ширина главной метки
  var PIN_MAIN_HEIGHT = 62; // Высота главной метки
  var PIN_MAIN_SHIFT_X = PIN_MAIN_WIDTH / 2; // Смещение круглого главного пина по оси X до центра метки
  var PIN_MAIN_SHIFT_Y = PIN_MAIN_HEIGHT / 2; // Смещение круглого главного пина по оси Y до центра метки
  var PIN_MAIN_POINT_SHIFT_Y = 20; // (высота острия метки) Смещение по оси Y до точки острого конца метки
  var RADIX = 10;
  var TypesHouse = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var ENTER_BUTTON = 13;
  var ESC_BUTTON = 27;
  var MOUSE_LEFT_BTN = 0;
  var map = document.querySelector('.map');
  var setPinElement = document.querySelector('.map__pins');

  // Функция возвращающая случайное число от min до max (Максимум и минимум включаются)
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция выбора случайного элемента из массива
  var getRandomElement = function (array) {
    return array[getRandomIntInclusive(0, array.length - 1)];
  };

  // Функция возвращающая в массив случайное кол-во элементов другого массива
  var getRandomArrayElements = function (array) {
    var arrayCopy = array.slice(0, array.length);
    var numberElements = getRandomIntInclusive(1, arrayCopy.length);
    var getElements = [];

    for (var i = 0; i < numberElements; i++) {
      var arrayRandomIndex = getRandomIntInclusive(0, arrayCopy.length - 1);
      getElements.push(arrayCopy.splice(arrayRandomIndex, 1)[0]);
    }
    return getElements;
  };

  // Поиск ширины элемента DOM-а
  var getElementWidth = function (element) {
    return element.offsetWidth;
  };
  window.utils = {
    TYPES: TYPES,
    CHECKS: CHECKS,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_GUEST: MIN_GUEST,
    MAX_GUEST: MAX_GUEST,
    FEATURES: FEATURES,
    PHOTOS: PHOTOS,
    NUMBER_PINS: NUMBER_PINS,
    MAP_PIN_MIN_Y: MAP_PIN_MIN_Y,
    MAP_PIN_MAX_Y: MAP_PIN_MAX_Y,
    MAP_PIN_MIN_X: MAP_PIN_MIN_X,
    MAP_SHIFT_PIN_X: MAP_SHIFT_PIN_X,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_SHIFT_X: PIN_MAIN_SHIFT_X,
    PIN_MAIN_SHIFT_Y: PIN_MAIN_SHIFT_Y,
    PIN_MAIN_POINT_SHIFT_Y: PIN_MAIN_POINT_SHIFT_Y,
    RADIX: RADIX,
    TypesHouse: TypesHouse,
    ENTER_BUTTON: ENTER_BUTTON,
    ESC_BUTTON: ESC_BUTTON,
    MOUSE_LEFT_BTN: MOUSE_LEFT_BTN,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomElement: getRandomElement,
    getRandomArrayElements: getRandomArrayElements,
    map: map,
    setPinElement: setPinElement,
    getElementWidth: getElementWidth,
  };
})();
