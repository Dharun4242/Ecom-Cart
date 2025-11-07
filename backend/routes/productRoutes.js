
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();


const mockProducts = [
    { name: 'Vintage Camera', price: 299.99, image: 'camera.jpg' },
    { name: 'Leather Wallet', price: 45.00, image: 'wallet.jpg' },
    { name: 'Wireless Headphones', price: 129.50, image: 'headphones.jpg' },
    { name: 'Organic Coffee Beans', price: 18.75, image: 'coffee.jpg' },
    { name: 'Minimalist Desk Lamp', price: 75.20, image: 'lamp.jpg' },
    { name: 'Portable Charger', price: 35.00, image: 'charger.jpg' },
    { name: 'Smart Watch', price: 199.99, image: 'watch.jpg' },
];

const seedProducts = async () => {
    const count = await Product.countDocuments();
    if (count === 0) {
        console.log('Seeding products...');
        await Product.insertMany(mockProducts);
    }
};


router.get('/', async (req, res) => {
    try {
        await seedProducts(); 
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;