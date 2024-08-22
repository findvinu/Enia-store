export const displayLoadingIndicator = () => {
  document.getElementById("product-list").innerHTML +=
    '<div class="loading shimmer">Loading...</div>';
};

export const removeLoadingIndicator = () => {
  const loading = document.querySelector(".loading");
  loading && loading.remove();
};
