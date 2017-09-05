var User = require('../models/user').User;

function getStudentProfile(userName, callback) {
    User.findOne({_id: userName, role: 'student'}, function (err, student) {
        callback(err, student);
    });
}

function getProfile(id, callback) {
    User.findOne({_id: id}, function (err, student) {
        callback(err, student);
    });
}

function getStudents(query, callback) {
    query['role'] = 'student';
    User.find(query, function (err, students) {
       callback(err, students);
    });
}

function saveStudentAchievement(id, details, year, callback) {
    User.findOneAndUpdate({_id: id, role: 'student'}, {$push: {achievements: {details: details, year: year}}}, function (err, student) {
        callback(err, student);
    });
}

module.exports = {getStudentProfile: getStudentProfile, getStudents: getStudents, getProfile: getProfile, saveStudentAchievement: saveStudentAchievement};