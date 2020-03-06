'use strict';
(function () {
  var MAP_PIN_MIN_Y = 130;
  var MAP_PIN_MAX_Y = 630;
  var MAP_PIN_MIN_X = 0;
  var MAP_PIN_MAX_X = 1200;
  var PIN_MAIN_WIDTH = 62; // Ширина главной метки
  var PIN_MAIN_SHIFT_X = PIN_MAIN_WIDTH / 2; // Смещение круглого главного пина по оси X до центра метки
  var RADIX = 10;
  var PIN_MAIN_HEIGHT = 62; // Высота главной метки
  var PIN_MAIN_POINT_SHIFT_Y = 20; // (высота острия метки) Смещение по оси Y до точки острого конца метки

  var pinMain = document.querySelector('.map__pin--main');
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // Функция нахождения координаты по оси Y
      var getCoordsY = function () {
        var coordY = 0;
        var offsetStartPositionY = pinMain.offsetTop - shift.y;
        if (offsetStartPositionY > MAP_PIN_MAX_Y) {
          coordY = MAP_PIN_MAX_Y;
        } else if (
          offsetStartPositionY <
          MAP_PIN_MIN_Y
        ) {
          coordY = MAP_PIN_MIN_Y;
        } else {
          coordY = offsetStartPositionY;
        }
        return coordY;
      };
      // Функция нахождения координаты по оси X
      var getCoordsX = function () {
        var coordX = 0;
        var offsetStartPositionX = pinMain.offsetLeft - shift.x;
        if (
          offsetStartPositionX >
          MAP_PIN_MAX_X - PIN_MAIN_SHIFT_X
        ) {
          coordX = MAP_PIN_MAX_X - PIN_MAIN_SHIFT_X;
        } else if (offsetStartPositionX < MAP_PIN_MIN_X - PIN_MAIN_SHIFT_X) {
          coordX = MAP_PIN_MIN_X - PIN_MAIN_SHIFT_X;
        } else {
          coordX = offsetStartPositionX;
        }
        return coordX;
      };
      pinMain.style.top = getCoordsY() + 'px';
      pinMain.style.left = getCoordsX() + 'px';
      // Функция указания адреса главной метки в активном состоянии (острая часть пина)
      var coordinateMainPinActive = function () {
        var pinMainX =
          parseInt(pinMain.style.left, RADIX) + PIN_MAIN_SHIFT_X;
        var pinMainY =
          parseInt(pinMain.style.top, RADIX) + PIN_MAIN_HEIGHT + PIN_MAIN_POINT_SHIFT_Y;
        return pinMainX + ', ' + pinMainY;
      };
      // Заполнение адрессной строки по умолчанию (в активном состоянии, при перетаскивании метки)
      var addressPin = document.querySelector('#address');
      addressPin.value = coordinateMainPinActive();
    };
    var mainPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };
    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  });
})();
