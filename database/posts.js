const User = require("../models/user").User;
const Post = require("../models/post").Post;

function createPost(id, text, callback) {
    var post = new Post({
        posted_by: id,
        text: text
    });

    post.save(function (err, result) {
        if(err){
            console.log(err);
            callback(err, null);
        }
        else {
            result.populate('posted_by', {'name_first': 1, "name_last": 1, "role": 1}, function (error, new_item) {
                callback(err, new_item.toObject());
            });
        }
    });
}

function getPost(id, dateAfter, callback) {
    Post.find({posted_by: id, createdOn: {$lte: dateAfter}})
        .limit(20)
        .sort('-time')
        .populate("posted_by", "name_first name_last role")
        .populate("comment.posted_by", "name_first name_last role")
        .exec(function (err, result) {
            callback(err, result);
        });
}

function likePost(id_post, id_like, callback) {
    Post.findByIdAndUpdate(id_post, {$addToSet: {likes: id_like}}, function (err, res) {
        callback(err, res);
    });
}

function commentOnPost(id_post, id_commenter, text, callback) {

    var objectToPush = {
        posted_by: id_commenter,
        text: text
    };

    Post.findByIdAndUpdate(id_post, {$push: {comment: objectToPush}}, function (err, res) {
        callback(err, res);
    });
}

module.exports = {createPost: createPost, getPost: getPost, likePost: likePost, commentOnPost: commentOnPost};
