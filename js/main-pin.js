'use strict';
(function () {
  var MAP_PIN_MIN_Y = 130;
  var MAP_PIN_MAX_Y = 630;
  var MAP_PIN_MIN_X = 0;
  var MAP_PIN_MAX_X = 1200;
  var PIN_MAIN_WIDTH = 62; // Ширина главной метки
  var PIN_MAIN_SHIFT_X = PIN_MAIN_WIDTH / 2; // Смещение круглого главного пина по оси X до центра метки
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
        var CoordY = 0;
        if (mainPinMouseDownHandler.offsetTop - shift.y > MAP_PIN_MAX_Y) {
          CoordY = MAP_PIN_MAX_Y;
        } else if (
          mainPinMouseDownHandler.offsetTop - shift.y <
          MAP_PIN_MIN_Y
        ) {
          CoordY = MAP_PIN_MIN_Y;
        } else {
          CoordY = mainPinMouseDownHandler.offsetTop - shift.y;
        }
        return CoordY;
      };
      // Функция нахождения координаты по оси X
      var coordsX = function () {
        var CoordX = 0;
        if (mainPinMouseDownHandler.offsetLeft - shift.x > MAP_PIN_MAX_X - PIN_MAIN_SHIFT_X) {
          CoordX = MAP_PIN_MAX_X - PIN_MAIN_SHIFT_X;
        } else if (
          mainPinMouseDownHandler.offsetLeft - shift.x <
          MAP_PIN_MIN_X - PIN_MAIN_SHIFT_X
        ) {
          CoordX = MAP_PIN_MIN_X - PIN_MAIN_SHIFT_X;
        } else {
          CoordX = mainPinMouseDownHandler.offsetLeft - shift.x;
        }
        return CoordX;
      };

      mainPinMouseDownHandler.style.top = coordsY() + 'px';
      mainPinMouseDownHandler.style.left = coordsX() + 'px';
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
