import { fetchData, loadMoreProducts } from "./fetchData.js";
import { applyFilters } from "./filters.js";

// Event Listeners for search, category, sorting, and load more button
document.getElementById("search").addEventListener("input", applyFilters);
document
  .querySelectorAll('input[name="category"]')
  .forEach((cb) => cb.addEventListener("change", applyFilters));
document.getElementById("sort").addEventListener("change", applyFilters);
document
  .getElementById("load-more")
  .addEventListener("click", loadMoreProducts);

// Initial data fetch
fetchData();
