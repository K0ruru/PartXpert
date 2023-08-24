const categoryDropdown = document.getElementById("category");
const dropdownSelectedOption = document.querySelector(
  ".dropdown-selected-option"
);
const dropdownOptions = document.querySelector(".dropdown-options");
const productCards = document.querySelectorAll(".product-card");
const cartItems = document.querySelector(".cart-items");
const totalPriceElement = document.querySelector(".total-price");

categoryDropdown.addEventListener("click", function () {
  dropdownOptions.classList.toggle("show-options");
});

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

// Add to cart functionality
productCards.forEach((card) => {
  card.addEventListener("click", function () {
    const itemName = card.querySelector(".product-name").textContent;
    const itemPrice = parseFloat(
      card.querySelector(".product-price").textContent.replace("Rp. ", "")
    );

    const cartItem = document.createElement("li");
    cartItem.textContent = `${itemName} - Rp. ${itemPrice.toFixed(2)}`;
    cartItems.appendChild(cartItem);

    updateTotalPrice(itemPrice);
  });
});

// Helper function to update total price
function updateTotalPrice(itemPrice) {
  const totalPrice = Array.from(cartItems.children).reduce((total, item) => {
    const price = parseFloat(item.textContent.match(/Rp\. (\d+\.\d+)/)[1]);
    console.log("Extracted price:", price); // Add this line
    return total + price;
  }, 0);

  totalPriceElement.innerHTML = `Total Price: Rp. ${totalPrice.toFixed(2)}`;
  console.log("Total price:", totalPrice); // Add this line
}

// Close the dropdown options if user clicks outside
document.addEventListener("click", function (event) {
  if (!categoryDropdown.contains(event.target)) {
    dropdownOptions.classList.remove("show-options");
  }
});
