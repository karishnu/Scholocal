const express = require('express');
const router = express.Router();
const path = require('path');
const post_path = require('../post');

const database = require('../../../database/student');
const postDb = require('../../../database/posts');
const authenticate = require('../../../authenticate');
const student_edit = require("./student_edit");
const unirest = require('unirest');

router.use(function (req, res, next) {
    authenticate.verify_cookie(req, res, next);
});

router.use(express.static(path.join(__dirname, '../../../public')));

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

    database.getStudentProfile(uname, function (err, student) {
        student.self = self;
        res.render('student', {profile: student});
    });
});

router.post('/achievement', function (req, res, next) {
    database.saveStudentAchievement(req.decoded._doc._id, req.body.details, req.body.year, function (err, student) {
        res.json({
            result: student
        })
    })
});

router.post('/project', function (req, res, next) {
    database.saveStudentProject(req.decoded._doc._id, req.body.details, req.body.year, function (err, student) {
        res.json({
            result: student
        })
    })
});


router.get('/all', function (req, res, next) {
    database.getStudents(req.query, function (err, result) {
       res.json({
           result: result
       });
    });
});

router.use('/edit', student_edit);
router.use('/post', post_path);

module.exports = router;
