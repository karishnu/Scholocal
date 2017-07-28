const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// define the schema for our user model
const postSchema = mongoose.Schema({
    posted_by: { type: Schema.Types.ObjectId, ref: 'User' },
    post: {type: String, required: true},
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comment: [{posted_by: { type: Schema.Types.ObjectId, ref: 'User' },
            text: {type: String, required: true}}],
    time: {type: Date, default: Date.now, required: true}
});

const Post = mongoose.model('Post', postSchema);
module.exports = {Post: Post};