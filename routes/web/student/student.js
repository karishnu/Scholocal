const express = require('express');
const router = express.Router();
const path = require('path');

const database = require('../../../database/student');
const dbuser = require('../../../database/user');
const authenticate = require('../../../authenticate');
const student_edit = require("./student_edit");
const unirest = require('unirest');

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

router.use('/edit', student_edit);

router.get('/all', function (req, res, next) {
    database.getStudents(req.query, function (err, result) {
       res.json({
           result: result
       });
    });
});

router.post('/review', function (req, res, next) {
    dbuser.postReview(req.decoded._doc._id, req.query.id, req.query.review, req.query.rating, "student", function (err, review) {
        res.json({
            result: review
        });
    });
});


module.exports = router;
