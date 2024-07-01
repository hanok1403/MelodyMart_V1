import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import CartController from './controllers/CartController.js'
import LoginController from './controllers/LoginController.js'
import SignupController from './controllers/SignupController.js'
import adminRouter from './router/adminRouter.js'
import userRouter from './router/userRouter.js'


dotenv.config()
mongoose.connect(process.env.DBClient).then(response => console.log("Connected to DB")).catch(error => console.log("Cannot cannot to DB..!"))

const PORT = process.env.PORT
const app = express()

app.use(cors({
    origin: 'http://localhost:3000', // Replace with the correct origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use('/admin', adminRouter)
app.use('/', userRouter)
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// app.post('/signup',async(req, res)=>{
//     if(await SignupController(req, res)){
//         res.redirect('/login')
//     }
//     else{
//         res.send("User Creation failed. Please Try again..!")
//     }
// })

app.post('/login',async (req, res)=>{
    // console.log(req.body);
    const data = await LoginController(req, res);
    console.log(data)
    res.status(200).json(data);
    
})
app.post('/signup',async (req,res)=>{
    const data = await SignupController(req, res);
    console.log(data);
    res.status(200).json(data);
})

app.get('/cart/:id',async (req, res)=>{
    req.userId = req.params.id;
    res.send(await CartController(req, res))
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})