const router = require("express")();
const cookieParser = require("cookie-parser");
const express = require('express');
const path = require('path');


const auth = require("./auth");
const faculty = require("./faculty/faculty");
const student = require("./student/student");
const profile = require("./profile");
const institute = require("./institute/institute");

router.use(express.static(path.join(__dirname, '../../public')));

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected web!' });
});

//router.use(cookieParser);
router.use('/auth', auth);
router.use('/faculty', faculty);
router.use('/profile', profile);
router.use('/student', student);
router.use('/institute', institute);

module.exports = router;
