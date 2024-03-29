const router = require("express")();
const cookieParser = require("cookie-parser");
const express = require('express');
const path = require('path');


const auth = require("./auth");
const faculty = require("./faculty/faculty");
const student = require("./student/student");
const profile = require("./profile");
const feed = require("./feed");
const search = require("./search");
const institute = require("./institute/institute");

router.use(express.static(path.join(__dirname, '../../public')));

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected web!' });
});

router.get('/logout', (req, res) => {
    res.clearCookie("x-access-token");
    res.redirect('../home');
});

router.use('/auth', auth);
router.use('/faculty', faculty);
router.use('/profile', profile);
router.use('/student', student);
router.use('/institute', institute);
router.use('/feed', feed);
router.use('/search', search);

module.exports = router;
