$('.btn-hamburger').click(function(e){
  $(this).toggleClass('active');
  $('.hidden-menu_block').toggleClass('active');
  $('.overlay').toggleClass('active');

});
$('.overlay').click(function(e){
  $(this).removeClass('active');
  $('.btn-hamburger').removeClass('active');
  $('.hidden-menu_block').removeClass('active');
});
 $('.choice-button').click(function (event) {
    event.preventDefault();
    $('.choice-button').removeClass('active');
    $(this).addClass('active');

    var id = $(this).attr('data-id');
    if (id) {
        $('.collections-content-inner:visible').fadeOut(0, function () {
            $('.collections-content').find('#' + id).fadeIn('slow', function () {
                $('.collections-slick').slick('reinit');
            });
        });
    }
});
 $('.collections-slick').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: true,
        dots: false,
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
onepagescroll('.main-content.pages',{

  pageContainer: 'section',    

  animationType: 'ease-in-out',

  animationTime: 500,       

  infinite: false,          

  pagination: true,            

  keyboard: true,          

  direction: 'vertical'       
});
if (window.getComputedStyle(document.body).mixBlendMode == undefined)
    $(".ops-navigation").addClass("curtain");