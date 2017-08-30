const express = require('express');
const router = express.Router();
const path = require('path');
const postDb = require('../../database/posts');

const authenticate = require('../../authenticate');
const unirest = require('unirest');

router.use(function (req, res, next) {
    authenticate.verify_cookie(req, res, next);
});

router.get('/', function (req, res, next) {
   res.render('feed');
});

router.get('/posts', function (req, res, next) {
    postDb.getFeed(req.decoded._doc._id, req.query.timeAfter, function (err, posts) {
        res.json({
            result: posts
        });
    });
});

module.exports = router;
