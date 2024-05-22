import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    orderId:{
        type: String,
        required: true,
        unique: true
    },
    userId:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }
    // price:{
    //     type: Number,
    //     required: true
    // }
})

const orderModel = mongoose.model('Orders', orderSchema)

export default orderModel;