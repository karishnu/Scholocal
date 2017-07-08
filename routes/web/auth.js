const express = require('express');
const router = express.Router();
const path = require('path');
const database = require('../../database/user');
const authenticate = require('../../authenticate');
const unirest = require('unirest');

router.use(express.static(path.join(__dirname, '../../public')));

router.get('/save', function (req, res, next) {
    res.render('signup');
});

router.get('/login', function (req, res) {
    res.render('login')
});

router.post('/login', function (req, res, next) {
    authenticate.authenticate(req, res);
});

router.post('/save', function (req, res, next) {
   console.log(req.body);
});

module.exports = router;