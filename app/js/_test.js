console.log("hello gulp");
function onMouseMove(e) {
  TweenMax.to(bigBall, 0.4, {
    x: e.clientX - 15,
    y: e.clientY - 15,
  });
  TweenMax.to(smallBall, 0.1, {
    x: e.clientX - 5,
    y: e.clientY - 7,
  });
}

// Hover an element
function onMouseHover() {
  TweenMax.to(bigBall, 0.3, {
    scale: 4,
  });
}
function onMouseHoverOut() {
  TweenMax.to(bigBall, 0.3, {
    scale: 1,
  });
}
