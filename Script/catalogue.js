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
