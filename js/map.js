'use strict';
(function () {
  // Добавляем атрибут disabled для Fieldset-ов
  var formHeader = document.querySelector('.ad-form-header');
  formHeader.setAttribute('disabled', 'disabled');
  var formElement = document.querySelectorAll('.ad-form__element');
  for (var k = 0; k < formElement.length; k++) {
    var formItem = formElement[k];
    formItem.setAttribute('disabled', 'disabled');
  }

  // Функция активации сценария
  var activeForm = function () {
    window.utils.map.classList.remove('map--faded'); // Убираем класс-модификатор map--faded
    document.querySelector('.ad-form').classList.remove('ad-form--disabled'); // Убираем класс-модификатор ad-form--disabled
    window.pin.renderPins(); // Функция создания 8 случайных пинов
    formHeader.removeAttribute('disabled', 'disabled');
    formElement = document.querySelectorAll('.ad-form__element');
    addressPin.value = coordinateMainPinActive();
    for (var j = 0; j < formElement.length; j++) {
      formItem = formElement[j];
      formItem.removeAttribute('disabled', 'disabled');
    }
  };

  // Функция активации карты с пинами по нажатии кнопки Enter
  var pinMain = document.querySelector('.map__pin--main');
  var activePinsMap = function () {
    activeForm();
    pinMain.removeEventListener('mousedown', enabledPinsList);
    pinMain.removeEventListener('keydown', enabledPinsListKeydown);
  };
  var enabledPinsList = function (evt) {
    if (evt.button === window.utils.MOUSE_LEFT_BTN) {
      activePinsMap();
    }
  };
  // Функция активации карты с пинами по нажатии кнопки Enter
  var enabledPinsListKeydown = function (evt) {
    if (evt.keyCode === window.utils.ENTER_BUTTON) {
      activePinsMap();
    }
  };

  // Сенарии
  pinMain.addEventListener('mousedown', enabledPinsList);
  pinMain.addEventListener('keydown', enabledPinsListKeydown);

  // Функция указания адреса главной круглой метки в неактивном состоянии (центр круглой метки)
  var coordinateMainPinInactive = function () {
    var pinMainX =
      Number(parseInt(pinMain.style.left, window.utils.RADIX)) + window.utils.PIN_MAIN_SHIFT_X;
    var pinMainY =
      Number(parseInt(pinMain.style.top, window.utils.RADIX)) + window.utils.PIN_MAIN_SHIFT_Y;
    return pinMainX + ', ' + pinMainY;
  };

  // Функция указания адреса главной круглой метки в неактивном состоянии (центр круглой метки)
  var coordinateMainPinActive = function () {
    var pinMainX =
      Number(parseInt(pinMain.style.left, window.utils.RADIX)) + window.utils.PIN_MAIN_SHIFT_X;
    var pinMainY =
      Number(parseInt(pinMain.style.top, window.utils.RADIX)) +
      window.utils.PIN_MAIN_HEIGHT +
      window.utils.PIN_MAIN_POINT_SHIFT_Y;
    return pinMainX + ', ' + pinMainY;
  };
  // Заполнение адрессной строки по умолчанию (в неактивном состоянии)
  var addressPin = document.querySelector('#address');
  addressPin.value = coordinateMainPinInactive();
})();
