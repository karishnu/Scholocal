const express = require('express');
const router = express.Router();
const database = require('../../database/faculty');
const authenticate = require('../../authenticate');
const unirest = require('unirest');

router.get('/', function (req, res, next) {

    let uname;

    if(req.query.uname) {
        uname = req.query.uname;
    }
    else {
        uname = req.decoded._doc.email;
    }

    database.getFacultyProfile(uname, function (err, faculty) {
        res.json(faculty);
    });
});

router.get('/all', function (req, res, next) {
    database.getFaculties(req.query, function (err, result) {
       res.json({
           result: result
       });
    });
});

module.exports = router;