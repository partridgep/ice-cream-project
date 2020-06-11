const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String,
    ratedIceCreams: [{
        type: Schema.Types.ObjectId,
        ref: 'IceCream'
    }]
});

module.exports = mongoose.model('User', userSchema);