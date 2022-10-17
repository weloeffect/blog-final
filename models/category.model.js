const mongoose = require('mongoose');


const Schema = mongoose.Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        unique: false,
        minlength: 3
    }, 
    slug: {
        type: String,
        required: false,
        unique: false,
        default: "",
        minlength: 3
    }, 
    posts:[{
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: false,
       
    }],
    
   
},
{
    timestamps: true
});



const Category = mongoose.model('Categories', categorySchema);

module.exports = Category;