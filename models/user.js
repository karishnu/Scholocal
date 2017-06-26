const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, required: true, enum: ['student', 'professor', 'institute']},
    student: {
        school: String,
        bio: String,
        interests: String,
        location: String,
        contact: String,
        achievements: String
    },
    institute: {
        bio: String,
        expertise: String,
        location: String,
        contact: String
    },
    faculty: {
        bio: String,
        expertise: String,
        location: String,
        contact: String
    }
});

// Execute before each user.save() call
userSchema.pre('save', function (callback) {
    const user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return callback(err);
        user.password = hash;
        callback();
    });
});

userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, res) {
        if (err) {
            callback(err, null)
        }
        else if (!res) {
            callback("Authentication Failed!", false);
        }
        else {
            callback(null, true);
        }
    });
};


const User = mongoose.model('User', userSchema);
module.exports = {User: User};