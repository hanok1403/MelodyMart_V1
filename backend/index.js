const express = require('express')
require('dotenv').config()
const path = require('path')


const PORT = process.env.PORT
const app = express()

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/home',(req, res)=>{
    res.json({
        "users":[
            {"id":1,"name":"John","age":30},
            {"id":2,"name":"Mike","age":25},
            {"id":3,"name":"Jane","age":20}
        ]
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})