let Items = [];

function addToCart(name, price) {
    const index = Items.findIndex(item => item.name === name);
    if (index !== -1) {
        Items[index].quantity += 1;
    } else {
        const item = {
            name: name,
            price: price,
            quantity: 1
        };
        Items.push(item);
    }
    updateCartDisplay();
}

function deleteFromCart(index) {
    Items.splice(index, 1);
    updateCartDisplay();
}

function updateQuantity(index, quantity) {
    const newQuantity = Math.max(1, parseInt(quantity));
    Items[index].quantity = newQuantity;
    updateCartDisplay();
}

function checkout() {
    let totalPrice = 0;
    Items.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    alert(`Total price: $${totalPrice.toFixed(2)}`);
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cart-items');
    cartElement.innerHTML = '';
    Items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <div class="quantity">
                <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" min="1" max="10" onchange="updateQuantity(${index}, this.value)">
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>
            <button onclick="deleteFromCart(${index})">Delete</button>
        `;
        cartElement.appendChild(li);
    });
}
