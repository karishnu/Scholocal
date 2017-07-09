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
    authenticate.authenticate(req, res);
});

router.post('/save', function (req, res, next) {

    console.log(req.body);

    database.saveUserNew(req.body, function (err, doc) {
        if (err && err.code === 11000) {
            res.json({code: '1', message: 'You have already signed up!'})
        }
        else if (err && err.code !== 66) {
            res.json({code: '1', message: err})
        }
        else {
            authenticate.authenticate(req, res);
        }
    });
});

module.exports = router;