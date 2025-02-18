document.addEventListener('DOMContentLoaded', () => {
  const cart = document.getElementById('cart');
  const cartItems = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');
  const menuGrid = document.getElementById('menu');
  const searchInput = document.getElementById('search');
  let cartTotal = 0;
  let menuData = [];

  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      menuData = data;
      renderMenu(menuData); 
    })
    .catch(error => console.error('Error fetching menu data:', error));

  function renderMenu(items) {
    menuGrid.innerHTML = '';
    items.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');
      menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text">INR ${item.price}</p>
          <button class="add-to-cart-btn" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
        </div>
      `;
      menuGrid.appendChild(menuItem);
    });
  }

  menuGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const itemName = e.target.getAttribute('data-name');
      const itemPrice = parseFloat(e.target.getAttribute('data-price'));

      const cartItem = document.createElement('li');
      cartItem.textContent = `${itemName} - INR ${itemPrice}`;
      cartItems.appendChild(cartItem);

      cartTotal += itemPrice;
      totalAmount.textContent = `Total: INR ${cartTotal}`;

      if (cart.hidden) {
        cart.hidden = false;
        cart.classList.add('visible');
      }
    }
  });

  document.getElementById('order-now').addEventListener('click', () => {
    alert(`Your order placed successfully. Your total amount is INR ${cartTotal}. Thank you!`);
    cartItems.innerHTML = '';
    cartTotal = 0;
    totalAmount.textContent = 'Total: INR 0';
    cart.hidden = true;
    cart.classList.remove('visible');
  });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = menuData.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
    renderMenu(filteredItems); 
  });
});

document.getElementById("pay-now-btn").addEventListener("click", function(event) {
  event.preventDefault(); 

  const imageSrc = document.querySelector("#image-container img").src;

  window.open(imageSrc, "_blank");
});