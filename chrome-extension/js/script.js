$(() => {
  const $header   = $('header');
  const $search   = $header.find('.header-search');
  const $button   = $('<a class="dropdown-item header-color-button">Header color</a>');
  const $picker   = $('<div id="colorpicker-container"><div id="colorpicker"></div></div>');
  const $close    = $('<a class="close"></a>');
  const $default  = $('<a class="default">もとに戻す</a>');
  const $unread   = $('.notification-indicator .mail-status');
  const $pulldown = $('.Header-item:last-child');
  const $menu     = $pulldown.find('.dropdown-menu.dropdown-menu-sw');

  const setHeaderColor = color => {
    if (!color) { return; }
    $header.css({ backgroundColor: color });
    $search.css({ borderRightColor: color });
    $unread && $unread.css({ borderColor: color })
  };

  const saveHeaderColor = color => {
    localStorage.setItem('chrome-extension::github-color::header-color', color);
  };

  const loadHeaderColor = () => {
    return localStorage.getItem('chrome-extension::github-color::header-color');
  };

  const getCurrentColor = () => {
    return loadHeaderColor() || defaultColor;
  };

  const handleColorChange = color => {
    color = new RGBColor(color).toHex();
    setHeaderColor(color);
    saveHeaderColor(color);
  };

  const handleButtonClick = () => {
    $picker.toggle();
    $pulldown.click();
  };

  $('body').append($picker.prepend($close).append($default));
  $menu.append('<div class="dropdown-divider"></div>').append($button);
  $(document).on('click', '.header-color-button', handleButtonClick);

  const defaultColor = new RGBColor($header.css('backgroundColor')).toHex();
  const picker       = $.farbtastic('#colorpicker', handleColorChange);

  picker.setColor(getCurrentColor());
  setHeaderColor(getCurrentColor());

  $close.on('click', () => {
    $picker.toggle();
  });

  $default.on('click', () => {
    picker.setColor(defaultColor);
  });

  const observer = new MutationObserver(() => {
    setHeaderColor(getCurrentColor());
  });

  observer.observe($header[0], {
    attributes: true
  });
});