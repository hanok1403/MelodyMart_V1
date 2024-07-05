import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    userId: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    cartData:{
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentType:{
        type: String,
        required:true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "order placed",
        required: true
    }
});

const orderModel = mongoose.model('Orders', orderSchema);

export default orderModel;
