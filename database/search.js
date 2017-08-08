const User = require("../models/user").User;

function getSearch(query, callback) {
    User.find({$text: {$search: query}})
        .limit(10)
        .select("name_first name_last role")
        .exec(function (err, doc) {
            callback(err, doc);
        })
}

module.exports = {search: getSearch};
