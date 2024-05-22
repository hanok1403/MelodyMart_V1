import mongoose from 'mongoose'
const cartSchema = mongoose.Schema({
    cartItemId:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    Quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

const cartModel = mongoose.model('Carts', cartSchema)

export default cartModel;