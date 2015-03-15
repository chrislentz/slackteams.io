function toggleFixedMenu() {
  var num = 100;

  console.log($(window).scrollTop());

  if ($(window).scrollTop() > num) {
    if ($('.mini-logo').css('opacity') == 0) {
      $('.mini-logo').animate({ opacity: 1.0 }, 500);
    }
  }
  else {
    if ($('.mini-logo').css('opacity') == 1) {
      $('.mini-logo').animate({ opacity: 0 }, 500);
    }
  }
}

$(function() {
  var colors = ['blue', 'pink', 'yellow', 'green'];
  var randomColor = colors[Math.floor(Math.random() * colors.length)];

  $('body').addClass(randomColor);

  toggleFixedMenu();

  $(window).scroll(function() {
    toggleFixedMenu();
  });
});