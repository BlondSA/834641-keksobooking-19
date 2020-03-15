'use strict';
(function () {
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

  // В случае успешного выполнения
  var sendSuccesHandler = function (pinsData) {
    window.pin.renderPins(pinsData);
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
    renderPin: renderPin,
    sendSuccesHandler: sendSuccesHandler,
    sendErrorHandler: sendErrorHandler
  };
})();
