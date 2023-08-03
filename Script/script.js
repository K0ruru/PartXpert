window.addEventListener("scroll", function () {
	const nav = document.getElementById("main-nav");
	const scrolled = window.scrollY > 80;

	if (scrolled) {
		nav.classList.add("scrolled-nav");
	} else {
		nav.classList.remove("scrolled-nav");
	}
});
