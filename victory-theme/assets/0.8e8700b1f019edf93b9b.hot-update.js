webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


onepagescroll('.main-content.pages', {

  pageContainer: 'section',

  animationType: 'ease-in-out',

  animationTime: 500,

  infinite: false,

  pagination: true,

  keyboard: true,

  direction: 'vertical'
});

$('.collections-slick').slick({
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  arrows: true,
  dots: false
});

$('.choice-button').click(function (event) {
  event.preventDefault();
  $('.choice-button').removeClass('active');
  $(this).addClass('active');

  var id = $(this).attr('data-id');
  if (id) {
    $('.colections-content-inner:visible').fadeOut(0, function () {
      $('.colections-content').find('#' + id).fadeIn('slow', function () {
        $('.collections-slick').slick('reinit');
      });
    });
  }
});
if (window.getComputedStyle(document.body).mixBlendMode == undefined) $(".main-header").addClass("curtain");
$(".ops-navigation").addClass("curtain");

/***/ })
])