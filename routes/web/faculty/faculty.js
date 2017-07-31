const express = require('express');
const router = express.Router();
const path = require('path');

const database = require('../../../database/faculty');
const postDb = require('../../../database/posts');
const dbuser = require('../../../database/user');
const authenticate = require('../../../authenticate');
const faculty_edit = require("./faculty_edit");
const unirest = require('unirest');

router.use(express.static(path.join(__dirname, '../../../public')));

router.use(function (req, res, next) {
    authenticate.verify_cookie(req, res, next);
});

router.get('/', function (req, res, next) {

    var uname;

    if(req.query.uname) {
        uname = req.query.uname;
    }
    else {
        uname = req.decoded._doc.email;
    }

    database.getFacultyProfile(uname, function (err, faculty) {
        console.log(faculty);
        res.render('faculty', {faculty: faculty});
    });
});

router.get('/all', function (req, res, next) {
    database.getFaculties(req.query, function (err, result) {
       res.json({
           result: result
       });
    });
});

router.post('/review', function (req, res, next) {
    dbuser.postReview(req.decoded._doc._id, req.body.id, req.body.review, req.body.rating, "faculty", function (err, review) {
       res.json({
           result: review
       });
    });
});

router.get('/review', function (req, res, next) {
   dbuser.getReviews(req.query.id, "faculty", function (err, result) {
      res.json({
          result: result
      });
   });
});

router.get('/follow', function (req, res, next) {
    dbuser.followUser(req.query.id, req.decoded._doc._id, "faculty", function (err, result) {
       res.json(result);
    });
});

router.get('/unfollow', function (req, res, next) {
    dbuser.unfollowUser(req.query.id, req.decoded._doc._id, "faculty", function (err, result) {
        res.json(result);
    });
});

router.use('/edit', faculty_edit);

router.post('/post', function (req, res, next) {
    postDb.createPost(req.decoded._doc._id, req.body.text, function (err, result) {
        res.json({
            result: result
        });
    });
});

router.post('/post/like', function (req, res, next) {
    postDb.likePost(req.body.id, req.body.decoded._doc._id, function (err, result) {
        res.json({result: result});
    });
});

router.post('/post/comment', function (req, res, next) {
    postDb.commentOnPost(req.body.id, req.body.decoded._doc._id, req.body.text, function (err, result) {
        res.json({result: result});
    });
});

router.get('/post', function (req, res, next) {
    postDb.getPost(req.decoded._doc._id, req.query.lastTime, function (err, result) {
        res.json({
            result: result
        });
    });
});

module.exports = router;
