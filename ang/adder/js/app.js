var $x   = $("#x_val");
var $y   = $("#y_val");
var $ans = $("#answer");
var $err = $("#error");
var $msg = $err.find('.alert');

$err.hide();

var add = function(x, y) {
  return parseInt(x,10) + parseInt(y,10);
};

var subtract = function(x, y) {
  return parseInt(x,10) - parseInt(y,10);
};

var display = function(x, y, action, ans) {
  $ans.text(x + " " + action + " " + y + " = " + ans).show();
};

var error = function(msg) {
  $msg.text(msg);
  $err.show();
};

var validate = function(val) {
  return !(val == undefined || val == '' || !$.isNumeric(val));
};

$("#add_button").on('click', function() {
  $err.hide();
  if (!validate($x.val()) || !validate($y.val())) {
    error("Invalid input");
    return false;
  }
  display($x.val(), $y.val(), '+', add($x.val(), $y.val()));
});

$("#subtract_button").on('click', function() {
  if (!validate($x.val()) || !validate($y.val())) {
    error("Invalid input");
    return false;
  }
  $err.hide();
  display($x.val(), $y.val(), '-', subtract($x.val(), $y.val()));
});