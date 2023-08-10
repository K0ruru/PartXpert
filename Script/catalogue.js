document.addEventListener("DOMContentLoaded", function () {
	const categoryDropdown = document.getElementById("category");
	const productCards = document.querySelectorAll(".product-card");

	categoryDropdown.addEventListener("change", function () {
		const selectedCategory = categoryDropdown.value;

		productCards.forEach((card) => {
			if (
				selectedCategory === "all" ||
				card.classList.contains(selectedCategory)
			) {
				card.style.display = "block";
			} else {
				card.style.display = "none";
			}
		});
	});
});

function toggleNav() {
	const sidenav = document.querySelector(".cart");
	const overlay = document.querySelector(".overlay");
	if (sidenav.style.width === "450px") {
		sidenav.style.width = "0";
		overlay.style.display = "none";
	} else {
		sidenav.style.width = "450px";
		overlay.style.display = "block";
	}
}
function openNav() {
	const sidenav = document.querySelector(".cart");
	const overlay = document.querySelector(".overlay");
	sidenav.style.width = "450px";
	overlay.style.display = "block";
}

function closeNav() {
	const sidenav = document.querySelector(".cart");
	const overlay = document.querySelector(".overlay");
	sidenav.style.width = "0";
	overlay.style.display = "none";
}

document.addEventListener("click", function (event) {
	const sidenav = document.querySelector(".cart");
	const toggleButton = document.querySelector(".toggle-btn");
	const targetElement = event.target;

	if (targetElement !== sidenav && targetElement !== toggleButton) {
		closeNav();
	}
});
