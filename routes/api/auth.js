const express = require('express');
const router = express.Router();
const database = require('../../database/user');
const authenticate = require('../../authenticate');
const unirest = require('unirest');

/*router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

router.post('/save', function (req, res, next) {
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

router.post('/login', function (req, res) {
    authenticate.authenticate(req, res);
});

module.exports = router;