let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos, type) {
  var nav = document.getElementById("nav");
  var header = document.getElementById("header");
  var navbarsupport = document.getElementById("navbarSupportedContent")
  header.style.transform = "translate3d(0px,"+scroll_pos/2+"px,0px)"

  if (scroll_pos < 40) {
    nav.classList.add("transparent");
  }else{
    nav.classList.remove("transparent");
  }
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});