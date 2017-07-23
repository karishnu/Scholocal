var User = require('../models/user').User;
var Review = require('../models/review').Review;

function getFacultyProfile(userName, callback) {
    User.findOne({email: userName, role: 'faculty'}, function (err, faculty) {
        callback(err, faculty);
    });
}

function getFaculties(query, callback) {
    query['role'] = 'faculty';
    User.find(query, function (err, faculties) {
       callback(err, faculties);
    });
}

function postFacultyReview(id, by, review, rating, callback) {
    const review = new Review({
        user: id,
        posted_by: by,
        review: review,
        rating: rating
    });

    review.save(function (err, object) {
       callback(err, object);
    });
}

module.exports = {getFacultyProfile: getFacultyProfile,
    getFaculties: getFaculties, postFacultyReview: postFacultyReview};