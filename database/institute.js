var User = require('../models/user').User;

function getInstituteProfile(userName, callback) {
    User.findOne({_id: userName, role: 'institute'}, function (err, profile) {
        callback(err, profile);
    });
}

function getProfile(id, callback) {
    User.findOne({_id: id}, function (err, student) {
        callback(err, student);
    });
}

function getInstitutes(query, callback) {
    query['role'] = 'institute';
    User.find(query, function (err, profiles) {
       callback(err, profiles);
    });
}

module.exports = {getInstituteProfile: getInstituteProfile, getInstitutes: getInstitutes, getProfile: getProfile};