'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = '70';
  var IMAGE_HEIGHT = '70';

  var fileChooser = document.querySelector('.ad-form__upload #images');
  var preview = document.querySelector('.ad-form__photo');
  var loadFileHandler = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.src = reader.result;
        img.width = IMAGE_WIDTH;
        img.height = IMAGE_HEIGHT;
        preview.appendChild(img);
      });

      reader.readAsDataURL(file);
    }
  };
  fileChooser.addEventListener('change', loadFileHandler);
})();
