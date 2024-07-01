import mongoose from 'mongoose'

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
    },
    active:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'user'
    },
    ordersList:{
        type:Array,
        default:[]
    }
})

const userModel = mongoose.model('User', userSchema)

export default userModel;