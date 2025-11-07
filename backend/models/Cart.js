
import mongoose from 'mongoose';

const cartItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
});

const cartSchema = mongoose.Schema({
    
    items: [cartItemSchema],
    createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;