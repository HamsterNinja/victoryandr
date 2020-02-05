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
    $(this).addClass('active');
    $(this).parent().find('.category-list-menu-content').slideToggle();
});

/***/ })
])