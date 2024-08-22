import { renderProducts } from "./renderUtils.js";
import { products, filteredProducts } from "./fetchData.js";

export const handleHeartClick = (event) => {
  const heartIcon = event.target.closest(".product-list__icon-heart");
  if (!heartIcon) return;

  const productId = heartIcon.closest(".product-list__item").dataset.id;
  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) return;

  const cartCountElement = document.querySelector(".header__cart-count");
  let cartCount = parseInt(cartCountElement.textContent);

  if (product.rating.liked) {
    product.rating.liked = false;
    cartCount--;
  } else {
    product.rating.liked = true;
    cartCount++;
  }

  cartCountElement.textContent = cartCount;
  renderProducts(filteredProducts);
};
