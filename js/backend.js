'use strict';

(function () {
  var load = function (sendSuccesHandler, sendErrorHandler) {
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
        sendErrorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      sendErrorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      sendErrorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  var upload = function (data, sendSuccesHandler) {
    var URL = 'https://js.dump.academy/keksobooking';
    var StatusCode = {
      OK: 200
    };
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        sendSuccesHandler(xhr.response);
        window.form.createSuccesMessage();
      } else {
        window.form.createErrorMessage();
      }
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {load: load,
    upload: upload};
})();
