var User = require('../models/user').User;

function getInstituteProfile(userName, callback) {
    User.findOne({email: userName, role: 'institute'}, function (err, profile) {
        callback(err, profile);
    });
}

function getInstitutes(query, callback) {
    query['role'] = 'institute';
    User.find(query, function (err, profiles) {
       callback(err, profiles);
    });
}

module.exports = {getInstituteProfile: getInstituteProfile, getInstitutes: getInstitutes};