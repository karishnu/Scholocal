const User = require("../models/user").User;
var Review = require('../models/review').Review;

function saveUserNew(query, callback) {
    const user = new User(query);

    user.save(function (err, user) {
        callback(err, user);
    });
}

function updateUserDetails(userName, userDetails, callback) {
    User.findOneAndUpdate({email: userName}, userDetails, function (err, user) {
       callback(err, user);
    });
}

function postReview(id, by, review, rating, role, callback) {
    const reviewObject = new Review({
        user: id,
        posted_by: by,
        review: review,
        rating: rating,
        role: role
    });

    reviewObject.save(function (err, object) {
        callback(err, object);
    });
}

module.exports = {saveUserNew: saveUserNew, updateUserDetails: updateUserDetails, postReview: postReview};