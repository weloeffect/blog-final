const mongoose = require('mongoose')

const Schema = mongoose.Schema
const roleSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        
    },
    description: {
        type: String,
        required: true,
        enum: ['userRole','adminRole'],
        
        
    },
    
   
},
{
    timestamps: true
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;