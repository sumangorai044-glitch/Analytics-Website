const products = [
  { id: 1, name: 'Laptop', price: 60000 },
  { id: 2, name: 'Phone', price: 25000 },
  { id: 3, name: 'Headphones', price: 2000 }
];

const productContainer = document.getElementById('products');

// ✅ Render products on products page
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

// ✅ ✅ GLOBAL addToCart (FIXED + GA tracking via dataLayer)
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

  // ✅ ✅ PUSH EVENT TO dataLayer (guaranteed GA4 capture)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'add_to_cart',
    product_name: product.name,
    product_price: product.price,
    action_type: 'add_to_cart',
    debug_mode: true
  });

  console.log("✅ dataLayer event pushed");

  alert(product.name + ' added to Cart');
};

// ✅ Render cart page
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
