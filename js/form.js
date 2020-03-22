'use strict';
(function () {
  // Валидация формы ввода

  // Валидация кол-ва человек в зависимости от кол-ва комнат
  var addForm = document.querySelector('.ad-form');
  var roomQuantityInput = addForm.querySelector('#room_number');
  var guestQuantityInput = addForm.querySelector('#capacity');
  var timeInInput = addForm.querySelector('#timein');
  var timeOutInput = addForm.querySelector('#timeout');
  var typeHousing = document.querySelector('#type');
  var costHousing = document.querySelector('#price');
  var PriceHouse = {MIN: 1000, MID: 5000, MAX: 10000};
  var inputValidationValue = {zero: '0', one: '1', two: '2', three: '3', hundred: '100'};
  var RADIX = 10;

  addForm.addEventListener('change', function () {
    if (
      (roomQuantityInput.value === inputValidationValue.one && guestQuantityInput.value === inputValidationValue.two) ||
      (roomQuantityInput.value === inputValidationValue.one && guestQuantityInput.value === inputValidationValue.three) ||
      (roomQuantityInput.value === inputValidationValue.one && guestQuantityInput.value === inputValidationValue.zero)
    ) {
      guestQuantityInput.setCustomValidity('Только одно спальное место!');
    } else if (
      roomQuantityInput.value === inputValidationValue.one &&
      guestQuantityInput.value === inputValidationValue.one
    ) {
      guestQuantityInput.setCustomValidity('');
    }

    if (
      (roomQuantityInput.value === inputValidationValue.two && guestQuantityInput.value === inputValidationValue.three) ||
      (roomQuantityInput.value === inputValidationValue.two && guestQuantityInput.value === inputValidationValue.zero)
    ) {
      guestQuantityInput.setCustomValidity('Только два спальных места!');
    } else if (
      (roomQuantityInput.value === inputValidationValue.two && guestQuantityInput.value === inputValidationValue.two) ||
      (roomQuantityInput.value === inputValidationValue.two && guestQuantityInput.value === inputValidationValue.one)
    ) {
      guestQuantityInput.setCustomValidity('');
    }

    if (roomQuantityInput.value === inputValidationValue.three && guestQuantityInput.value === inputValidationValue.zero) {
      guestQuantityInput.setCustomValidity('Только три спальных места!');
    } else if (
      (roomQuantityInput.value === inputValidationValue.three && guestQuantityInput.value === inputValidationValue.three) ||
      (roomQuantityInput.value === inputValidationValue.three && guestQuantityInput.value === inputValidationValue.two) ||
      (roomQuantityInput.value === inputValidationValue.three && guestQuantityInput.value === inputValidationValue.one)
    ) {
      guestQuantityInput.setCustomValidity('');
    }

    if (
      (roomQuantityInput.value === inputValidationValue.hundred && guestQuantityInput.value === inputValidationValue.three) ||
      (roomQuantityInput.value === inputValidationValue.hundred && guestQuantityInput.value === inputValidationValue.two) ||
      (roomQuantityInput.value === inputValidationValue.hundred && guestQuantityInput.value === inputValidationValue.one)
    ) {
      guestQuantityInput.setCustomValidity('Нежилое помещение');
    } else if (
      roomQuantityInput.value === inputValidationValue.hundred &&
      guestQuantityInput.value === inputValidationValue.zero
    ) {
      guestQuantityInput.setCustomValidity('');
    }
  });

  // Валидация времени въезда и времени выезда

  addForm.addEventListener('change', function () {
    if (parseInt(timeInInput.value, RADIX) !== parseInt(timeOutInput.value, RADIX)) {
      timeOutInput.setCustomValidity(
          'Время заселения должно совпадать с временем выезда'
      );
    } else {
      timeOutInput.setCustomValidity('');
    }
  });

  // Валидация типа жилья и цены
  var selectChangeHandler = function () {
    if (typeHousing.value === 'bungalo') {
      costHousing.setAttribute('min', '0');
      costHousing.setAttribute('placeholder', '0');
    } else if (typeHousing.value === 'flat') {
      costHousing.setAttribute('min', '1000');
      costHousing.setAttribute('placeholder', '1000');
      if (costHousing.value < PriceHouse.MIN) {
        costHousing.setCustomValidity('Минимальная цена за квартиру 1000');
      } else {
        costHousing.setCustomValidity('');
      }
    } else if (typeHousing.value === 'house') {
      costHousing.setAttribute('min', '5000');
      costHousing.setAttribute('placeholder', '5000');
      if (costHousing.value < PriceHouse.MID) {
        costHousing.setCustomValidity('Минимальная цена за дом 5000');
      } else {
        costHousing.setCustomValidity('');
      }
    } else if (typeHousing.value === 'palace') {
      costHousing.setAttribute('min', '10000');
      costHousing.setAttribute('placeholder', '10000');
      if (costHousing.value < PriceHouse.MAX) {
        costHousing.setCustomValidity('Минимальная цена за дворец 10000');
      } else {
        costHousing.setCustomValidity('');
      }
    }
  };
  typeHousing.addEventListener('change', selectChangeHandler);
  costHousing.addEventListener('change', selectChangeHandler);
})();
