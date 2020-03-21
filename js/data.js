'use strict';

(function () {
  var pinsArr = [];
  var pinTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');

  // Функция создающая массив собранных данных пользователей

  var renderPin = function (element) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = element.location.x + pinElement.offsetWidth / 2 + 'px';
    pinElement.style.top = element.location.y + pinElement.offsetHeight + 'px';
    pinElement.querySelector('img').src = element.author.avatar;
    pinElement.querySelector('img').alt = element.offer.title;
    return pinElement;
  };

  // Фильтр изменения типа жилья
  var anyValue = 'any';
  var inputTypeHouse = document.querySelector('.map__filters #housing-type');

  var houseTypeCheck = function (pins) {
    if (inputTypeHouse.value === anyValue) {
      return pins;
    }
    return pins.filter(function (pin) {
      return pin.offer.type === inputTypeHouse.value;
    });
  };

  var filterPins = function (pinsData) {
    pinsArr = pinsData.slice();
    pinsArr = houseTypeCheck(pinsArr);
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
  inputTypeHouse.addEventListener('change', function () {
    updatePins();
  });

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
