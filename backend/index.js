const express = require('express')
require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')

//DB Client
mongoose.connect(process.env.DBClient).then(response => console.log("Connected to DB")).catch(error => console.log("Cannot cannot to DB..!"))

//Todo: move to controllers
const userModel = require('./models/UserModel')


const PORT = process.env.PORT
const app = express()

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.urlencoded({extended:true}))

//testing
app.post('/login',(req, res)=>{
    console.log(req.body)
    data = req.body
    userModel.create(data)
    res.json({data})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})