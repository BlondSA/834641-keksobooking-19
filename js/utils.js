'use strict';

(function () {
  var MAP_SHIFT_PIN_X = 25; // Смещение пина по оси X
  var ENTER_BUTTON = 13;
  var ESC_BUTTON = 27;
  var MOUSE_LEFT_BTN = 0;

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
    MAP_SHIFT_PIN_X: MAP_SHIFT_PIN_X,
    ENTER_BUTTON: ENTER_BUTTON,
    ESC_BUTTON: ESC_BUTTON,
    MOUSE_LEFT_BTN: MOUSE_LEFT_BTN,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomElement: getRandomElement,
    getRandomArrayElements: getRandomArrayElements,
    getElementWidth: getElementWidth,
  };
})();
