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

$('.product-slick-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.product-slick-nav'
});
$('.product-slick-nav').slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  asNavFor: '.product-slick-for',
  focusOnSelect: true,
  vertical: true
});

if (window.getComputedStyle(document.body).mixBlendMode == undefined) $(".ops-navigation").addClass("curtain");

/***/ })
])