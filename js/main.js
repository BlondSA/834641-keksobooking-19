'use strict';

var map = document.querySelector('.map');

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKS = ['12:00', '13:00', '14:00']; // Массив один для заселения и выезда один, т.к. время въезда = время выезда и наоборот
var MIN_PRICE = 0;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 100;
var MIN_GUEST = 1;
var MAX_GUEST = 3;
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var NUMBER_PINS = 8; // Кол-во вариантов жилья
var MAP_PIN_MIN_Y = 130;
var MAP_PIN_MAX_Y = 630;
var MAP_PIN_MIN_X = 0;
var MAP_SHIFT_PIN_X = 25; // Смещение пина по оси X
var PIN_MAIN_WIDTH = 62; // Ширина главной метки
var PIN_MAIN_HEIGHT = 62; // Высота главной метки
var PIN_MAIN_SHIFT_X = PIN_MAIN_WIDTH / 2; // Смещение круглого главного пина по оси X до центра метки
var PIN_MAIN_SHIFT_Y = PIN_MAIN_HEIGHT / 2; // Смещение круглого главного пина по оси Y до центра метки
var PIN_MAIN_POINT_SHIFT_Y = 20; // (высота острия метки) Смещение по оси Y до точки острого конца метки
var RADIX = 10;
var MAP = document.querySelector('.map');
var setPinElement = document.querySelector('.map__pins');
var TypesHouse = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var ENTER_BUTTON = 13;
// var ESC_BUTTON = 27;
var MOUSE_LEFT_BTN = 0;
var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

// Функция возвращающая случайное число от min до max (Максимум и минимум включаются)
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция выбора случайного элемента из массива
var getRandomElement = function (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

// Функция возвращающая в массив случайное кол-во элементов другого массива
var getRandomArrayElements = function (array) {
  var arrayCopy = array.slice(0, array.length);
  var numberElements = getRandomIntInclusive(1, arrayCopy.length);
  var getElements = [];

  for (var i = 0; i < numberElements; i++) {
    var arrayRandomIndex = getRandomIntInclusive(0, arrayCopy.length - 1);
    getElements.push(arrayCopy.splice(arrayRandomIndex, 1)[0]);
  }
  return getElements;
};

// Поиск ширины элемента DOM-а
var getElementWidth = function (element) {
  return element.offsetWidth;
};

// Создание массива с данными пользователя
var createUserData = function () {
  var pinData = [];
  var location = {
    x: getRandomIntInclusive(MAP_PIN_MIN_X, getElementWidth(MAP)),
    y: getRandomIntInclusive(MAP_PIN_MIN_Y, MAP_PIN_MAX_Y)
  };
  for (var i = 0; i < NUMBER_PINS; i++) {
    pinData.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      location: {
        x: getRandomIntInclusive(MAP_PIN_MIN_X, getElementWidth(MAP)),
        y: getRandomIntInclusive(MAP_PIN_MIN_Y, MAP_PIN_MAX_Y)
      },

      offer: {
        title: 'Заголовок объявления',
        address: location.x + ', ' + location.y, // Локация x и y координаты задаются случаным образом
        price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE), // Цена за одну ночь
        type: getRandomElement(TYPES), // Тип жилья
        rooms: getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS), // Число, количество комнат,
        guests: getRandomIntInclusive(MIN_GUEST, MAX_GUEST), // Число, количество гостей, которое можно разместить,
        checkin: getRandomElement(CHECKS), // Время выезда - один случайный элемент массива CHECKS
        checkout: getRandomElement(CHECKS), // Время выезда - один случайный элемент массива CHECKS
        features: getRandomArrayElements(FEATURES), // Массив строк случайной длины из ниже предложенных(FEATURES)
        description: 'Описание', // Строка с описанием
        photos: getRandomArrayElements(PHOTOS) // Массив строк случайной длины, содержащий адреса фотографий
      }
    });
  }

  return pinData;
};

var pinTemplate = document
  .querySelector('#pin')
  .content.querySelector('.map__pin');

// Функция создающая массив собранных данных пользователей

var renderPin = function (element) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = element.location.x - MAP_SHIFT_PIN_X + 'px';
  pinElement.style.top = element.location.y + 'px';
  pinElement.querySelector('img').src = element.author.avatar;
  pinElement.querySelector('img').alt = element.offer.title;

  return pinElement;
};

