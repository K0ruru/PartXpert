document.addEventListener("DOMContentLoaded", function () {
  const products = [
    {
      id: 1,
      name: "Ryzen 9 5950X",
      price: "Rp. 6000000",
      imageSrc: "/images/Amd Ryzen 9.png",
      description: "The Ryzen 9 5950X is a high-performance CPU...",
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
      price: "Rp. 12000000",
      imageSrc: "/images/RTX 4090.png",
      description: "The RTX 4090 is anticipated to be NVIDIA's flagship...",
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

  const cartItems = [];

  function updateLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

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
});
