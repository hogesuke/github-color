$(function () {
  var $button    = $('<a class="dropdown-item">Header color</a>');
  var $form      = $('<form><input type="text" id="color" name="color" value="#123456" /></form>');
  var $container = $('<div id="colorpicker"></div>');

  $('.dropdown-menu.dropdown-menu-sw').append($button);
  $('body').append($form).append($container);

  $button.on('click', function () {
    $('#colorpicker').farbtastic('#color');
  });
});