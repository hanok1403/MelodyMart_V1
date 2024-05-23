import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import mongoose from 'mongoose'

import LoginController from './controllers/LoginController.js'
import SignupController from './controllers/SignupController.js'
import ProductController from './controllers/ProductController.js'
import adminRouter from './router/adminRouter.js'


dotenv.config()
mongoose.connect(process.env.DBClient).then(response => console.log("Connected to DB")).catch(error => console.log("Cannot cannot to DB..!"))

const PORT = process.env.PORT
const app = express()

app.use('/admin', adminRouter)
app.use(express.urlencoded({extended:true}))

app.post('/signup',async(req, res)=>{
    if(await SignupController(req, res)){
        res.send("User Created..!")
    }
    else{
        res.send("User Creation failed. Please Try again..!")
    }
})

app.post('/login',async (req, res)=>{
    if(await LoginController(req, res)){
        res.send("User found")
    }
    else{
        res.send("User not found")
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})