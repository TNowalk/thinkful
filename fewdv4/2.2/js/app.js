$(document).ready(function() {
  // To prevent flickering when mousing in/out while pressing x, we keep track
  // of whether the .ryu-cool div is shown
  var isCool = false;

  $('.ryu')
    .mouseenter(function() {
      if (!isCool) {
        $('.ryu-still').hide();
        $('.ryu-ready').show();
      }
    })
    .mouseleave(function() {
      if (!isCool) {
        $('.ryu-ready').hide();
        $('.ryu-still').show();
      }
    })
    .mousedown(function() {
      if (!isCool) {
        playHadouken();
        $('.ryu-ready').hide();
        $('.ryu-throwing').show();
        $('.hadouken').finish().show().animate({'left': '300px'}, 500, function() {
          $(this).hide().css('left', '-212px');
        });
      }
    })
    .mouseup(function() {
      if (!isCool) {
        $('.ryu-throwing').hide();
        $('.ryu-ready').show();
      }
    });

  $(document)
    .keydown(function(e) {
      // `x` key has a key code of 88
      if (e.which ===  88) {
        // Because we don't know if .ryu-still, .ryu-ready, or .ryu-throwing is
        // shown, we should hide them all to prevent "stacking"
        $('.ryu div').hide();
        $('.ryu-cool').show();
        isCool = true;
      }
    })
    .keyup(function(e) {
      // `x` key has a key code of 88
      if (e.which ===  88) {
        $('.ryu-cool').hide();
        $('.ryu-ready').show();
        isCool = false;
      }
    });
});

function playHadouken () {
  $('#hadouken-sound')[0].volume = 0.5;
  $('#hadouken-sound')[0].load();
  $('#hadouken-sound')[0].play();
}