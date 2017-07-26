const express = require('express');
const router = express.Router();
const path = require('path');

const database = require('../../../database/student');
const database_user = require('../../../database/user');
const authenticate = require('../../../authenticate');
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

    database.getStudentProfile(uname, function (err, student) {
        res.render('studentedit', {profile: student});
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    database_user.updateUserDetails(req.decoded._doc._id, "student", req.body, function (err, response) {
       res.redirect('../');
    });
});

module.exports = router;
