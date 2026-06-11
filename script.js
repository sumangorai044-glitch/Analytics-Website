window.addToCart = function(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === id);

  if (!product) {
    console.error("❌ Product not found");
    return;
  }

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  console.log("✅ Add to Cart clicked:", product.name);

  // ✅ ✅ CORRECT GA4 EVENT (USE THIS)
  if (typeof gtag === "function") {
    gtag('event', 'add_to_cart', {
      product_name: product.name,
      product_price: product.price,
      action_type: 'add_to_cart',
      debug_mode: true
    });
    console.log("✅ GA event sent");
  } else {
    console.error("❌ gtag not found");
  }

  alert(product.name + ' added to Cart');
};
