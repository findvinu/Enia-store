document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const categorySelect = document.getElementById("category");
  const priceRange = document.getElementById("price");
  const availabilitySelect = document.getElementById("availability");
  const searchInput = document.getElementById("search");
  const loadMoreButton = document.getElementById("load-more");
  const priceValue = document.getElementById("price-value");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  const pageNumbersContainer = document.getElementById("page-numbers");

  let products = [];
  let currentPage = 0;
  const itemPerPage = 10;
  let totalPages = 0;

  const showLoading = () => {
    productList.innerHTML = `<div class="loading">Loading...</div>`;
  };

  const hideLoading = () => {
    const loadingIndicator = document.querySelector(".loading");
    if (loadingIndicator) loadingIndicator.remove();
  };

  const fetchProducts = async () => {
    showLoading();
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      products = await response.json();
      console.log("products", products);
      renderProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const renderProducts = () => {
    const filterProducts = products
      /*  .filter((product) => {
        return (
          (categorySelect.value === "" ||
            product.category === categorySelect.value) &&
          (availabilitySelect.value === "" ||
            product.available === availabilitySelect.value) &&
          product.price >= priceRange.value.split(" - ")[0] &&
          product.price <= priceRange.value.split(" - ")[1]
        );
      }) */
      .slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage);

    productList.innerHTML = filterProducts
      .map(
        (product) => `
          <div class="product-list__item">
          <div class="product-list__image-container">
                <img src="${product.image}" alt="${product.title}" class="product-list__image">
                </div>
                <h3 class="product-list__title">${product.title}</h3>
                <p class="product-list__description">${product.description}</p>
                <span class="product-list__price">$${product.price}</span>
                <div class="product-list__icon">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#1B252C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>

            </div>
        `
      )
      .join("");
  };

  /*   loadMoreButton.addEventListener("click", () => {
    currentPage += 1;
    renderProducts();
  });

  searchInput.addEventListener("input", () => {
    renderProducts();
  }); 

  categorySelect.addEventListener("change", () => {
    renderProducts();
  });

  priceRange.addEventListener("input", () => {
    priceValue.textContent = `${priceRange.value} - 1000`;
    renderProducts();
  });

  availabilitySelect.addEventListener("change", () => {
    renderProducts();
  });
*/
  fetchProducts();
});
