const express = require('express');
const router = express.Router();
const path = require('path');
const post_path = require('../post');

const database = require('../../../database/institute');
const postDb = require('../../../database/posts');
const authenticate = require('../../../authenticate');
const unirest = require('unirest');
const institute_edit = require("./institute_edit");
const dbuser = require('../../../database/user');

router.use(express.static(path.join(__dirname, '../../../public')));

router.use(function (req, res, next) {
    authenticate.verify_cookie(req, res, next);
});

router.get('/', function (req, res, next) {

    var uname;
    var self = false;

    if(req.query.id) {
        uname = req.query.id;
    }
    else {
        uname = req.decoded._doc._id;
        self = true;
    }

    database.getInstituteProfile(uname, function (err, institute) {
        institute.self = self;
        res.render('institute', {profile: institute});
    });
});

router.get('/all', function (req, res, next) {
    database.getInstitutes(req.query, function (err, result) {
       res.json({
           result: result
       });
    });
});

router.post('/review', function (req, res, next) {
    dbuser.postReview(req.decoded._doc._id, req.body.id, req.body.review, req.body.rating, "institute", function (err, review) {
        res.json({
            result: review
        });
    });
});

router.get('/review', function (req, res, next) {
    dbuser.getReviews(req.query.id, "institute", function (err, result) {
        res.json({
            result: result
        });
    });
});

router.get('/follow', function (req, res, next) {
    dbuser.followUser(req.query.id, req.decoded._doc._id, "institute", function (err, result) {
        res.json(result);
    });
});

router.get('/unfollow', function (req, res, next) {
    dbuser.unfollowUser(req.query.id, req.decoded._doc._id, "institute", function (err, result) {
        res.json(result);
    });
});

router.use('/edit', institute_edit);
router.use('/post', post_path);

module.exports = router;
