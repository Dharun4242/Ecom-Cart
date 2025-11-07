
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    
    image: { type: String, default: '/images/placeholder.jpg' }, 
});

const Product = mongoose.model('Product', productSchema);

export default Product;