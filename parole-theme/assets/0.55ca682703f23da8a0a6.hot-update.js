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
            $('.header-left').removeClass('no_bg');
        } else {
            $('.header-left').addClass('no_bg');
        }
    });
});

$('.btn-hamburger').click(function (e) {
    $(this).toggleClass('active');
    $(this).parent().toggleClass('active');
    $('.hidden-menu_block').toggleClass('active');
    $('.overlay').toggleClass('active');
    $('.hidden-search_block').removeClass('active');
});

$('.js-search').click(function (e) {
    $('.btn-hamburger').removeClass('active');
    $('.btn-hamburger').parent().removeClass('active');
    $('.hidden-menu_block').removeClass('active');
    $('.hidden-search_block').toggleClass('active');
    $('.overlay').removeClass('active');
});

/***/ })
])