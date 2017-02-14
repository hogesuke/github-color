$(function () {
  var $button    = $('<a class="dropdown-item header-color-button">Header color</a>');
  var $container = $('<div id="colorpicker-container"></div>');
  var $form      = $('<form id="colorform"><input type="text" id="color" name="color" value="#123456" /></form>');
  var $picker    = $('<div id="colorpicker"></div>');

  $container.append($form).append($picker);
  $('body').append($container);
  $('#colorpicker').farbtastic('#color');

  $('.dropdown-menu.dropdown-menu-sw').append($button);

  $(document).on('click', '.header-color-button', function () {
    $container.toggle();
  });
});