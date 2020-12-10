@@include("_libs.min.js");
// @@include("_test.js");
@@include("_script.js");
let countSlidesToShow = 5;
window.addEventListener("resize", resizeW());

function resizeW() {
  if (window.innerWidth < 700 && window.innerWidth > 400) {
    countSlidesToShow = 4;
  } else if (window.innerWidth < 400) {
    countSlidesToShow = 3;
  } else {
    countSlidesToShow = 5;
  }
}
resizeW();
$(document).ready(function () {
  console.log("redy :>> ");
  $(".slider").slick({
    slidesToShow: countSlidesToShow,
    arrows: true,
    dots: true,
    adaptiveHeight: true,
    slidesToScroll: 2,
    infinite: true,
    // accessibility: false,
    autoplay: true,
    autoplaySpeed: 5000,
    // centerPadding: "50px",
    // speed: 5000,
    // pauseOnDotsHover: false,
    // draggable:true,
    // swipe:false,
    pauseOnFocus: false,
    pauseOnHover: false,
    easing: "cubic-bezier(.37,-0.58,.84,1.04)",
  });
});

