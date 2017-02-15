$(function () {
  var $header = $('body > .header');
  var $button = $('<a class="dropdown-item header-color-button">Header color</a>');
  var $picker = $('<div id="colorpicker-container"><div id="colorpicker"></div></div>');
  var $unread = $('.notification-indicator .mail-status');

  var setHeaderColor = function (color) {
    console.debug('setHeaderColor');
    if (!color) { return; }
    $header.css({ backgroundColor: color });
    $unread && $unread.css({ borderColor: color })
  };

  var saveHeaderColor = function (color) {
    localStorage.setItem('chrome-extension::github-color::header-color', color);
  };

  var loadHeaderColor = function () {
    return localStorage.getItem('chrome-extension::github-color::header-color');
  };

  var colorChangeCallback = function (color) {
    setHeaderColor(color);
    saveHeaderColor(color);
  };

  var handleButtonClick = function () {
    $picker.toggle();
  };

  $('body').append($picker);
  $('.user-nav > li:last-child .dropdown-menu.dropdown-menu-sw')
    .append('<div class="dropdown-divider"></div>')
    .append($button);
  $(document).on('click', '.header-color-button', handleButtonClick);

  var initialColor = loadHeaderColor() || $header.css('backgroundColor');

  $.farbtastic('#colorpicker', colorChangeCallback).setColor(initialColor);
  setHeaderColor(initialColor);
});