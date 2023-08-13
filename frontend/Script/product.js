const productDetail = document.getElementById("product-details-container");

function formatCurrency(amount) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(amount);
}

async function fetchProductDetail(productId) {
	try {
		const response = await axios.get(
			`http://localhost:3000/products/${productId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching product detail:", error);
		return null;
	}
}

async function displayProductDetail() {
	const urlParams = new URLSearchParams(window.location.search);
	const productId = urlParams.get("id");

	if (!productId) {
		console.error("No product ID found in URL.");
		return;
	}

	const product = await fetchProductDetail(productId);

	if (!product) {
		console.error("Product not found.");
		return;
	}

	const productName = document.getElementById("product-name");
	productName.textContent = product.name;

	const productImg = document.getElementById("product-image");
	productImg.src = product.imageSrc;

	const productDescription = document.getElementById("product-description");
	productDescription.textContent = product.description;

	const productPrice = document.getElementById("product-price");
	productPrice.textContent = formatCurrency(product.price);

	const specList = document.getElementById("product-specifications");
	product.specifications.forEach((spec) => {
		const li = document.createElement("li");
		li.textContent = spec;
		specList.appendChild(li);
	});
}

window.addEventListener("load", displayProductDetail);
