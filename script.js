const products = [
  { id: 1, name: 'Laptop', price: 60000 },
  { id: 2, name: 'Phone', price: 25000 },
  { id: 3, name: 'Headphones', price: 2000 }
];

const productContainer = document.getElementById('products');
if (productContainer) {
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<h3>${p.name}</h3><p>₹${p.price}</p><button onclick="addToCart(${p.id})">Add to Cart</button>`;
    productContainer.appendChild(div);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to Cart');
}

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
