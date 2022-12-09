const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    date: String,
    image: String,
    content: String
})

const Posts = mongoose.model('Posts', postSchema)

module.exports = Posts;