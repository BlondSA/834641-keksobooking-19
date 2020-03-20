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
  var renderPins = function (pinsData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsData.length; i++) {
      var currentPin = window.data.renderPin(pinsData[i]);
      (function () {
        var pinData = pinsData[i];
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
  window.pin = {
    removeMapCard: removeMapCard,
    renderPins: renderPins,
  };
})();
