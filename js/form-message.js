'use strict';

(function () {
  // В случае успешной отправки формы, клонируется шаблон и вставляется после body
  var successMessage = document.querySelector('.success');

  var activeSuccessFormMessage = function () {
    successMessage.remove();
    successMessage.removeEventListener('click', formPopupSuccessMouseHandler);
    document.removeEventListener('keydown', formPopupSuccessKeydownHandler);
  };

  var formPopupSuccessMouseHandler = function (evt) {
    if (evt.button === window.utils.MOUSE_LEFT_BTN) {
      activeSuccessFormMessage();
    }
  };

  var formPopupSuccessKeydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_BUTTON) {
      activeSuccessFormMessage();
    }
  };

  var createSuccesMessage = function () {
    // Шаблон сообщения об успешной отправке
    var successTemplate = document
    .querySelector('#success')
    .content.querySelector('.success');

    var successMessageNode = successTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', successMessageNode);
    successMessage = document.querySelector('.success');
    successMessage.addEventListener('click', formPopupSuccessMouseHandler);
    document.addEventListener('keydown', formPopupSuccessKeydownHandler);
  };

  // В случае неудачной отправки формы клонируется шаблон и вставляется после body

  var errorMessage = document.querySelector('.error');

  var activeErrorFormMessage = function () {
    errorMessage.remove();
    document.querySelector('.error__button').removeEventListener('click', formPopupErrorBottonCloseHandler);
    errorMessage.removeEventListener('click', formPopupErrorMouseHandler);
    errorMessage.removeEventListener('keydown', formPopupErrorKeydownHandler);
  };

  var formPopupErrorBottonCloseHandler = function (evt) {
    if (evt.button === window.utils.MOUSE_LEFT_BTN) {
      activeErrorFormMessage();
    }
  };

  var formPopupErrorMouseHandler = function (evt) {
    if (evt.button === window.utils.MOUSE_LEFT_BTN) {
      activeErrorFormMessage();
    }
  };

  var formPopupErrorKeydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_BUTTON) {
      activeErrorFormMessage();
    }
  };

  var createErrorMessage = function () {
    var errorTemplate = document
        .querySelector('#error')
        .content.querySelector('.error');
    var errorMessageNode = errorTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', errorMessageNode);
    errorMessage = document.querySelector('.error');
    document.querySelector('.error__button').addEventListener('click', formPopupErrorBottonCloseHandler);
    errorMessage.addEventListener('click', formPopupErrorMouseHandler);
    document.addEventListener('keydown', formPopupErrorKeydownHandler);
  };

  // Отменяем действие по-кмолчанию для слушателя, и отправляем форму без перезагрузки страницы
  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      window.map.deactivationForm();
    });
    evt.preventDefault();
  });

  window.formMessage = {createSuccesMessage: createSuccesMessage,
    createErrorMessage: createErrorMessage};

})();
