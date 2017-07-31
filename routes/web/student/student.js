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

router.use('/edit', student_edit);
router.use('/post', post_path);

module.exports = router;
