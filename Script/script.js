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

toggleJumpToTopButton();
