const router = require("express")();
const cookieParser = require("cookie-parser");

const auth = require("./auth");
const faculty = require("./faculty")

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected web!' });
});

//router.use(cookieParser);
router.use('/auth', auth);
router.use('/faculty', faculty);

module.exports = router;
