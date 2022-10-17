const mongoose = require('mongoose')

const Schema = mongoose.Schema
const postSchema = new Schema({
    thumbnail: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    slug: {
        type: String,
        required: false,
        unique: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 5,

    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: "Categories",
        required: true,
      
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false,
      
        

    },
    
   
},
{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;