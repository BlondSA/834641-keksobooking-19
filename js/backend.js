'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var load = function (sendSuccesHandler, sendErrorHandler) {
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

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var upload = function (data, sendSuccesHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        sendSuccesHandler(xhr.response);
        window.formMessage.createSuccesMessage();
      } else {
        window.formMessage.createErrorMessage();
      }
    });
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {load: load, upload: upload};
})();
