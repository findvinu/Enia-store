import { handleHeartClick } from "./heartUtils.js";

export const renderProducts = (products) => {
  const productList = document.getElementById("product-list");
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
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="product-list__icon-heart ${
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

  document.querySelectorAll(".product-list__icon-heart").forEach((icon) => {
    icon.addEventListener("click", handleHeartClick);
  });
};

export const updateResultCount = (count) => {
  document.querySelector(
    ".product-list__result-count"
  ).textContent = `${count} Results`;
};
