const productList = document.getElementById("product-list");
const loadMoreBtn = document.getElementById("load-more");
const resultCountSpan = document.querySelector(".product-list__result-count");
let products = [];
let filteredProducts = [];
let currentIndex = 0;
const itemsPerLoad = 10;

// Function to display shimmer/loading indicator
const displayLoadingIndicator = () => {
  productList.innerHTML += '<div class="loading shimmer">Loading...</div>';
};

// Function to remove shimmer/loading indicator
const removeLoadingIndicator = () => {
  const loading = document.querySelector(".loading");
  loading && loading.remove();
};

// Fetch data from API
const fetchData = async () => {
  displayLoadingIndicator();
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();
    console.log(products);
    filteredProducts = products.slice(0, itemsPerLoad);
    renderProducts(filteredProducts);
    updateResultCount(filteredProducts.length);
    removeLoadingIndicator();
    if (products.length > itemsPerLoad) loadMoreBtn.style.display = "block";
  } catch (error) {
    productList.innerHTML = "<p>Error loading products. Please try again.</p>";
  }
};

// Render products to the page
const renderProducts = (products) => {
  productList.innerHTML = products
    .map(
      ({ image, title, description, price, category, rating, id }) => `
        <div class="product-list__item" data-id="${id}">
         
         
          <h3 class="product-list__title">${title}</h3>
           <div class="product-list__image-container">
            <img src="${image}" alt="${title}" class="product-list__image">
          </div>
           <div class="product-list__footer">
            <span class="product-list__price">$${price}</span>
            <span class="product-list__category">${category}</span>
          </div>
          <p class="product-list__description">${description}</p>
          <div class="product-list__footer product-list__available">            
            <div class="product-list__icon">
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="heart-icon ${
                rating.liked ? "product-list__icon-select" : ""
              }">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#1B252C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="product-list__availability">${
              rating.count > 0
                ? `Available: <span>${rating.count} in stock</span>`
                : "Out of Stock"
            }</span>
          </div>
        </div>
      `
    )
    .join("");

  // Add event listeners to heart icons
  document.querySelectorAll(".heart-icon").forEach((icon) => {
    icon.addEventListener("click", handleHeartClick);
  });
};

// Handle heart icon click
const handleHeartClick = (event) => {
  const heartIcon = event.target.closest(".heart-icon");
  const productId = heartIcon.closest(".product-list__item").dataset.id;
  const product = products.find((p) => p.id === parseInt(productId));

  if (product) {
    // product.rating.count = product.rating.count + 1;
    product.rating.liked = !product.rating.liked; // Toggle heart state
    renderProducts(filteredProducts);
  }
};

// Update result count display
const updateResultCount = (count) => {
  resultCountSpan.textContent = `${count} Results`;
};

// Load more products on clicking "Load More"
const loadMoreProducts = () => {
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
    loadMoreBtn.style.display = "none";
  }
};

// Sorting function
const applySorting = () => {
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

  // Render sorted products
  renderProducts(filteredProducts.slice(0, currentIndex + itemsPerLoad));
  updateResultCount(filteredProducts.length);
};

// Apply filters for search, category, and sorting
const applyFilters = () => {
  const selectedCategories = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  ).map((cb) => cb.value);
  const searchQuery = document.getElementById("search").value.toLowerCase();

  filteredProducts = products.filter(({ category, title }) => {
    const inCategory = selectedCategories.length
      ? selectedCategories.includes(category)
      : true;
    const matchesSearch = title.toLowerCase().includes(searchQuery);
    return inCategory && matchesSearch;
  });

  // Call sorting function after filtering
  applySorting();
};

// Event Listeners for search, category, sorting, and load more button
document.getElementById("search").addEventListener("input", applyFilters);
document
  .querySelectorAll('input[name="category"]')
  .forEach((cb) => cb.addEventListener("change", applyFilters));

// Sorting based on dropdown selection
document.getElementById("sort").addEventListener("change", applyFilters);
loadMoreBtn.addEventListener("click", loadMoreProducts);

// Initial data fetch
fetchData();
