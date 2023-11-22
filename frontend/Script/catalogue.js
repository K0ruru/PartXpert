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

		const deleteBtn = document.createElement("button");
		deleteBtn.innerHTML = "Delete";
		deleteBtn.classList.add("delete-product");
		deleteBtn.setAttribute("data-product-id", product._id);
		deleteBtn.addEventListener("click", function (event) {
			const productId = event.target.getAttribute("data-product-id");
			handleDeleteProduct(productId);
		});

		productContainer.appendChild(productImgContainer);
		productContainer.appendChild(productName);
		productContainer.appendChild(productDescription);
		productContainer.appendChild(productPrice);
		productContainer.appendChild(productBtn);
		productContainer.appendChild(deleteBtn);
		productContainer.appendChild(productQuantity);

		productItem.appendChild(productContainer);
	});

	// function for the filter to work
	const categoryDropdown = document.getElementById("category");
	const dropdownSelectedOption = document.querySelector(
		".dropdown-selected-option"
	);
	const dropdownOptions = document.querySelector(".dropdown-options");
	const productCards = document.querySelectorAll(".product-card");

	categoryDropdown.addEventListener("click", function () {
		dropdownOptions.classList.toggle("show-options");
	});

	// Close the dropdown options when clicking an option
	dropdownOptions.addEventListener("click", function (event) {
		const selectedOption = event.target;
		if (selectedOption.classList.contains("dropdown-option")) {
			const selectedValue = selectedOption.getAttribute("data-value");
			const selectedText = selectedOption.textContent;

			document.querySelectorAll(".dropdown-option").forEach((opt) => {
				opt.classList.remove("selected");
			});
			selectedOption.classList.add("selected");

			dropdownSelectedOption.textContent = selectedText;

			productCards.forEach((card) => {
				if (selectedValue === "all" || card.classList.contains(selectedValue)) {
					card.style.display = "block";
				} else {
					card.style.display = "none";
				}
			});

			dropdownOptions.classList.remove("show-options");
		}
	});

	// Close the dropdown options if user clicks outside
	document.addEventListener("click", function (event) {
		if (!categoryDropdown.contains(event.target)) {
			dropdownOptions.classList.remove("show-options");
		}
	});

	//function to add the items to the card
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

const showModalBtn = document.getElementById("showModalBtn");
const addProductModal = document.getElementById("addProductModal");
const modalContainer = document.getElementById("modalContainer");

function showModal() {
	addProductModal.classList.add("show");
	modalContainer.classList.add("show");
}

// Function to hide the modal
function hideModal() {
	addProductModal.classList.remove("show");
	modalContainer.classList.remove("show");
}

// Event listener for the button click to show the modal
showModalBtn.addEventListener("click", showModal);

// Optional: Close the modal when clicking outside of it
window.addEventListener("click", (event) => {
	if (event.target === addProductModal) {
		hideModal();
	}
});

// Optional: Close the modal when pressing the Escape key
window.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		hideModal();
	}
});

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

// Select the form by its ID
document.getElementById("addForm").addEventListener("submit", function (event) {
	event.preventDefault();

	// Gather form data
	const formData = new FormData(this);
	const requestData = {};
	formData.forEach(function (value, key) {
		requestData[key] = value;
	});

	// Send POST request using Axios
	axios
		.post("http://localhost:3000/products", requestData)
		.then(function (response) {
			alert("Data sent successfully:", response.data);
			window.location.reload();
		})
		.catch(function (error) {
			console.error("Error sending data:", error);
			// Handle errors during data submission
		});
});

async function handleDeleteProduct(productId) {
	const confirmDelete = window.confirm(
		"Are you sure you want to delete this product?"
	);
	if (confirmDelete) {
		try {
			const response = await axios.delete(
				`http://localhost:3000/products/${productId}`
			);
			console.log("Product deleted:", response.data);
			window.location.reload();
		} catch (error) {
			console.error("Error deleting product:", error);
		}
	} else {
		console.log("Deletion cancelled");
	}
}
