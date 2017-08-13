var User = require('../models/user').User;

function getFacultyProfile(userName, callback) {
    User.findOne({_id: userName, role: 'faculty'}, function (err, faculty) {
        callback(err, faculty);
    });
}

function getProfile(id, callback) {
    User.findOne({_id: id}, function (err, student) {
        callback(err, student);
    });
}

function getFaculties(query, callback) {
    query['role'] = 'faculty';
    User.find(query, function (err, faculties) {
       callback(err, faculties);
    });
}

module.exports = {getFacultyProfile: getFacultyProfile,
    getFaculties: getFaculties, getProfile: getProfile};