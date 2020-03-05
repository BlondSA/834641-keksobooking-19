'use strict';
(function () {
  // Валидация формы ввода

  // Валидация кол-ва человек в зависимости от кол-ва комнат
  var addForm = document.querySelector('.ad-form');
  var roomQuantityInput = addForm.querySelector('#room_number');
  var guestQuantityInput = addForm.querySelector('#capacity');

  addForm.addEventListener('change', function () {
    if (
      (roomQuantityInput.value === '1' && guestQuantityInput.value === '2') ||
      (roomQuantityInput.value === '1' && guestQuantityInput.value === '3') ||
      (roomQuantityInput.value === '1' && guestQuantityInput.value === '0')
    ) {
      guestQuantityInput.setCustomValidity('Только одно спальное место!');
    } else if (
      roomQuantityInput.value === '1' &&
      guestQuantityInput.value === '1'
    ) {
      guestQuantityInput.setCustomValidity('');
    }

    if (
      (roomQuantityInput.value === '2' && guestQuantityInput.value === '3') ||
      (roomQuantityInput.value === '2' && guestQuantityInput.value === '0')
    ) {
      guestQuantityInput.setCustomValidity('Только два спальных места!');
    } else if (
      (roomQuantityInput.value === '2' && guestQuantityInput.value === '2') ||
      (roomQuantityInput.value === '2' && guestQuantityInput.value === '1')
    ) {
      guestQuantityInput.setCustomValidity('');
    }

    if (roomQuantityInput.value === '3' && guestQuantityInput.value === '0') {
      guestQuantityInput.setCustomValidity('Только три спальных места!');
    } else if (
      (roomQuantityInput.value === '3' && guestQuantityInput.value === '3') ||
      (roomQuantityInput.value === '3' && guestQuantityInput.value === '2') ||
      (roomQuantityInput.value === '3' && guestQuantityInput.value === '1')
    ) {
      guestQuantityInput.setCustomValidity('');
    }

    if (
      (roomQuantityInput.value === '100' && guestQuantityInput.value === '3') ||
      (roomQuantityInput.value === '100' && guestQuantityInput.value === '2') ||
      (roomQuantityInput.value === '100' && guestQuantityInput.value === '1')
    ) {
      guestQuantityInput.setCustomValidity('Нежилое помещение');
    } else if (
      roomQuantityInput.value === '100' &&
      guestQuantityInput.value === '0'
    ) {
      guestQuantityInput.setCustomValidity('');
    }
  });

  // Валидация времени въезда и времени выезда
  var timeInInput = addForm.querySelector('#timein');
  var timeOutInput = addForm.querySelector('#timeout');

  addForm.addEventListener('change', function () {
    if (parseInt(timeInInput.value, 10) !== parseInt(timeOutInput.value, 10)) {
      timeOutInput.setCustomValidity(
          'Время заселения должно совпадать с временем выезда'
      );
    } else {
      timeOutInput.setCustomValidity('');
    }
  });

  // Валидация типа жилья и цены
  var typeHousing = document.querySelector('#type');
  var costHousing = document.querySelector('#price');
  var selectChangeHandler = function () {
    if (typeHousing.value === 'bungalo') {
      costHousing.setAttribute('min', '0');
      costHousing.setAttribute('placeholder', '0');
    } else if (typeHousing.value === 'flat') {
      costHousing.setAttribute('min', '1000');
      costHousing.setAttribute('placeholder', '1000');
      if (costHousing.value < 1000) {
        costHousing.setCustomValidity('Минимальная цена за квартиру 1000');
      } else {
        costHousing.setCustomValidity('');
      }
    } else if (typeHousing.value === 'house') {
      costHousing.setAttribute('min', '5000');
      costHousing.setAttribute('placeholder', '5000');
      if (costHousing.value < 5000) {
        costHousing.setCustomValidity('Минимальная цена за дом 5000');
      } else {
        costHousing.setCustomValidity('');
      }
    } else if (typeHousing.value === 'palace') {
      costHousing.setAttribute('min', '10000');
      costHousing.setAttribute('placeholder', '10000');
      if (costHousing.value < 10000) {
        costHousing.setCustomValidity('Минимальная цена за дворец 10000');
      } else {
        costHousing.setCustomValidity('');
      }
    }
  };
  typeHousing.addEventListener('change', selectChangeHandler);
  costHousing.addEventListener('change', selectChangeHandler);
})();
