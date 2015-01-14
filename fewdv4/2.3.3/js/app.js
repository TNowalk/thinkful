'use strict';

var items = ['beer','milk','eggs','flour'];

var rippleOptions = {
  'elements'  :'.btn, ul.ripple li a',
  'focus'   :'.btn'
};

// Add ripple effects to submit button
var rippleEffect = new $.RippleEffect(rippleOptions);

// Bind click event to lables
$('.shopping-list').on('click', '.polymer label', function(e) {
  // Stop event from bubbling up to the li
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

// Bind click event to li
$('.shopping-list').on('click', 'li', function(e) {
  e.stopPropagation();
  // Toggle the complete class on the li, then trigger a click on the inner label
  $(this).toggleClass('complete').find('.polymer label').trigger('click');
});

// Bind a double click event to deletean item
$('.shopping-list').on('dblclick', 'li', function(e) {
  e.stopPropagation();

  // Grab the text of the item
  var text = $(this).find('.text').text();

  // Loop through the items
  for (var i = 0; i < items.length; i++) {
    // If the text of the double clicked item matches
    if (items[i] === text.toLowerCase()) {
      // Remove the item from the array
      items.splice(i, 1);
    }
  }

  // Fade out the li, then remove it
  $(this).fadeOut('fast', function() {
    $(this).remove();
  })
});

// Bind a submit event to the form to add new items
$('.add-item-form').submit(function(e) {
  // Prevent the form from refreshing the page
  e.preventDefault();

  // Hide any existing errors
  $('.error-holder div').hide();

  // Grab the value in the input
  var itemText = $(this).find('input').val().trim();

  // Make sure the new value isn't empty
  if (itemText === '') {
    $('.invalid-input-error').fadeIn();
    return;
  }

  // Make sure the item isn't already added
  if (items.indexOf(itemText.toLowerCase()) !== -1) {
    $('.unique-input-error').fadeIn();
    return;
  }

  // Add the item to the array
  items.push(itemText.toLowerCase());

  // Create a unique id
  var itemId = itemText.toLowerCase().replace(' ', '-');

  // Create the HTML for the new li
  var liHtml = '<li>' +
                 '<span class="text">' + itemText + '</span>' +
                 '<span class="polymer pull-right">' +
                   '<input type="checkbox" id="item-' + itemId + '">' +
                   '<label for="item-' + itemId + '">' +
                       '<span class="circle"></span>' +
                       '<span class="check"></span>' +
                       '<span class="box"></span>' +
                   '</label>' +
                 '</span>' +
               '</li>';

  // Convert the HTML to a jQuery object
  var li = $(liHtml);

  // Append the new li to the shopping-list
  $('.shopping-list').append(li);

  // Clear the input
  $('.add-item-form').find('input').val('');
});