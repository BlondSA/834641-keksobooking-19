'use strict';

document.querySelector('.map').classList.remove('map--faded'); // Убираем класс-модификатор map--faded

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_OUT = ['12:00', '13:00', '14:00']; // Массив один для заселения и выезда один, т.к. время въезда = время выезда и наоборот
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
var NUMBER_HOUSING = 8; // Кол-во вариантов жилья
var MAP_PIN_MIN_Y = 130;
var MAP_PIN_MAX_Y = 630;
var MAP_PIN_MIN_X = 0;
var MAP_SHIFT_PIN_X = 25; // Смещение пина по оси X
var MAP = document.querySelector('.map');

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
var createUserData = function (number) {
  var userList = [];

  var author = {
    avatar: 'img/avatars/user0' + (number + 1) + '.png'
  };

  var location = {
    x: getRandomIntInclusive(MAP_PIN_MIN_X, getElementWidth(MAP)),
    y: getRandomIntInclusive(MAP_PIN_MIN_Y, MAP_PIN_MAX_Y)
  };

  var offer = {
    title: 'Заголовок объявления',
    address: location.x + ',' + location.y, // Локация x и y координаты задаются случаным образом
    price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE), // Цена за одну ночь
    type: getRandomElement(TYPES), // Тип жилья
    rooms: getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS), // Число, количество комнат,
    guests: getRandomIntInclusive(MIN_GUEST, MAX_GUEST), // Число, количество гостей, которое можно разместить,
    checkin: getRandomElement(CHECK_IN_OUT), // Время выезда - один случайный элемент массива CHECK_IN_OUT
    checkout: getRandomElement(CHECK_IN_OUT), // Время выезда - один случайный элемент массива CHECK_IN_OUT
    features: getRandomArrayElements(FEATURES), // Массив строк случайной длины из ниже предложенных(FEATURES)
    description: 'Описание', // Строка с описанием
    photos: getRandomArrayElements(PHOTOS) // Массив строк случайной длины, содержащий адреса фотографий
  };

  userList.author = author;
  userList.offer = offer;
  userList.location = location;

  return userList;
};

// Функция создающая массив собранных данных пользователей
var createUsers = function () {
  var users = [];

  for (var i = 0; i < NUMBER_HOUSING; i++) {
    users.push(createUserData(i));
  }

  return users;
};

// Создание фрагмента с метками пользователей на основе шаблона и добавление в DOM
var renderPins = function () {
  var createFragment = document.createDocumentFragment();
  var users = createUsers();

  users.forEach(function (element) {
    var pinElement = document
      .querySelector('#pin')
      .content.querySelector('.map__pin')
      .cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.style.left = element.location.x - MAP_SHIFT_PIN_X + 'px';
    pinElement.style.top = element.location.y + 'px';
    pinImage.src = element.author.avatar;
    pinImage.alt = element.offer.title;

    createFragment.appendChild(pinElement);
  });
  document.querySelector('.map__pins').appendChild(createFragment);
};

renderPins();

document.querySelector('.map').classList.remove('map--faded'); // Удаляем класс-модификатор map--faded
