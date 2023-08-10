// Sample hardcoded product data
const products = [
	{
		id: 1,
		name: "Ryzen 9 5950X",
		price: "Rp. 6.000.000,00",
		imageSrc: "/images/Amd Ryzen 9.png",
		description:
			"The Ryzen 9 5950X is a high-performance CPU engineered by AMD to deliver exceptional computing power. With its cutting-edge architecture, this processor boasts an impressive 16 cores and 32 threads, providing unparalleled multitasking capabilities and fluid performance. Whether you're a creative professional requiring raw processing power or a dedicated gamer seeking seamless gameplay, the Ryzen 9 5950X stands as an ideal choice. Its advanced technology optimizes power efficiency while maintaining impressive clock speeds, ensuring that even the most demanding tasks are executed effortlessly. Experience the future of computing with the Ryzen 9 5950X.",
		specifications: [
			"Cores: 16",
			"Threads: 32",
			"Base Clock: 3.4 GHz",
			"Max Boost Clock: 4.9 GHz",
		],
	},
	{
		id: 2,
		name: "ASUS RTX 4090",
		price: "Rp. 6.000.000,00",
		imageSrc: "/images/RTX 4090.png",
		description:
			"The RTX 4090 is anticipated to be NVIDIA's flagship graphics card, representing the pinnacle of cutting-edge gaming and rendering performance. With advancements in technology and architecture, the RTX 4090 is expected to deliver unprecedented levels of realism, speed, and efficiency for gamers, content creators, and professionals alike.",
		specifications: [
			"Architecture: Next-generation NVIDIA architecture",
			"CUDA Cores: Increased number for enhanced processing power",
			"Ray Tracing Cores: More ray tracing cores for improved real-time ray tracing",
			"Tensor Cores: Enhanced AI capabilities for improved performance and features",
			"Memory: Larger and faster GDDR6X or HBM memory",
			"Memory Interface: Wider memory interface for improved bandwidth",
			"Clock Speeds: Higher base and boost clock speeds",
		],
	},
];

// Function to get the selected product ID from query parameter
function getProductIdFromUrl() {
	const params = new URLSearchParams(window.location.search);
	return params.get("productId");
}

// Function to populate product details on the page
function populateProductDetails(product) {
	const productImage = document.getElementById("product-image");
	const productName = document.getElementById("product-name");
	const productPrice = document.getElementById("product-price");
	const specificationsList = document.getElementById("product-specifications");
	const productDescription = document.getElementById("product-description");

	productImage.src = product.imageSrc;
	productName.textContent = product.name;
	productPrice.textContent = product.price;

	const descriptionParagraph = document.createElement("p");
	descriptionParagraph.innerHTML = product.description;
	productDescription.appendChild(descriptionParagraph);

	product.specifications.forEach((spec) => {
		const specItem = document.createElement("li");
		specItem.textContent = spec;
		specificationsList.appendChild(specItem);
	});
}

// Page initialization
window.addEventListener("DOMContentLoaded", () => {
	const productId = getProductIdFromUrl();
	const selectedProduct = products.find(
		(product) => product.id === parseInt(productId)
	);

	if (selectedProduct) {
		populateProductDetails(selectedProduct);
	} else {
		// Handle case where product is not found
		console.log("Product not found");
	}
});
