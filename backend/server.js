//==============================================
//===================DEPENDENCIES===============
//==============================================
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const Posts = require('./models/post')

//==============================================
//====================MIDDLEWARE================
//==============================================
app.use(express.json());
app.use(cors())

//==============================================
//====================ROUTES====================
//==============================================
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

app.delete('/blog/:id', (req, res) => {
    Posts.findByIdAndRemove(req.params.id, (err, deletedPost) => {
        res.json(deletedPost)
    })
})

app.put('/blog/:id', (req, res) => {
    Posts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPost) => {
        res.json(updatedPost)
    })
})

//==============================================
//==================LISTENERS===================
//==============================================
app.listen(3000, () => {
    console.log('listening')
})

mongoose.connect('mongodb://localhost:27017/w08d04_lab')
mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})