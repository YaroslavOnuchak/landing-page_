// JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
const search = document.querySelector(".fa-search");
const search_input = document.search.elements[0];
const menu = document.querySelector(".menu");

console.log("search_input.value :>> ", search_input.value.length);
// nav-logo__nav   nav-logo nav-logo__logo
search.addEventListener("click", function () {
  if (!search_input.classList.contains("show--input")) {
    search_input.classList.add("show--input");
  } else if (search_input.value == 0) {
    search_input.classList.remove("show--input");
  } else {
    console.log("else :>> ");
  }
});
document
  .querySelector(".burger-checkbox")
  .addEventListener("click", function () {
    menu.classList.toggle("burger--open");
  });

document.querySelectorAll(".dropdown a").forEach((link) => {
  link.addEventListener("click", function () {
    this.parentElement.classList.toggle("dropdown--open");
    // console.log("this :>> ", this.parentElement);
  });
});
