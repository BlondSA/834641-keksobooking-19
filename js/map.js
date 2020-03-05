'use strict';
(function () {
  var PIN_MAIN_WIDTH = 62; // Ширина главной метки
  var PIN_MAIN_HEIGHT = 62; // Высота главной метки
  var PIN_MAIN_SHIFT_X = PIN_MAIN_WIDTH / 2; // Смещение круглого главного пина по оси X до центра метки
  var PIN_MAIN_SHIFT_Y = PIN_MAIN_HEIGHT / 2; // Смещение круглого главного пина по оси Y до центра метки
  var PIN_MAIN_POINT_SHIFT_Y = 20; // (высота острия метки) Смещение по оси Y до точки острого конца метки
  var RADIX = 10;
  var map = document.querySelector('.map');
  var formHeader = document.querySelector('.ad-form-header');
  var formElement = document.querySelectorAll('.ad-form__element');


  // Добавляем атрибут disabled для Fieldset-ов
  var deactivateForm = function () {
    formHeader.setAttribute('disabled', 'disabled');
    for (var k = 0; k < formElement.length; k++) {
      var formItem = formElement[k];
      formItem.setAttribute('disabled', 'disabled');
    }
  };
  deactivateForm();

  // Функция активации сценария
  var activeForm = function () {
    map.classList.remove('map--faded'); // Убираем класс-модификатор map--faded
    document.querySelector('.ad-form').classList.remove('ad-form--disabled'); // Убираем класс-модификатор ad-form--disabled
    window.pin.renderPins(); // Функция создания 8 случайных пинов
    formHeader.removeAttribute('disabled', 'disabled');
    formElement = document.querySelectorAll('.ad-form__element');
    addressPin.value = coordinateMainPinActive();
    for (var j = 0; j < formElement.length; j++) {
      var formItem = formElement[j];
      formItem.removeAttribute('disabled', 'disabled');
    }
  };

  // Функция активации карты с пинами по нажатии кнопки Enter
  var pinMain = document.querySelector('.map__pin--main');
  var activePinsMap = function () {
    activeForm();
    pinMain.removeEventListener('mousedown', pinsMouseHandler);
    pinMain.removeEventListener('keydown', pinsKeydownHandler);
  };
  var pinsMouseHandler = function (evt) {
    if (evt.button === window.utils.MOUSE_LEFT_BTN) {
      activePinsMap();
    }
  };
  // Функция активации карты с пинами по нажатии кнопки Enter
  var pinsKeydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ENTER_BUTTON) {
      activePinsMap();
    }
  };

  // Сенарии
  pinMain.addEventListener('mousedown', pinsMouseHandler);
  pinMain.addEventListener('keydown', pinsKeydownHandler);

  // Функция указания адреса главной круглой метки в неактивном состоянии (центр круглой метки)
  var coordinateMainPinInactive = function () {
    var pinMainX =
      Number(parseInt(pinMain.style.left, RADIX)) + PIN_MAIN_SHIFT_X;
    var pinMainY =
      Number(parseInt(pinMain.style.top, RADIX)) + PIN_MAIN_SHIFT_Y;
    return pinMainX + ', ' + pinMainY;
  };

  // Функция указания адреса главной круглой метки в неактивном состоянии (центр круглой метки)
  var coordinateMainPinActive = function () {
    var pinMainX = parseInt(pinMain.style.left, RADIX) + PIN_MAIN_SHIFT_X;
    var pinMainY = parseInt(pinMain.style.top, RADIX) +
      PIN_MAIN_HEIGHT +
      PIN_MAIN_POINT_SHIFT_Y;
    return pinMainX + ', ' + pinMainY;
  };
  // Заполнение адрессной строки по умолчанию (в неактивном состоянии)
  var addressPin = document.querySelector('#address');
  addressPin.value = coordinateMainPinInactive();
})();
