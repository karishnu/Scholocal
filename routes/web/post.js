const express = require('express');
const router = express.Router();
const path = require('path');
const postDb = require('../../database/posts');

const authenticate = require('../../authenticate');
const unirest = require('unirest');

router.use(function (req, res, next) {
    authenticate.verify_cookie(req, res, next);
});

router.post('/', function (req, res, next) {
    postDb.createPost(req.decoded._doc._id, req.body.text, function (err, result) {
        res.json({result: result});
    });
});

router.get('/', function (req, res, next) {
    postDb.getPost(req.query.id, req.query.lastTime, function (err, result) {
        res.json({result: result});
    });
});

router.post('/like', function (req, res, next) {
    postDb.likePost(req.body.id, req.decoded._doc._id, function (err, result) {
        res.json({result: result});
    });
});

router.post('/comment', function (req, res, next) {
    postDb.commentOnPost(req.body.id, req.decoded._doc._id, req.body.text, function (err, result) {
        res.json({result: result});
    });
});

module.exports = router;
