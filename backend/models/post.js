const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    date: String,
    image: String,
    content: String
})

const Posts = mongoose.model('Post', postSchema)

module.exports = Posts;