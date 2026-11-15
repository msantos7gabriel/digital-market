const catalogContainer = document.getElementById("catalog-container");

const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const productModal = document.getElementById("product-modal");

openModal.addEventListener("click", () => {
  productModal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  productModal.classList.remove("active");
});
