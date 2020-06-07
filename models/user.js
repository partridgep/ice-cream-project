const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

const userSchema = new Schema({
    name: String,
    email: String,
    avatarURL: String,
    googleId: String,
    reviews: [reviewSchema]
});

module.exports = mongoose.model('User', userSchema);