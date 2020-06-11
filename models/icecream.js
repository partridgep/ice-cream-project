const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
      required: true
    },
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  }, { 
    timestamps: true
  });

const iceCreamSchema = new Schema({
    name: {
        type: String,
        //unique: true
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
    url: String,
    description: String,
    // reviews is an array of review subdocs!
    reviews: [reviewSchema]
});

module.exports = mongoose.model('IceCream', iceCreamSchema);