import { applySorting } from "./fetchData.js";
import { products, filteredProducts } from "./fetchData.js";

export const applyFilters = () => {
  const selectedCategories = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  ).map((cb) => cb.value);

  const searchQuery = document.getElementById("search").value.toLowerCase();

  filteredProducts.length = 0;
  filteredProducts.push(
    ...products.filter(({ category, title }) => {
      const inCategory = selectedCategories.length
        ? selectedCategories.includes(category)
        : true;
      const matchesSearch = title.toLowerCase().includes(searchQuery);
      return inCategory && matchesSearch;
    })
  );

  applySorting();
};
