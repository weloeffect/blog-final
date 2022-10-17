const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
  
    firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        
    },
    role_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Role',
        required: true,   
    },
    posts:[{
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
    }]
   
},
{
    timestamps: true
});

const Test = mongoose.model('Test', userSchema);

module.exports = Test;