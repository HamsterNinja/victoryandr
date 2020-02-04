webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$('.main-slick').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false
});
(function ($) {
  var image = $(".slider-slice img"),
      imageContainer = $(".slider-slice-imageContainer"),
      sliderSlice = $(".slider-slice"),
      imageActive = $(".image--active"),
      sliderOverlay = $(".slider-overlay"),
      CTA = $(".navigation"),
      vw,
      vh,
      delay = 0.06,
      delays = [];

  TweenMax.set(imageContainer, { xPercent: "100" });
  TweenMax.set(imageActive, { xPercent: "0" });

  $("body").addClass("u-blockScroll");

  for (var i = 0; i < 4; i++) {
    delays.push(i * delay);
  };

  /********************************
    FIT THE WINDOWS WITH THE IMAGES
  ********************************/
  function positionImages() {
    vw = $(window).width();
    vh = $(window).height();
    var imageW = image.width();
    var imageH = image.height();
    ratioImg = imageW / imageH;
    ratioW = vw / vh;
    if (ratioImg > ratioW) {
      image.css({ "width": "auto", "height": vh });
    } else {
      image.css({ "width": vw, "height": "auto" });
    }
  }
  positionImages();
  $(window).on("resize", positionImages);

  /********************************
    OPENING
  ********************************/
  var tlOpening = new TimelineMax({ delay: 2 });
  var delayOpening = 0.05;
  tlOpening.fromTo($(".slider-slice-imageContainer.image--active").eq(0), 1, { xPercent: -100 }, { xPercent: 0, ease: Power2.easeInOut }, 1 * delayOpening).fromTo($(".slider-slice-imageContainer.image--active").eq(1), 1, { xPercent: -100 }, { xPercent: 0, ease: Power2.easeInOut }, 2 * delayOpening).fromTo(CTA, 0.6, { autoAlpha: 0 }, { autoAlpha: 1 });

  /********************************
    SLIDE BACKGROUND
  ********************************/
  var durationSlide = 0.8;
  var durationText = 0.8;
  var isMoving = false;
  function slideBackground(fromRight) {
    isMoving = true;
    var tlSlideBackground = new TimelineMax({ onComplete: function onComplete() {
        isMoving = false;
      } });
    imageActive = $(".image--active");

    if (fromRight === true) {
      var from = 105;
      var to = -100;
    } else {
      var from = -105;
      var to = 100;
    }
    var k = 0;

    imageActive.each(function (i, el) {
      var parent = $(el).closest(".slider-slice");
      if (fromRight === true) {
        var nextSlice = $(el).next();
      } else {
        var nextSlice = $(el).prev();
      }
      if (nextSlice.is(':last-child') || nextSlice.is(':first-child')) {
        parent.find(".slider-slice-imageContainer").eq(0).appendTo(parent);
      }
      if (nextSlice.index() == -1) {
        parent.find(".slider-slice-imageContainer").eq(0).appendTo(parent);
        var nextSlice = $(el).prev();
      }
      tlSlideBackground.to(el, durationSlide * 1.1, { xPercent: to, ease: Power2.easeInOut }, delays[k]).fromTo(nextSlice, durationSlide, { xPercent: from }, { xPercent: 0, ease: Power2.easeInOut }, delays[k]);
      $(el).removeClass("image--active");
      nextSlice.addClass("image--active");
      k++;
      if (k == 4) {
        k = 0;
      }
    });
  }

  /********************************
    CTA ACTIONS
  ********************************/
  $(".navigation--next").click(function () {
    var fromRight = true;
    if (!isMoving) {
      slideBackground(fromRight);
    }
  });
  $(".navigation--prev").click(function () {
    var fromRight = false;
    if (!isMoving) {
      slideBackground(fromRight);
    }
  });
})(jQuery);

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function () {
  var ga = document.createElement('script');ga.type = 'text/javascript';ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga, s);
})();

/***/ })
])