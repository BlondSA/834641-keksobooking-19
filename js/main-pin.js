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

  var mainPinMouseDownHandler = document.querySelector('.map__pin--main');
  mainPinMouseDownHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // Функция нахождения координаты по оси Y
      var coordsY = function () {
        var coordY = 0;
        if (mainPinMouseDownHandler.offsetTop - shift.y > MAP_PIN_MAX_Y) {
          coordY = MAP_PIN_MAX_Y;
        } else if (
          mainPinMouseDownHandler.offsetTop - shift.y <
          MAP_PIN_MIN_Y
        ) {
          coordY = MAP_PIN_MIN_Y;
        } else {
          coordY = mainPinMouseDownHandler.offsetTop - shift.y;
        }
        return coordY;
      };
      // Функция нахождения координаты по оси X
      var coordsX = function () {
        var coordX = 0;
        if (
          mainPinMouseDownHandler.offsetLeft - shift.x >
          MAP_PIN_MAX_X - PIN_MAIN_SHIFT_X
        ) {
          coordX = MAP_PIN_MAX_X - PIN_MAIN_SHIFT_X;
        } else if (
          mainPinMouseDownHandler.offsetLeft - shift.x <
          MAP_PIN_MIN_X - PIN_MAIN_SHIFT_X
        ) {
          coordX = MAP_PIN_MIN_X - PIN_MAIN_SHIFT_X;
        } else {
          coordX = mainPinMouseDownHandler.offsetLeft - shift.x;
        }
        return coordX;
      };
      mainPinMouseDownHandler.style.top = coordsY() + 'px';
      mainPinMouseDownHandler.style.left = coordsX() + 'px';
      // Функция указания адреса главной метки в активном состоянии (острая часть пина)
      var coordinateMainPinActive = function () {
        var pinMainX = parseInt(mainPinMouseDownHandler.style.left, RADIX) + PIN_MAIN_SHIFT_X;
        var pinMainY =
          parseInt(mainPinMouseDownHandler.style.top, RADIX) +
          PIN_MAIN_HEIGHT +
          PIN_MAIN_POINT_SHIFT_Y;
        return pinMainX + ', ' + pinMainY;
      };
      // Заполнение адрессной строки по умолчанию (в неактивном состоянии)
      var addressPin = document.querySelector('#address');
      addressPin.value = coordinateMainPinActive();
    };
    var mainPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
      if (dragged) {
        var mainPinMouseDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          mainPinMouseDownHandler.removeEventListener(
              'click',
              mainPinMouseDefaultHandler
          );
        };
        mainPinMouseDownHandler.addEventListener(
            'click',
            mainPinMouseDefaultHandler
        );
      }
    };
    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  });
})();
