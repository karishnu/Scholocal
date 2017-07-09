const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name_first: {type: String, required: true},
    name_last: {type: String, required: true},
    mobile: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true},
    role: {type: String, required: true, enum: ['student', 'faculty', 'institute']},
    dob: {type: String, required: true},
    student: {
        school: String,
        interests: String,
        location: String,
        contact: String,
        achievements: String
    },
    institute: {
        expertise: String,
        location: String,
        contact: String
    },
    faculty: {
        education: String,
        current_institute: String,
        mode_teaching: [String],
        achievements: [{
            details: String,
            year: String
        }],
        experience: [{
            details: String,
            year: String,
            location: String
        }]
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