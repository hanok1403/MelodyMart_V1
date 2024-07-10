import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import userModel from './models/UserModel.js';
import adminRouter from './router/adminRouter.js'
import userRouter from './router/userRouter.js'
import pkg from 'jsonwebtoken';

dotenv.config()
mongoose.connect(process.env.DBClient).then(response =>  console.log("Connected to DB")).catch(error =>  console.log("Cannot cannot to DB..!"))

const PORT = process.env.PORT || 5001
const app = express()
const JWT_SECRET = 'your_secret_key'; 
const { sign } = pkg;

app.use(cors());
app.use('/admin', adminRouter)
app.use('/', userRouter)
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/login',async (req, res)=>{
    // // console.log(req.body);
    try {
        const user = req;
        // // console.log(user)
        const login = {
            email: req.body.email,
            password: req.body.password
        };
        
       
        const data = await userModel.findOne(login);
        // console.log("data   ", data)
        if (!data)
            throw new Error("User not found");
        
        const token = generateToken(login);

        res.status(200).json({
            user:{
                id:data._id, 
                username:data.username,
                email:data.email,
                mobileNumber:data.mobileNumber
            },
            token: token,
            role:data.role
        });
    } catch (error) {
        
        res.status(500).json( {
            message: 'Error Logging in',
            error: error.message
        });
    }
    // // console.log(data)
    
    
})
app.post('/signup',async (req,res)=>{
    const { email, password, username, mobileNumber } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists', userExists: true });
    }

    const newUser = new userModel({
      email,
      password,
      username,
      mobileNumber,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

function generateToken(user) {
    const payload = {
        id: user._id, 
        email: user.email,
        role: user.role
    };
    return sign(payload, JWT_SECRET, { expiresIn: '24h' }); 
}

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})