import mongoose from 'mongoose'

const loginSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const loginModel = mongoose.model('Logins', loginSchema)

export default loginModel;