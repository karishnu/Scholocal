const express = require('express');
const router = express.Router();
const path = require('path');

const authenticate = require('../../authenticate');
const unirest = require('unirest');

router.use(function (req, res, next) {
    authenticate.verify_cookie(req, res, next);
});

router.get('/', function (req, res, next) {
    var role = req.decoded._doc.role;
    res.redirect("./"+role);
});

module.exports = router;
