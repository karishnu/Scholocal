const express = require('express');
const router = express.Router();
const path = require('path');

const multer  = require('multer');
const upload = multer({ dest: 'uploads/images/profile' , limits: { fileSize: 1000000 }}).single('image');

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

router.get('/image', function (req, res, next) {
    if(req.query.id) {
        db.getUserImageName(req.query.id, function (err, name) {
            res.sendFile('../../uploads/images/profile/' + name);
        });
    }
    else {
        db.getUserImageName(req.decoded._doc._id, function (err, name) {
            res.sendFile(name, { root: path.join(__dirname, '../../uploads/images/profile')}, function (err, result) {
                console.log(err);
            });
        });
    }
});

router.post('/image', function (req, res, next) {
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        else {
            db.saveUserImage(req.decoded._doc._id, req.file.filename, function (err, result) {
               if(err){
                   console.log(err);
               }
               else{
                   console.log(result);
                   console.log(req.file);
                   res.redirect(req.baseUrl);
               }
            });
        }
    });
});

module.exports = router;
