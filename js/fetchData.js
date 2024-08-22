import { displayLoadingIndicator, removeLoadingIndicator } from "./uiUtils.js";
import { renderProducts, updateResultCount } from "./renderUtils.js";

export let products = [];
export let filteredProducts = [];
export let currentIndex = 0;
export const itemsPerLoad = 10;

export const fetchData = async () => {
  displayLoadingIndicator();
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();
    console.log(products);
    filteredProducts = products.slice(0, itemsPerLoad);
    renderProducts(filteredProducts);
    updateResultCount(filteredProducts.length);
    removeLoadingIndicator();

    if (products.length > itemsPerLoad) {
      document.getElementById("load-more").style.display = "block";
    }
  } catch (error) {
    document.getElementById("product-list").innerHTML =
      "<p>Error loading products. Please try again.</p>";
    removeLoadingIndicator();
  }
};

export const applySorting = () => {
  const sortOption = document.getElementById("sort").value;

  if (sortOption === "price") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "category") {
    filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
  } else if (sortOption === "range") {
    filteredProducts.sort((a, b) => b.price - a.price); // Placeholder for range logic
  } else if (sortOption === "availability") {
    filteredProducts.sort((a, b) => b.rating.count - a.rating.count);
  }

  renderProducts(filteredProducts.slice(0, currentIndex + itemsPerLoad));
  updateResultCount(filteredProducts.length);
};

export const loadMoreProducts = () => {
  currentIndex += itemsPerLoad;
  const moreProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerLoad
  );
  filteredProducts = [...filteredProducts, ...moreProducts];
  applySorting();
  renderProducts(filteredProducts);
  updateResultCount(filteredProducts.length);

  if (filteredProducts.length >= products.length) {
    document.getElementById("load-more").style.display = "none";
  }
};
