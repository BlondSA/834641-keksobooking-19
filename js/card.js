'use strict';
(function () {
  var TypesHouse = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var map = document.querySelector('.map');
  var cardTemplate = document
    .querySelector('#card')
    .content.querySelector('.map__card');

  // module3-task3

  var createNewPhotos = function (photos, photosContainer) {
    if (photos.length === 0) {
      photosContainer.style.display = 'none';
    } else {
      for (var i = 0; i < photos.length; i++) {
        var newPopupPhoto = document.createElement('img');
        newPopupPhoto.className = 'popup__photo';
        newPopupPhoto.src = photos[i];
        newPopupPhoto.width = '45';
        newPopupPhoto.height = '40';
        newPopupPhoto.alt = 'Фотография жилья';
        photosContainer.appendChild(newPopupPhoto);
      }
    }
  };

  var createNewFeatures = function (features, featuresContainer) {
    if (features.length === 0) {
      featuresContainer.style.display = 'none';
    } else {
      for (var i = 0; i < features.length; i++) {
        var newPopupFeature = document.createElement('li');
        newPopupFeature.className =
          'popup__feature popup__feature--' + features[i];
        featuresContainer.appendChild(newPopupFeature);
      }
    }
  };

  var renderCard = function (element) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupFeatures = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__avatar').src = element.author.avatar;
    cardElement.querySelector('.popup__title').textContent = element.offer.title;
    cardElement.querySelector('.popup__text--address').textContent =
    element.location.x - window.utils.MAP_SHIFT_PIN_X + ', ' + element.location.y;
    cardElement.querySelector('.popup__text--price').textContent =
      element.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent =
    TypesHouse[element.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent =
      element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__description').textContent =
      element.offer.description;
    cardElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' +
      element.offer.checkin +
      ', выезд до ' +
      element.offer.checkin +
      '.'; // checkin сделал один, т.к. в ТЗ сказано что время въезда равно выремя выезда
    cardElement.querySelector('.popup__features').innerText = '';
    createNewFeatures(element.offer.features, popupFeatures);
    cardElement.querySelector('.popup__photos').innerText = '';
    createNewPhotos(element.offer.photos, popupPhotos);
    return cardElement;
  };

  // Функция вызова и вставки сгенерированной карточки до элемента с классом map__filters-container
  var cardCreate = function (pinData) {
    var card = renderCard(pinData);
    var mapFiltersContainer = map.querySelector('.map__filters-container');
    map.insertBefore(card, mapFiltersContainer);
  };
  window.card = {
    cardCreate: cardCreate,
  };
})();
