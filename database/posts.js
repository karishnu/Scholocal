const User = require("../models/user").User;
const Post = require("../models/post").Post;

function createPost(id, text, callback) {
    var post = new Post({
        posted_by: id,
        post: text
    });

    post.save(function (err, result) {
       callback(err, result);
    });
}

module.exports = {createPost: createPost};
