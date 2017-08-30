const jwt = require('jsonwebtoken');
const User = require('./models/user').User;
const consts = require('./config/constants');

function authenticate_web(req, res) {
    if (req.body.email && req.body.password) {
        authenticate_user(req.body.email, req.body.password, function (err, user) {
            if (err) {
                res.send({code: '1', message: err});
            }
            else if (!user) {
                res.send({code: '1', message: 'User Not Found!'});
            }
            else {
                const token = jwt.sign(user, consts.secret);

                // return the information including token as JSON
                res.cookie("x-access-token", token);
                res.redirect('../profile');
            }
        })
    }
}

function authenticate(req, res) {
    if (req.body.email && req.body.password) {
        authenticate_user(req.body.email, req.body.password, function (err, user) {
            if (err) {
                res.send({code: '1', message: err});
            }
            else if (!user) {
                res.send({code: '1', message: 'User Not Found!'});
            }
            else {
                const token = jwt.sign(user, consts.secret);

                // return the information including token as JSON
                res.cookie("x-access-token", token);
                res.json({
                    code: '0',
                    message: 'Token Generated!',
                    token: token
                });
            }
        })
    }
}

function authenticate_user(username, password, callback) {
    User.findOne({email: username}, function (err, user) {
        if (err) {
            return callback(err, null);
        }
        else if (!user) {
            return callback(null, null);
        }
        user.verifyPassword(password, function (error, value) {
            if (value) {
                return callback(null, user);
            }
            else {
                return callback(error, null);
            }
        });
    });
}

function check_cookie(req, res, next) {

    // check cookies for token
    var token = req.cookies["x-access-token"];
    authenticate_token(req, res, next, token);
}

function check_token(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    authenticate_token(req, res, next, token);
}

function authenticate_token(req, res, next, token) {
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, consts.secret, function (err, decoded) {
            console.log(err);
            if (err) {
                return res.redirect('/web/logout');
                //return res.json({code: '1', success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.redirect('/web/logout');
/*        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });*/
    }
}

module.exports = {authenticate: authenticate, authenticate_web: authenticate_web, verify_token: check_token, verify_cookie: check_cookie};