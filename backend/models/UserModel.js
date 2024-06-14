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
    cart:{
        type:Array,
        default:[]
    },
    ordersList:{
        type:Array,
        default:[]
    }
})

const userModel = mongoose.model('Users', userSchema)

export default userModel;