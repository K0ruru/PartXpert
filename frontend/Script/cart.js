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
