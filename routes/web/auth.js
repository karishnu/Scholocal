const express = require('express');
const router = express.Router();
const path = require('path');
const database = require('../../database/user');
const authenticate = require('../../authenticate');
const unirest = require('unirest');

router.use(express.static(path.join(__dirname, '../../public')));

router.get('/save', function (req, res, next) {
    var role = req.query.role;
    console.log(role);
    res.render('signup', {role: role});
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    authenticate.authenticate_web(req, res);
});

router.post('/save', function (req, res, next) {

    console.log(req.body);

    if(req.body.role == "faculty"){
        var teaching_mode_count = req.body['mode-count'][0];
        var acheivement_count = req.body['mode-count'][1];
        var experience_count = req.body['mode-count'][2];

        console.log(teaching_mode_count);
        console.log(acheivement_count);
        console.log(experience_count);

        var mode_teaching = [];
        var achievements = [];
        var experience = [];

        var i = 0;
        for(i = 1; i <= teaching_mode_count; i++){
            mode_teaching.push(req.body["teaching-mode" + i]);
        }
        i = 0;
        for(i = 1; i <= acheivement_count; i++){
            achievements.push({
                details: req.body["acheivement" + i],
                year: req.body["acheivement-year" + i]
            });
        }
        i = 0;
        for(i = 1; i <= experience_count; i++){
            experience.push({
                details: req.body["experience" + i],
                year: req.body["experience-year" + i],
                location: req.body["experience-location" + i]
            });
        }

        var facultyObject = req.body;

        facultyObject.faculty = {};
        facultyObject.faculty.mode_teaching = mode_teaching;
        facultyObject.faculty.achievements = achievements;
        facultyObject.faculty.experience = experience;
        facultyObject.dob = req.body.dateOfBirth;
    }

    database.saveUserNew(facultyObject, function (err, doc) {
        if (err && err.code === 11000) {
            res.json({code: '1', message: 'You have already signed up!'})
        }
        else if (err && err.code !== 66) {
            res.json({code: '1', message: err})
        }
        else {
            res.redirect('./login');
        }
    });
});

module.exports = router;
