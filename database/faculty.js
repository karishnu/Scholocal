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

function saveFacultyAchievement(id, details, year, callback) {
    User.findOne({_id: id, role: 'faculty'}, function (err, faculty) {
        if(!err){
            faculty.faculty.achievements.push({details: details, year: year})
            faculty.save(function (err, result) {
               callback(err, result);
            });
        }
        else {
            callback(err, null);
        }
    });
}

function saveFacultyExperience(id, details, year, location, callback) {
    User.findOne({_id: id, role: 'faculty'}, function (err, faculty) {
        if(!err){
            faculty.faculty.experience.push({details: details, year: year, location: location});
            faculty.save(function (err, result) {
                callback(err, result);
            });
        }
        else {
            callback(err, null);
        }
    });
}

module.exports = {getFacultyProfile: getFacultyProfile,
    getFaculties: getFaculties, getProfile: getProfile, saveFacultyAchievement: saveFacultyAchievement, saveFacultyExperience: saveFacultyExperience};