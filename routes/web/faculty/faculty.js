const express = require('express');
const router = express.Router();
const path = require('path');

const database = require('../../../database/faculty');
const dbuser = require('../../../database/user');
const authenticate = require('../../../authenticate');
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

    database.getFacultyProfile(uname, function (err, faculty) {
        console.log(faculty);
        res.render('faculty', {faculty: faculty});
    });
});

router.get('/all', function (req, res, next) {
    database.getFaculties(req.query, function (err, result) {
       res.json({
           result: result
       });
    });
});

router.post('/review', function (req, res, next) {
    dbuser.postReview(req.decoded._doc._id, req.query.id, req.query.review, req.query.rating, "faculty", function (err, review) {
       res.json({
           result: review
       });
    });
});

router.get('/review', function (req, res, next) {
   dbuser.getReviews(req.query.id, "faculty", function (err, result) {
      res.json({
          result: result
      });
   });
});

module.exports = router;
