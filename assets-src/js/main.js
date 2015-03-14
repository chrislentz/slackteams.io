$(function() {
  var colors = ['blue', 'pink', 'yellow', 'green'];
  var randomColor = colors[Math.floor(Math.random() * colors.length)];

  $('body').addClass(randomColor);
});