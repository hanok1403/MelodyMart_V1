const mongoose = require('mongoose')
const cartModel = require('./CartModel')
const orderModel = require('./OrderModel')


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        unique:true
    },
    active:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'user'
    }
    // cart:{
    //     type:cartModel,
    //     default:[]
    // },
    // ordersList:{
    //     type:[orderModel],
    //     default:[]
    // }
})

const userModel = mongoose.model('Users', userSchema)

module.exports = userModel