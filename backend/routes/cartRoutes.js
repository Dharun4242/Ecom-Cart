
import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = express.Router();

const getCart = async () => {
    
    let cart = await Cart.findOne({});
    if (!cart) {
        cart = await Cart.create({ items: [] });
    }
    return cart;
};


router.get('/', async (req, res) => {
    try {
        const cart = await getCart();
        
       
        const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.qty, 0);
        const shipping = subtotal > 100 ? 0 : 10; 
        const total = subtotal + shipping;

        res.json({
            items: cart.items,
            subtotal: parseFloat(subtotal.toFixed(2)),
            shipping: parseFloat(shipping.toFixed(2)),
            total: parseFloat(total.toFixed(2)),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    const { productId, qty } = req.body;
    
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cart = await getCart();
        const existingItemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (existingItemIndex > -1) {
            
            cart.items[existingItemIndex].qty += parseInt(qty, 10);
            if (cart.items[existingItemIndex].qty <= 0) {
                
                 cart.items.splice(existingItemIndex, 1);
            }
        } else {
        
            cart.items.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                qty: parseInt(qty, 10),
            });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await getCart();
        
      
        cart.items = cart.items.filter(item => 
            item._id.toString() !== id && item.productId.toString() !== id
        );

        await cart.save();
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/checkout', async (req, res) => {
    const { cartItems, total, name, email } = req.body; 

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty. Cannot checkout.' });
    }

    try {
       
        let cart = await getCart();
        cart.items = [];
        await cart.save();
        
        
        const receipt = {
            orderId: `VIBE-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            customer: { name, email },
            items: cartItems,
            finalTotal: total,
            timestamp: new Date().toISOString(),
            status: 'Order Placed (Mock)',
        };

        
        res.json(receipt);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;