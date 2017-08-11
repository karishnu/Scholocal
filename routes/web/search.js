const express = require('express');
const router = express.Router();
const path = require('path');
const searchDb = require('../../database/search');

const authenticate = require('../../authenticate');

// router.use(function (req, res, next) {
//     authenticate.verify_cookie(req, res, next);
// });

router.get('/', function (req, res, next) {
    console.log(req.query.text);
   searchDb.search(req.query.text, function (err, doc) {
       console.log(err);
       res.render('searchResults', {query: req.query.text, data: doc});
   })
});

module.exports = router;
