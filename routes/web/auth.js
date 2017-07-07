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

module.exports = router;