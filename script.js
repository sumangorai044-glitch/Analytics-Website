const products = [
  { id: 1, name: 'Laptop', price: 60000 },
  { id: 2, name: 'Phone', price: 25000 },
  { id: 3, name: 'Headphones', price: 2000 }
];

const productContainer = document.getElementById('products');

// ✅ Render products
if (productContainer) {
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productContainer.appendChild(div);
  });
}

// ✅ ✅ FINAL CORRECT FUNCTION
window.addToCart = function(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === id);

  if (!product) return;

  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  console.log("✅ Add to Cart clicked:", product.name);

  // ✅ ✅ USE THIS ONLY (NOT dataLayer)
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

// ✅ Render cart
const cartContainer = document.getElementById('cart');

if (cartContainer) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>No items in cart</p>';
  } else {
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `${item.name} - ₹${item.price}`;
      cartContainer.appendChild(div);
    });
  }
}
