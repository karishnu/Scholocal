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

module.exports = {getFacultyProfile: getFacultyProfile,
    getFaculties: getFaculties};