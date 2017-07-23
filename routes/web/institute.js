const express = require('express');
const router = express.Router();
const path = require('path');

const database = require('../../database/institute');
const authenticate = require('../../authenticate');
const unirest = require('unirest');
const dbuser = require('../../database/user');

router.use(express.static(path.join(__dirname, '../../public')));

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

    database.getInstituteProfile(uname, function (err, institute) {
        console.log(institute);
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
    dbuser.postReview(req.decoded._doc._id, req.query.id, req.query.review, req.query.rating, "institute", function (err, review) {
        res.json({
            result: review
        });
    });
});

module.exports = router;
