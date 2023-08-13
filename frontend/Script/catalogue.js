async function fetchProducts() {
	try {
		const response = await axios.get("http://localhost:3000/products");
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}

function formatCurrency(amount) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(amount);
}

async function displayProducts() {
	const products = await fetchProducts();

	products.forEach((product) => {
		const productItem = document.querySelector(".product-cards");
		productItem.classList.add("product-item");

		const productType = product.type;

		const productContainer = document.createElement("div");
		productContainer.classList.add("product-card");
		productContainer.classList.add(productType);

		const productName = document.createElement("h3");
		productName.textContent = product.name;

		const productImgContainer = document.createElement("div");
		productImgContainer.classList.add("product__img__container");

		const productImg = document.createElement("img");
		productImg.src = product.imageSrc;
		productImgContainer.appendChild(productImg);

		const productDescription = document.createElement("p");
		productDescription.classList.add("product-description");
		productDescription.textContent = product.description;

		const productPrice = document.createElement("p");
		productPrice.textContent = formatCurrency(product.price);

		const productQuantity = document.createElement("p");
		productQuantity.classList.add("product-quantity");
		productQuantity.textContent = product.quantity;

		const productBtn = document.createElement("button");
		productBtn.innerHTML = "Add To Cart";
		productBtn.classList.add("add-to-cart");
		productBtn.setAttribute("onclick", "addToCart()");

		productContainer.appendChild(productImgContainer);
		productContainer.appendChild(productName);
		productContainer.appendChild(productDescription);
		productContainer.appendChild(productPrice);
		productContainer.appendChild(productBtn);

		productItem.appendChild(productContainer);
	});
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
}

window.addEventListener("load", displayProducts);

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
	const removeBtn = document.querySelector(".remove-button");
	const targetElement = event.target;

	if (
		targetElement !== sidenav &&
		targetElement !== toggleButton &&
		targetElement !== removeBtn
	) {
		closeNav();
	}
});
