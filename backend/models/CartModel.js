import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        required: true
    },
    productId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Product',
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    imageUrl:{
        type:String,
        required:true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const cartModel = mongoose.model('Carts', cartSchema);

export default cartModel;
