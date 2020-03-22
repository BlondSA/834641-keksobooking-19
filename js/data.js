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
  var timeType;
  var timePrice;
  var timeRooms;
  var timeGuests;
  var timeWifi;
  var timeDishwasher;
  var timeParking;
  var timeWasher;
  var timeElevator;
  var timeConditioner;

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
        return pin.offer.price <= 50000 && pin.offer.price >= 10000;
      });
    } else if (inputPriceHouse.value === 'low') {
      return pins.filter(function (pin) {
        return pin.offer.price < 10000;
      });
    } else if (inputPriceHouse.value === 'high') {
      return pins.filter(function (pin) {
        return pin.offer.price > 50000;
      });
    } else {
      return pins;
    }
  };

  // Фильтр кол-ва комнат в жилье
  var houseRoomCheck = function (pins) {
    if (inputRoomsHouse.value === ANY_VALUE) {
      return pins;
    } else if (inputRoomsHouse.value === '1') {
      return pins.filter(function (pin) {
        return pin.offer.rooms === 1;
      });
    } else if (inputRoomsHouse.value === '2') {
      return pins.filter(function (pin) {
        return pin.offer.rooms === 2;
      });
    } else if (inputRoomsHouse.value === '3') {
      return pins.filter(function (pin) {
        return pin.offer.rooms === 3;
      });
    } else {
      return pins;
    }
  };

  // Фильтр изменения
  var houseGuestsCheck = function (pins) {
    if (inputGuestsHouse.value === ANY_VALUE) {
      return pins;
    } else if (inputGuestsHouse.value === '1') {
      return pins.filter(function (pin) {
        return pin.offer.guests === 1;
      });
    } else if (inputGuestsHouse.value === '2') {
      return pins.filter(function (pin) {
        return pin.offer.guests === 2;
      });
    } else if (inputGuestsHouse.value === '0') {
      return pins.filter(function (pin) {
        return pin.offer.guests === 0;
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

  // Обработчик изменения типа помещения удаляющий открытую карточку и генерирующий новый массив с учётом фильтра

  inputTypeHouse.addEventListener('change', window.debounce(function (element) {
    timeType = element;
    updatePins();
  }));

  inputPriceHouse.addEventListener('change', window.debounce(function (element) {
    timePrice = element;
    updatePins();
  }));

  inputRoomsHouse.addEventListener('change', window.debounce(function (element) {
    timeRooms = element;
    updatePins();
  }));

  inputGuestsHouse.addEventListener('change', window.debounce(function (element) {
    timeGuests = element;
    updatePins();
  }));

  inputWifiHouse.addEventListener('change', window.debounce(function (element) {
    timeWifi = element;
    updatePins();
  }));

  inputDishwasherHouse.addEventListener('change', window.debounce(function (element) {
    timeDishwasher = element;
    updatePins();
  }));
  inputParkingHouse.addEventListener('change', window.debounce(function (element) {
    timeParking = element;
    updatePins();
  }));
  inputWasherHouse.addEventListener('change', window.debounce(function (element) {
    timeWasher = element;
    updatePins();
  }));
  inputElevatorHouse.addEventListener('change', window.debounce(function (element) {
    timeElevator = element;
    updatePins();
  }));
  inputConditionerHouse.addEventListener('change', window.debounce(function (element) {
    timeConditioner = element;
    updatePins();
  }));


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
