const User = require("../models/user").User;
const Review = require('../models/review').Review;
const fs = require('fs');

function saveUserNew(query, callback) {
    const user = new User(query);

    user.save(function (err, user) {
        callback(err, user);
    });
}

function saveUserImage(userId, imageName, callback) {
    User.findByIdAndUpdate(userId, {image_name: imageName}, function (err, result) {
        callback(err, result);
    });
}

function getUserImageName(userId, callback) {
    console.log(userId);
    User.findById(userId, function (err, user) {
        if(err){
            callback(err, null);
        }
        else if(user.image_name!=null){
            callback(null, user.image_name);
        }
        else {
            callback(null, null);
        }
    });
}

function getUser(id, callback) {
    User.findById(id, function (err, user) {
       callback(err, user);
    });
}

function updateUserDetails(id, role, userDetails, callback) {
    var objectToSave = {};
    objectToSave[role] = userDetails;
    User.findOneAndUpdate({_id: id}, objectToSave, userDetails, function (err, user) {
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
        object.populate('posted_by', {'name_first':1, "name_last":1, "role":1}, function(error, new_item) {
            callback(err, new_item.toObject());
        });
    });
}

function getReviews(id, role, callback) {
    Review.find({user: id, role: role})
    .populate('posted_by', 'name_first name_last role')
    .exec(function (err, res) {
        callback(err, res)
    });
}

function follow(user, id, role, callback) {
    if(user === id){
        callback("You can't follow yourself!", null);
    }
    else {
        User.updateOne({_id: id}, {$addToSet: {following: user}}, function (err, result) {
            callback(err, result);
        });
    }
}

function unfollow(user, id, role, callback) {
    if(user === id){
        callback("You can't unfollow yourself!", null);
    }
    else {
        User.updateOne({_id: id, role: role}, {$pull: {following: user}}, function (err, result) {
            callback(err, result);
        });
    }
}

module.exports = {getUser: getUser, saveUserNew: saveUserNew, updateUserDetails: updateUserDetails,
    postReview: postReview, getReviews: getReviews, followUser: follow, unfollowUser: unfollow, saveUserImage: saveUserImage,
    getUserImageName: getUserImageName};
