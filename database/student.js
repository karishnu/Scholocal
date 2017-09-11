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
    User.findOne({_id: id, role: 'student'}, function (err, student) {
        if(!err){
            student.student.achievements.push({details: details, year: year});
            student.save(function (err, result) {
                callback(err, result);
            });
        }
        else {
            callback(err, null);
        }
    });
}

function saveStudentProject(id, details, year, callback) {
    User.findOne({_id: id, role: 'student'}, function (err, student) {
        if(!err){
            student.student.projects.push({details: details, year: year});
            student.save(function (err, result) {
                callback(err, result);
            });
        }
        else {
            callback(err, null);
        }
    });
}

module.exports = {getStudentProfile: getStudentProfile, getStudents: getStudents, getProfile: getProfile, saveStudentAchievement: saveStudentAchievement, saveStudentProject: saveStudentProject};