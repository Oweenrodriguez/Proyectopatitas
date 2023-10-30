const cart = [];

function updateCartView() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartList.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        // Botón para eliminar el producto del carrito
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => {
            // Elimina el producto del carrito
            cart.splice(index, 1)
            updateCartView();
        });

        cartItem.appendChild(removeButton);
        cartList.appendChild(cartItem);

        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Maneja el evento de añadir al carrito para todos los botones
document.querySelectorAll('.add-to-cart').forEach(function(button) {
    button.addEventListener('click', function() {

        const price = parseFloat(button.getAttribute('data-price'));
        const name = button.parentElement.querySelector('h4').textContent;

        const cartItem = { name, price };


        const existingItem = cart.find(item => item.name === cartItem.name);

        if (existingItem) {

            alert('Este producto ya está en el carrito.');
        } else {
            cart.push(cartItem);
        }

        updateCartView();
    });
});

document.getElementById('confirm-purchase').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('El carrito está vacío. Agregá productos para poder confirmar la compra.');
    } else {
        const confirmPurchase = confirm('¿Estás seguro de que deseas confirmar la compra?');

        if (confirmPurchase) {
            cart.length = 0;
            updateCartView();
            alert('Compra confirmada. Muchas Gracias.');
        }
    }
});
