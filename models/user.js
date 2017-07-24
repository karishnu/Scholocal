const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// define the schema for our user model
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name_first: {type: String, required: true},
    name_last: {type: String, required: true},
    mobile: {type: String},
    address: {type: String},
    description: {type: String},
    role: {type: String, required: true, enum: ['student', 'faculty', 'institute']},
    dob: {type: String},
    date_signup: {type: Date, default: Date.now, required: true},
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    student: {
        school: String,
        interests: String,
        location: String,
        contact: String,
        achievements: [{
            details: String,
            year: String
        }],
        projects: [{
            details: String,
            year: String
        }],
    },
    institute: {
        expertise: {type: String, default: "Not Mentioned"},
        location: {type: String, default: "Not Mentioned"},
        contact: {type: String, default: "Not Mentioned"},
        mode_teaching: [String],
        achievements: [{
            details: String,
            year: String
        }]
    },
    faculty: {
        expertise: {type: String, default: "Not Mentioned"},
        education: {type: String, default: "Not Mentioned"},
        current_institute: {type: String, default: "Not Mentioned"},
        mode_teaching: [String],
        achievements: [{
            details: String,
            year: String
        }],
        experience: [{
            details: String,
            year: String,
            location: String
        }],
        location: {type: String, default: "Not Mentioned"},
        contact: {type: String, default: "Not Mentioned"}
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