var pinsData = createUserData();

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinsData.length; i++) {
    fragment.appendChild(renderPin(pinsData[i]));
  }

  setPinElement.appendChild(fragment);
};

// module3-task3

var cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.map__card');

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
    element.offer.address;
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

var cardCreate = function () {
  var card = renderCard(pinsData[0]);
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  map.insertBefore(card, mapFiltersContainer); // Добавялем карточку для первого пина
};

// module4-task2

// Добавляем атрибут disabled для Fieldset-ов
var formHeader = document.querySelector('.ad-form-header');
formHeader.setAttribute('disabled', 'disabled');
var formElement = document.querySelectorAll('.ad-form__element');
for (var i = 0; i < formElement.length; i++) {
  var formItem = formElement[i];
  formItem.setAttribute('disabled', 'disabled');
}

// Функция активации сценария
var activeForm = function () {
  map.classList.remove('map--faded'); // Убираем класс-модификатор map--faded
  document.querySelector('.ad-form').classList.remove('ad-form--disabled'); // Убираем класс-модификатор ad-form--disabled
  renderPins(); // Функция создания 8 случайных пинов
  cardCreate(); // Функция создания карточки дл первого пина
  formHeader.removeAttribute('disabled', 'disabled');
  formElement = document.querySelectorAll('.ad-form__element');
  addressPin.value = coordinateMainPinActive();
  for (var j = 0; j < formElement.length; j++) {
    formItem = formElement[j];
    formItem.removeAttribute('disabled', 'disabled');
  }
};

// Выполнение сценария по нажатию на левую клавишу мыши
var pinMain = document.querySelector('.map__pin--main');
pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === MOUSE_LEFT_BTN) {
    activeForm();
  }
});

// Выполнение сценария по нажатию на Enter
pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BUTTON) {
    activeForm();
  }
});

// Функция указания адреса главной круглой метки в неактивном состоянии (центр круглой метки)
var coordinateMainPinInactive = function () {
  var pinMainX = Number(parseInt(pinMain.style.left, RADIX)) + PIN_MAIN_SHIFT_X;
  var pinMainY = Number(parseInt(pinMain.style.top, RADIX)) + PIN_MAIN_SHIFT_Y;
  return pinMainX + ', ' + pinMainY;
};

// Функция указания адреса главной круглой метки в неактивном состоянии (центр круглой метки)
var coordinateMainPinActive = function () {
  var pinMainX = Number(parseInt(pinMain.style.left, RADIX)) + PIN_MAIN_SHIFT_X;
  var pinMainY =
    Number(parseInt(pinMain.style.top, RADIX)) +
    PIN_MAIN_HEIGHT +
    PIN_MAIN_POINT_SHIFT_Y;
  return pinMainX + ', ' + pinMainY;
};

// Заполнение адрессной строки по умолчанию (в неактивном состоянии)
var addressPin = document.querySelector('#address');
addressPin.value = coordinateMainPinInactive();

// Валидация формы ввода

// // Валидация заголовка жилья
var addForm = document.querySelector('.ad-form');
var formTitleInput = addForm.querySelector('#title');

formTitleInput.addEventListener('invalid', function () {
  if (formTitleInput.validity.tooShort) {
    formTitleInput.setCustomValidity(
        'Заголовок не должен быть меньше ' + MIN_TITLE_LENGTH + '-ти символов'
    );
  } else if (formTitleInput.validity.tooLong) {
    formTitleInput.setCustomValidity(
        'Заголовок не должен быть больше' + MAX_TITLE_LENGTH + 'символов'
    );
  } else if (formTitleInput.validity.valueMissing) {
    formTitleInput.setCustomValidity('Обязательное поле');
  } else {
    formTitleInput.setCustomValidity('');
  }
});

formTitleInput.addEventListener('input', function () {
  if (formTitleInput.value.length < MIN_TITLE_LENGTH) {
    formTitleInput.setCustomValidity(
        'Заголовок должен состоять минимум из ' + MIN_TITLE_LENGTH + '-х символов'
    );
  } else if (formTitleInput.value.length > MAX_TITLE_LENGTH) {
    formTitleInput.setCustomValidity(
        'Заголовок должен состоять не больше чем из ' +
        MAX_TITLE_LENGTH +
        ' символов'
    );
  } else {
    formTitleInput.setCustomValidity('');
  }
});

// Валидация кол-ва человек в зависимости от кол-ва комнат
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
