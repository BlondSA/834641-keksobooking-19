'use strict';
(function () {
  var setPinElement = document.querySelector('.map__pins');
  // Функция удаляющая обработчик клика на кнопку заркрыть и кнопки ESC, удаляющая карточку для Пина
  var removeMapCard = function () {
    document
      .querySelector('.popup__close')
      .removeEventListener('click', closePopupHandler);
    document.removeEventListener('keydown', closePopupHandler);
    document.querySelector('.map__card').remove();
  };
  var closePopupHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_BUTTON) {
      removeMapCard();
    }
  };

  // Цикл создания пинов на карте
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.pinsData.length; i++) {
      var currentPin = window.data.renderPin(window.data.pinsData[i]);
      (function () {
        var pinData = window.data.pinsData[i];
        // Функция добавляющая Карточку пина, добавляющая обработчик клика на кнопку заркрыть и кнопки ESC
        var createPopup = function () {
          window.card.cardCreate(pinData);
          document
            .querySelector('.popup__close')
            .addEventListener('click', function () {
              removeMapCard();
            });
          document.addEventListener('keydown', closePopupHandler);
        };
        // Обработчик клика на Pin
        currentPin.addEventListener('click', function () {
          var mapCard = document.querySelector('.map__card');
          // Добавяляем условие сравнения, есть ли у нас элемент с классом .map__card
          // Если он уже существует, то мы должны его удалить, а затем создать новый
          // В противном случае мы его просто создаем
          if (mapCard) {
            removeMapCard(); // Удаляем старую карточку
          }
          createPopup(); // Добавляем новую карточку}
        });
      })();
      fragment.appendChild(currentPin);
    }
    setPinElement.appendChild(fragment);
  };

  // В случае успешного выполнения
  var sendSuccesHandler = (function (element) {
    var pins = renderPins(element);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.backend.renderPin(i));
    }
    setPinElement.appendChild(fragment);
  });

  // В случае ошибки
  var sendErrorHendler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.upload(sendSuccesHandler, sendErrorHendler);

  window.pin = {
    renderPins: renderPins,
  };
})();
