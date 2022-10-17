const mongoose = require('mongoose')

const Schema = mongoose.Schema
const imgSchema = new Schema({
    image: {
        type: String,
        required: false,
        // data: Buffer,
        // contentType: String
    },
},
{
    timestamps: true
});

const Img = mongoose.model('Img', imgSchema);

module.exports = Img;