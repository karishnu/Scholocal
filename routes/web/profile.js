const express = require('express');
const router = express.Router();
const path = require('path');

const authenticate = require('../../authenticate');
const unirest = require('unirest');
const db = require('../../database/user');

router.use(function (req, res, next) {
    authenticate.verify_cookie(req, res, next);
});

router.get('/', function (req, res, next) {
    if(req.query.id){
        db.getUser(req.query.id, function (err, user) {
            res.redirect("./"+user.role+"?id="+user._id);
        });
    }
    else res.redirect("./"+req.decoded._doc.role);
});

module.exports = router;
