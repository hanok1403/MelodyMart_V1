const express = require('express')
require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')

//DB Client
mongoose.connect(process.env.DBClient).then(response => console.log("Connected to DB")).catch(error => console.log("Cannot cannot to DB..!"))

//Todo: move to controllers

const LoginController = require('./controllers/LoginController')
const SignupController = require('./controllers/SignupController')


//


const PORT = process.env.PORT
const app = express()

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.urlencoded({extended:true}))

app.post('/signup',async(req, res)=>{
    if(await SignupController(req, res)){
        res.send("User Created..!")
    }
    else{
        res.send("User Creation failed. Please Try again..!")
    }
})

//testing
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