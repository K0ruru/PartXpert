// Get the data from database
async function fetchProducts() {
	try {
		const response = await axios.get("http://localhost:3000/products");
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}

// a function to format the price

function formatCurrency(amount) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(amount);
}

// function to render all the products
async function displayProducts() {
	const products = await fetchProducts();

	products.forEach((product) => {
		const productItem = document.querySelector(".product-cards");
		productItem.classList.add("product-item");

		const productType = product.type;

		const productLink = document.createElement("a");
		productLink.href = `product.html?id=${product._id}`;

		const productContainer = document.createElement("div");
		productContainer.classList.add("product-card");
		productContainer.classList.add(productType);

		const productName = document.createElement("h3");
		productName.textContent = product.name;

		const productImgContainer = document.createElement("div");
		productImgContainer.classList.add("product__img__container");

		const productImg = document.createElement("img");
		productImg.src = product.imageSrc;
		productLink.appendChild(productImg);
		productImgContainer.appendChild(productLink);

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

	// function for the filter to work
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

	//function to add the items to the card

	const cartItems = [];

	function addToCart(product) {
		console.log("fuck");
		const existingItem = cartItems.find(
			(item) => item.product.id === product.id
		);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cartItems.push({ product: product, quantity: 1 });
		}

		updateCartDisplay();
		updateTotalPrice();
		updateLocalStorage();
	}

	function updateTotalPrice() {
		const totalPriceElement = document.querySelector(".total-price");
		const totalPrice = cartItems.reduce((total, item) => {
			const productPrice = parseFloat(
				item.product.price
					.replace("Rp. ", "")
					.replace(".", "")
					.replace(",", ".")
			);
			return total + productPrice * item.quantity;
		}, 0);

		const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(totalPrice);
		totalPriceElement.textContent = `Total Price: ${formattedTotalPrice}`;
	}

	function updateCartDisplay() {
		const cartItemsList = document.querySelector(".cart-items");
		cartItemsList.innerHTML = "";

		cartItems.forEach((item) => {
			const cartItemElement = document.createElement("li");
			const product = item.product;

			// Create an image element for the product
			const productImage = document.createElement("img");
			productImage.src = product.imageSrc;
			productImage.alt = product.name;
			productImage.className = "cart-item-image";

			const quantityInput = document.createElement("input");
			quantityInput.type = "number";
			quantityInput.min = 1;
			quantityInput.value = item.quantity;
			quantityInput.className = "amount";
			quantityInput.addEventListener("input", function () {
				updateQuantity(item, parseInt(quantityInput.value));
			});

			const removeButton = document.createElement("button");
			removeButton.textContent = "Remove";
			removeButton.className = "remove-button";
			removeButton.addEventListener("click", function () {
				removeFromCart(item);
			});

			// Create a container for the item details
			const itemDetailsContainer = document.createElement("div");
			itemDetailsContainer.className = "cart-item-details";

			// Create a paragraph element for the item text
			const itemText = document.createElement("p");
			itemText.textContent = `${product.name} x${item.quantity} - ${product.price}`;

			// Append the image and text to the details container
			itemDetailsContainer.appendChild(productImage);
			itemDetailsContainer.appendChild(itemText);

			itemDetailsContainer.appendChild(quantityInput);
			itemDetailsContainer.appendChild(removeButton);

			// Append the details container to the cart item element
			cartItemElement.appendChild(itemDetailsContainer);

			cartItemsList.appendChild(cartItemElement);
		});

		updateTotalPrice(); // Update the total price display
	}

	function updateQuantity(itemToUpdate, newQuantity) {
		if (newQuantity >= 1) {
			itemToUpdate.quantity = newQuantity;
			updateCartDisplay();
		}
	}

	function removeFromCart(itemToRemove) {
		const itemIndex = cartItems.findIndex((item) => item === itemToRemove);
		if (itemIndex !== -1) {
			cartItems.splice(itemIndex, 1);
			updateCartDisplay();
		}
		updateLocalStorage();
	}
	const addToCartButtons = document.querySelectorAll(".add-to-cart");
	addToCartButtons.forEach((button, index) => {
		button.addEventListener("click", function () {
			addToCart(products[index]);
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

const cartItems = [];

function addToCart(product) {
	console.log("fuck");
	const existingItem = cartItems.find((item) => item.product.id === product.id);
	if (existingItem) {
		existingItem.quantity += 1;
	} else {
		cartItems.push({ product: product, quantity: 1 });
	}

	updateCartDisplay();
	updateTotalPrice();
	updateLocalStorage();
}

function updateTotalPrice() {
	const totalPriceElement = document.querySelector(".total-price");
	const totalPrice = cartItems.reduce((total, item) => {
		const productPrice = parseFloat(
			item.product.price.replace("Rp. ", "").replace(".", "").replace(",", ".")
		);
		return total + productPrice * item.quantity;
	}, 0);

	const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(totalPrice);
	totalPriceElement.textContent = `Total Price: ${formattedTotalPrice}`;
}

function updateCartDisplay() {
	const cartItemsList = document.querySelector(".cart-items");
	cartItemsList.innerHTML = "";

	cartItems.forEach((item) => {
		const cartItemElement = document.createElement("li");
		const product = item.product;

		// Create an image element for the product
		const productImage = document.createElement("img");
		productImage.src = product.imageSrc;
		productImage.alt = product.name;
		productImage.className = "cart-item-image";

		const quantityInput = document.createElement("input");
		quantityInput.type = "number";
		quantityInput.min = 1;
		quantityInput.value = item.quantity;
		quantityInput.className = "amount";
		quantityInput.addEventListener("input", function () {
			updateQuantity(item, parseInt(quantityInput.value));
		});

		const removeButton = document.createElement("button");
		removeButton.textContent = "Remove";
		removeButton.className = "remove-button";
		removeButton.addEventListener("click", function () {
			removeFromCart(item);
		});

		// Create a container for the item details
		const itemDetailsContainer = document.createElement("div");
		itemDetailsContainer.className = "cart-item-details";

		// Create a paragraph element for the item text
		const itemText = document.createElement("p");
		itemText.textContent = `${product.name} x${
			item.quantity
		} - ${formatCurrency(product.price)}`;

		// Append the image and text to the details container
		itemDetailsContainer.appendChild(productImage);
		itemDetailsContainer.appendChild(itemText);

		itemDetailsContainer.appendChild(quantityInput);
		itemDetailsContainer.appendChild(removeButton);

		// Append the details container to the cart item element
		cartItemElement.appendChild(itemDetailsContainer);

		cartItemsList.appendChild(cartItemElement);
	});

	updateTotalPrice(); // Update the total price display
}

function updateQuantity(itemToUpdate, newQuantity) {
	if (newQuantity >= 1) {
		itemToUpdate.quantity = newQuantity;
		updateCartDisplay();
	}
}

function removeFromCart(itemToRemove) {
	const itemIndex = cartItems.findIndex((item) => item === itemToRemove);
	if (itemIndex !== -1) {
		cartItems.splice(itemIndex, 1);
		updateCartDisplay();
	}
	updateLocalStorage();
}
function createAddToCartHandler(product) {
	return function () {
		addToCart(product);
	};
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button, index) => {
	const product = products[index];
	button.addEventListener("click", createAddToCartHandler(product));
});
