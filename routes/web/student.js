const express = require('express');
const router = express.Router();
const path = require('path');

const database = require('../../database/student');
const authenticate = require('../../authenticate');
const unirest = require('unirest');

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

    database.getStudentProfile(uname, function (err, student) {
        console.log(student);
        res.render('student', {profile: student});
    });
});

router.get('/all', function (req, res, next) {
    database.getStudents(req.query, function (err, result) {
       res.json({
           result: result
       });
    });
});

module.exports = router;
