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
$(function () {
  $('.block-with-video iframe').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });

  // If you want to keep full screen on window resize
  $(window).resize(function () {
    $('.block-with-video iframe').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
  });
});

if (window.getComputedStyle(document.body).mixBlendMode == undefined) $(".ops-navigation").addClass("curtain");

/***/ })
])