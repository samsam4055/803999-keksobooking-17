'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewImg = document.querySelector('.ad-form-header__preview img');
  var imageUploadChooser = document.querySelector('.ad-form__upload input[type=file]');
  var imageUploadPreview = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarPreviewImg.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });

  imageUploadChooser.addEventListener('change', function () {
    var file = imageUploadChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var imgElement = document.createElement('img');
        imageUploadPreview.appendChild(imgElement);

        var reader = new FileReader();

        reader.addEventListener('load', function () {
          imageUploadPreview.style.width = 'auto';
          imgElement.src = reader.result;
          imgElement.width = 75;
          imgElement.height = 75;
          imgElement.style.marginRight = '5px';
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
