const User = require("../models/user").User;

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

module.exports = {saveUserNew: saveUserNew, updateUserDetails: updateUserDetails};