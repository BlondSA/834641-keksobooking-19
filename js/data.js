'use strict';

(function () {
  var pinsArr = [];
  var pinTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');
  var ANY_VALUE = 'any';
  var inputTypeHouse = document.querySelector('.map__filters #housing-type');
  var inputPriceHouse = document.querySelector('.map__filters #housing-price');
  var inputRoomsHouse = document.querySelector('.map__filters #housing-rooms');
  var inputGuestsHouse = document.querySelector('.map__filters #housing-guests');
  var inputWifiHouse = document.querySelector('.map__filters #housing-features #filter-wifi');
  var inputDishwasherHouse = document.querySelector('.map__filters #housing-features #filter-dishwasher');
  var inputParkingHouse = document.querySelector('.map__filters #housing-features #filter-parking');
  var inputWasherHouse = document.querySelector('.map__filters #housing-features #filter-washer');
  var inputElevatorHouse = document.querySelector('.map__filters #housing-features #filter-elevator');
  var inputConditionerHouse = document.querySelector('.map__filters #housing-features #filter-conditioner');
  var features = {wifi: 'wifi',
    dishwasher: 'dishwasher',
    parking: 'parking',
    washer: 'washer',
    elevator: 'elevator',
    conditioner: 'conditioner'};
  var OFFER_VALUE_ZERO = 0;
  var OFFER_VALUE_ONE = 1;
  var OFFER_VALUE_TWO = 2;
  var OFFER_VALUE_THREE = 3;
  var MIN_VALUE = 10000;
  var MAX_VALUE = 50000;
  var VALUE_ZERO = '0';
  var VALUE_ONE = '1';
  var VALUE_TWO = '2';
  var VALUE_THREE = '3';


  // Функция создающая массив собранных данных пользователей
  var renderPin = function (element) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = element.location.x + pinElement.offsetWidth / 2 + 'px';
    pinElement.style.top = element.location.y + pinElement.offsetHeight + 'px';
    pinElement.querySelector('img').src = element.author.avatar;
    pinElement.querySelector('img').alt = element.offer.title;
    return pinElement;
  };

  // Фильтр типа жилья
  var houseTypeCheck = function (pins) {
    if (inputTypeHouse.value === ANY_VALUE) {
      return pins;
    }
    return pins.filter(function (pin) {
      return pin.offer.type === inputTypeHouse.value;
    });
  };
  // Фильтр цены жилья
  var housePriceCheck = function (pins) {
    if (inputPriceHouse.value === ANY_VALUE) {
      return pins;
    } else if (inputPriceHouse.value === 'middle') {
      return pins.filter(function (pin) {
        return pin.offer.price <= MAX_VALUE && pin.offer.price >= MIN_VALUE;
      });
    } else if (inputPriceHouse.value === 'low') {
      return pins.filter(function (pin) {
        return pin.offer.price < MIN_VALUE;
      });
    } else if (inputPriceHouse.value === 'high') {
      return pins.filter(function (pin) {
        return pin.offer.price > MAX_VALUE;
      });
    } else {
      return pins;
    }
  };
  // Фильтр кол-ва комнат в жилье
  var houseRoomCheck = function (pins) {
    if (inputRoomsHouse.value === ANY_VALUE) {
      return pins;
    } else if (inputRoomsHouse.value === VALUE_ONE) {
      return pins.filter(function (pin) {
        return pin.offer.rooms === OFFER_VALUE_ONE;
      });
    } else if (inputRoomsHouse.value === VALUE_TWO) {
      return pins.filter(function (pin) {
        return pin.offer.rooms === OFFER_VALUE_TWO;
      });
    } else if (inputRoomsHouse.value === VALUE_THREE) {
      return pins.filter(function (pin) {
        return pin.offer.rooms === OFFER_VALUE_THREE;
      });
    } else {
      return pins;
    }
  };

  // Фильтр изменения
  var houseGuestsCheck = function (pins) {
    if (inputGuestsHouse.value === ANY_VALUE) {
      return pins;
    } else if (inputGuestsHouse.value === VALUE_ONE) {
      return pins.filter(function (pin) {
        return pin.offer.guests === OFFER_VALUE_ONE;
      });
    } else if (inputGuestsHouse.value === VALUE_TWO) {
      return pins.filter(function (pin) {
        return pin.offer.guests === OFFER_VALUE_TWO;
      });
    } else if (inputGuestsHouse.value === VALUE_ZERO) {
      return pins.filter(function (pin) {
        return pin.offer.guests === OFFER_VALUE_ZERO;
      });
    } else {
      return pins;
    }
  };

  // Фильтр опций жилья
  var houseFeaturesCheck = function (element, value, pins) {
    if (element.checked) {
      return pins.filter(function (pin) {
        return pin.offer.features.includes(value);
      });
    } return pins;
  };

  var filterPins = function (pinsData) {
    pinsArr = pinsData.slice();
    pinsArr = houseTypeCheck(pinsArr);
    pinsArr = housePriceCheck(pinsArr);
    pinsArr = houseRoomCheck(pinsArr);
    pinsArr = houseGuestsCheck(pinsArr);
    pinsArr = houseFeaturesCheck(inputWifiHouse, features.wifi, pinsArr);
    pinsArr = houseFeaturesCheck(inputDishwasherHouse, features.dishwasher, pinsArr);
    pinsArr = houseFeaturesCheck(inputParkingHouse, features.parking, pinsArr);
    pinsArr = houseFeaturesCheck(inputWasherHouse, features.washer, pinsArr);
    pinsArr = houseFeaturesCheck(inputElevatorHouse, features.elevator, pinsArr);
    pinsArr = houseFeaturesCheck(inputConditionerHouse, features.conditioner, pinsArr);
    return pinsArr.slice(0, 5);
  };

  var updatePins = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      window.pin.removeMapCard();
    }
    window.map.clearPinsList();
    window.pin.renderPins(filterPins(window.data.pinsFromServer));
  };


  var changeFilterHandler = window.debounce(function () {
    updatePins();
  });

  // Обработчик изменения фильтра удаляющий открытую карточку и генерирующий новый массив с учётом фильтра
  inputTypeHouse.addEventListener('change', changeFilterHandler);
  inputPriceHouse.addEventListener('change', changeFilterHandler);
  inputRoomsHouse.addEventListener('change', changeFilterHandler);
  inputGuestsHouse.addEventListener('change', changeFilterHandler);
  inputWifiHouse.addEventListener('change', changeFilterHandler);
  inputDishwasherHouse.addEventListener('change', changeFilterHandler);
  inputParkingHouse.addEventListener('change', changeFilterHandler);
  inputWasherHouse.addEventListener('change', changeFilterHandler);
  inputElevatorHouse.addEventListener('change', changeFilterHandler);
  inputConditionerHouse.addEventListener('change', changeFilterHandler);


  // В случае успешного выполнения
  var sendSuccesHandler = function (pinsData) {
    window.data.pinsFromServer = pinsData;
    updatePins();
  };

  // В случае ошибки
  var sendErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style =
      'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.data = {
    pinsFromServer: [],
    renderPin: renderPin,
    sendSuccesHandler: sendSuccesHandler,
    sendErrorHandler: sendErrorHandler,
  };
})();
