document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.querySelector('#cart tbody');
    const grandTotalElement = document.querySelector('#total');
    const deliveryFee = 250;
    const totalCostElement = document.querySelector('#order-total');
    const buyNowButton = document.querySelector('.pay-btn');
    const paymentModal = document.querySelector('#payment-modal');
    const cashOnDeliveryButton = document.querySelector('#cash-on-delivery');
    const cardPaymentButton = document.querySelector('#card-payment');
    const cardDetailsForm = document.querySelector('#card-details-form');
    const submitCardDetailsButton = document.querySelector('#submit-card-details');
    
    // Form input elements
    const fullName = document.querySelector('#full-name');
    const phone = document.querySelector('#phone');
    const province = document.querySelector('#province');
    const district = document.querySelector('#district');
    const building = document.querySelector('#building');
    const colony = document.querySelector('#colony');
    const address = document.querySelector('#address');

    const tempCart = JSON.parse(sessionStorage.getItem('tempCart')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let grandTotal = 0;

    function calculateTotals(items) {
        cartTableBody.innerHTML = '';
        grandTotal = 0;

        items.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>Rs.${item.price.toFixed(2)}</td>
                <td>Rs.${(item.quantity * item.price).toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
            grandTotal += item.quantity * item.price;
        });

        grandTotalElement.textContent = `Rs.${grandTotal.toFixed(2)}`;
        const totalCost = grandTotal + deliveryFee;
        totalCostElement.textContent = `Total Cost: Rs.${totalCost.toFixed(2)}`;
    }

    const activeCart = tempCart.length > 0 ? tempCart : cart;
    calculateTotals(activeCart);

    buyNowButton.addEventListener('click', () => {
        // Check if all delivery information fields are filled out
        if (!fullName.value || !phone.value || !province.value || !district.value || 
            !building.value || !colony.value || !address.value) {
            alert('Please fill out all delivery information before proceeding.');
            return;
        }

        if (activeCart.length === 0) {
            alert('Your cart is empty. Add items to the cart before proceeding.');
            return;
        }

        // Show the payment modal
        paymentModal.style.display = 'block';
    });

    cashOnDeliveryButton.addEventListener('click', () => {
        paymentModal.style.display = 'none'; // Close modal
        sessionStorage.removeItem('tempCart');
        localStorage.removeItem('cart');
        // Add any further order processing logic here
        alert('Thank you for your purchase! Your items will be delivered in 3-5 business days.');
        
        // Redirect to the pharmacy page after the alert is dismissed
        window.location.href = 'Pharmcy.html'; // Replace 'pharmacy.html' with the correct URL for your pharmacy page
    });

    cardPaymentButton.addEventListener('click', () => {
        // Hide the cash on delivery button when card payment is selected
        cashOnDeliveryButton.style.display = 'none';
        cardDetailsForm.style.display = 'block'; // Show card details form
    });

    submitCardDetailsButton.addEventListener('click', () => {
        const cardNumber = document.querySelector('#card-number').value;
        const cvc = document.querySelector('#cvc').value;
        const expiryDate = document.querySelector('#expiry-date').value;

        if (!cardNumber || !cvc || !expiryDate) {
            alert('Please fill out all card details.');
            return;
        }

        alert('Thank you for your purchase! Your payment has been processed successfully. Your items will be delivered in 3-5 business days.');

        // Redirect to the pharmacy page after the alert is dismissed
        window.location.href = 'Pharmcy.html'; // Replace 'pharmacy.html' with the correct URL for your pharmacy page

        paymentModal.style.display = 'none'; // Close modal
        sessionStorage.removeItem('tempCart');
        localStorage.removeItem('cart');
        // Add any further order processing logic here
    });
});
