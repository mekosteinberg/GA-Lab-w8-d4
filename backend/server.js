//==============================================
//===================DEPENDENCIES===============
//==============================================
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const Posts = require('./models/post')

//========================================
//===============ROUTES===================
//========================================
app.post('/blog', (req, res) => {
    Posts.create(req.body, (err, createdPost) => {
        res.json(createdPost)
    })
})

app.get('/blog', (req, res) => {
    Posts.find({}, (err, foundPost) => {
        res.json(foundPost)
    })
})

//====================
//======LISTENERS=====
//====================
app.listen(3000, () => {
    console.log('listening')
})

mongoose.connect('mongodb://localhost:27017/w08d04_lab')
mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})