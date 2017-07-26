const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// define the schema for our user model
const reviewSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    posted_by: { type: Schema.Types.ObjectId, ref: 'User' },
    review: {type: String},
    rating: {type: Number, required: true, enum: [1,2,3,4,5]},
    role: {type: String, required: true, enum: ["faculty", "institute"]},
    time: {type: Date, default: Date.now, required: true}
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = {Review: Review};