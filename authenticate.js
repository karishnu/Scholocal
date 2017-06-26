var jwt = require('jsonwebtoken');
var User = require('./models/user').User;
var consts = require('./config/constants');

function authenticate(req, res) {
    if (req.body.email && req.body.password) {
        authenticate_user(req.body.email, req.body.password, function (err, user) {
            if(err){
                res.send({code: '1', message: err});
            }
            else if(!user){
                res.send({code: '1', message: 'User Not Found!'});
            }
            else {
                var token = jwt.sign(user, consts.secret);

                // return the information including token as JSON
                res.header("Set-Cookie","x-access-token="+token);
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
    User.findOne({ email: username }, function (err, user) {
        if (err) {
            return callback(err, null);
        }
        else if (!user) {
            return callback(null, null);
        }
        user.verifyPassword(password, function (error, value) {
            if(value){return callback(null, user);}
            else {return callback(error, null);}
        });
    });
}

function check_token(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                return res.json({code: '1', success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

module.exports = {authenticate: authenticate, verify_token: check_token};