const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const iceCreamSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    flavorName: {
        type: String,
        required: true,
    },
    flavorImage: String,
    brandName: {
        type: String,
        required: true,
},
    brandImage: String,
    image: String,
});

module.exports = mongoose.model('IceCream', iceCreamSchema);