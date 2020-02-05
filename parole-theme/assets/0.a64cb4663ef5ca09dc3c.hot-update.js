webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 60,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        clickable: true
    }
});

$('.collections-slick').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    dots: false
});
$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true
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
$('.category-list-menu-name').click(function (e) {
    $(this).toggleClass('active');
    $(this).parent().find('.category-list-menu-content').slideToggle();
});
$(document).ready(function () {
    var menu_fixed_is = $('.header-top').offset().top;

    $(window).scroll(function () {
        if ($(this).scrollTop() > menu_fixed_is + 100) {
            $('.header-left').css('background-color', '#fff');
        } else {
            $('.header-left').css('background-color', 'transparent');
        }
    });
});

/***/ })
])