'use strict';

(function () {
  var load = function (sendSuccesHandler, sendErrorHendler) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var StatusCode = {
      OK: 200
    };
    var TIMEOUT_IN_MS = 10000;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        sendSuccesHandler(xhr.response);
      } else {
        sendErrorHendler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      sendErrorHendler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      sendErrorHendler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };
  window.backend = {load: load};
})();
