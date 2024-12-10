let cart = [];//Declares an empty array with the name called cart

// Favorites (persistent, stored in localStorage)
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//Define a function name called UpdateCart
function updateCart() {
    let cartTableBody = document.querySelector('#cart tbody'); /* Select the elements in cart's tbody and */
    let totalElement = document.querySelector('#total');/*Selects the element with id="total", where the total price of all items in the cart will be displayed. */
    cartTableBody.innerHTML = ''; // Clear the cart table
    let total = 0;//Initializes a variable called total

    // Populate the cart table
    cart.forEach((item, index) => { /*Loop through the each item in the cart array */ 
        const row = document.createElement('tr');// Creates a new row for each item in the cart
        row.innerHTML = `
            <td>${item.name}</td> 
            <td>${item.quantity}</td>
            <td>Rs.${item.price}</td> 
            <td>Rs.${(item.quantity * item.price)}</td>
            <td><button class="remove" data-index="${index}">Remove</button></td>
        `;
        cartTableBody.appendChild(row); /*Adds the newly created <tr> row to the <tbody> of the cart table. */
        total += item.quantity * item.price; /*Adds the total of the current items in the cart */
    });

    // Update the total price and toFixed means fomatting to the 2 decimal places
    totalElement.textContent = `Rs.${total.toFixed(2)}`;
}

// Creates a function called addTocart with a argument
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);//This line searches the cart array to see if any item in the cart has the same name as the product being added.
    alert('Item successfully added to your cart!')//A alert message is pop up when a item is add
    if (existingItem) {
        existingItem.quantity += product.quantity; /*If a existing item is found it will increase the quantity */ 
    } else {
        cart.push(product);/* If no match product is found the product is add to the cart */
    }

    updateCart();// The update function is called
}

// This defines a function called removeFromCart, which takes a parameter index
function removeFromCart(index) {
    cart.splice(index,1); // Remove the item at the specified index
    updateCart();//Then the updateCart function is called

    // Update localStorage if the cart is also saved in favorites
    favorites = favorites.filter((item, favIndex) => favIndex !== parseInt(index));
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Save the current cart to favorites
function saveFavorites() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add items before saving to favorites.');
        return;
    }

    favorites = [...cart]; // Copy the cart items to favorites
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Cart saved to favorites!');
}

// Apply favorites to the current cart
function applyFavorites() {
    if (favorites.length === 0) {
        alert('No favorites found. Add items to favorites first.');
        return;
    }

    cart = [...favorites]; // Replace the current cart with favorites
    updateCart();
    alert('Your saved favorites have been successfully loaded into your cart!');

}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const quantityInput = button.previousElementSibling;
        const quantityValue = parseFloat(quantityInput.value);

        // Check for invalid quantity (decimal or non-positive numbers)
        if (!Number.isInteger(quantityValue) || quantityValue <= 0) {
            alert('Quantity must be a whole number greater than 0.');
            quantityInput.value = 1; // Reset to a valid default
            return;
        }

        const product = {
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            quantity: quantityValue
        };

        addToCart(product);
    });
});

// Event listener for removing items from the cart
document.querySelector('#cart').addEventListener('click', event => {
    if (event.target.classList.contains('remove')) {
        const index = event.target.dataset.index;

        // Remove from cart
        removeFromCart(index);

        // Update localStorage if items are also saved in favorites
        favorites = favorites.filter((item, favIndex) => favIndex !== parseInt(index));
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
});

document.querySelector('#buyNow').addEventListener('click', (event) => {
    // Prevent default behavior (e.g., form submission, if any)
    event.preventDefault();

    if (cart.length === 0) {
        alert('Your cart is empty. Add items before proceeding.');
        return; // Stop further execution
    }

    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to the Buy Now page
    window.location.href = 'BuyNow.html';
});



// Event listener for "Add to Favorites"
document.getElementById('addToFavorites').addEventListener('click', saveFavorites);

// Event listener for "Apply Favorites"
document.getElementById('applyFavorites').addEventListener('click', applyFavorites);

// Update cart display on page load
document.addEventListener('DOMContentLoaded', updateCart);
