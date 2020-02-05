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
    slidesToShow: 4,
    slidesToScroll: 4,
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
$('.category-list-menu-name').click(function (e) {
    $(this).toggleClass('active');
    $(this).parent().find('.category-list-menu-content').slideToggle();
});

var menu_fixed_is = $('.js_menu_fix').offset().top;
margin_slick = $('.main-header-bottom').offset().top;
$(window).scroll(function () {
    if ($(this).scrollTop() > menu_fixed_is) {
        $('.js_menu_fix').addClass('fixed');
        $('.main-header-top').css('padding-bottom', '73px');
    } else {
        $('.main-header-top').removeAttr('style');
        $('.js_menu_fix').removeClass('fixed');
    }
});

/***/ })
])