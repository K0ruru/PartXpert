window.addEventListener("scroll", function () {
  const nav = document.getElementById("main-nav");
  const scrolled = window.scrollY > 80;

  if (scrolled) {
    nav.classList.add("scrolled-nav");
  } else {
    nav.classList.remove("scrolled-nav");
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleJumpToTopButton() {
  const jumpToTopBtn = document.getElementById("jumpToTopBtn");
  if (window.scrollY > 0) {
    jumpToTopBtn.style.display = "block"; // Show the button when not at the top
  } else {
    jumpToTopBtn.style.display = "none"; // Hide the button when at the top
  }
}

window.addEventListener("scroll", toggleJumpToTopButton);

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


