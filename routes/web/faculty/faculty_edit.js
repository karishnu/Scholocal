const express = require('express');
const router = express.Router();
const path = require('path');

const database = require('../../../database/faculty');
const database_user = require('../../../database/user');
const authenticate = require('../../../authenticate');
const unirest = require('unirest');

router.use(express.static(path.join(__dirname, '../../../public')));

router.use(function (req, res, next) {
    authenticate.verify_cookie(req, res, next);
});

router.get('/', function (req, res, next) {

    var uname;

    uname = req.decoded._doc._id;

    database.getFacultyProfile(uname, function (err, inst) {
        res.render('facultyedit', {profile: inst});
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    database_user.updateUserDetails(req.decoded._doc._id, "faculty", req.body, function (err, response) {
        res.redirect('../');
    });
});

module.exports = router;
