
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

export const fetchProducts = () => API.get('/products');
export const fetchCart = () => API.get('/cart');
export const addItemToCart = (productId, qty = 1) => API.post('/cart', { productId, qty });
export const removeItemFromCart = (itemId) => API.delete(`/cart/${itemId}`);
export const checkout = (cartItems, total, customerDetails) => 
    API.post('/cart/checkout', { 
        cartItems, 
        total, 
        ...customerDetails 
    });