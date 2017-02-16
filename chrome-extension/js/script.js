$(function () {
  var $header   = $('body .header');
  var $button   = $('<a class="dropdown-item header-color-button">Header color</a>');
  var $picker   = $('<div id="colorpicker-container"><div id="colorpicker"></div></div>');
  var $close    = $('<a class="close"></a>');
  var $default  = $('<a class="default">もとに戻す</a>');
  var $unread   = $('.notification-indicator .mail-status');
  var $pulldown = $('.user-nav > li:last-child');
  var $menu     = $pulldown.find('.dropdown-menu.dropdown-menu-sw');

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
    $pulldown.click();
  };

  $('body').append($picker.prepend($close).append($default));
  $menu.append('<div class="dropdown-divider"></div>').append($button);
  $(document).on('click', '.header-color-button', handleButtonClick);

  var defaultColor = $header.css('backgroundColor');
  var initialColor = loadHeaderColor() || defaultColor;
  var picker = $.farbtastic('#colorpicker', colorChangeCallback);

  picker.setColor(initialColor);
  setHeaderColor(initialColor);

  $close.on('click', function () {
    $picker.toggle();
  });

  $default.on('click', function () {
    // todo rgbを16進数に変換する必要あり
    picker.setColor(defaultColor);
  });
});