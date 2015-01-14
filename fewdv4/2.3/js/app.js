'use strict';

var rippleOptions = {
  'elements'  :'.btn, ul.ripple li a',
  'focus'   :'.btn'
};

var rippleEffect = new $.RippleEffect(rippleOptions);


$('.shopping-list').on('click', '.polymer label', function(e) {
  e.stopPropagation();
  // find the first span which is our circle/bubble
  var el = $(this).children('span:first-child');

  // add the bubble class (we do this so it doesnt show on page load)
  el.addClass('circle');

  // clone it
  var newone = el.clone(true);

  // add the cloned version before our original
  el.before(newone);

  // remove the original so that it is ready to run on next click
  $(this).find('.' + el.attr('class') + ':last').remove();
});

$('.shopping-list').on('click', 'li', function(e) {
  e.stopPropagation();
  $(this).toggleClass('complete').find('.polymer label').trigger('click');
});