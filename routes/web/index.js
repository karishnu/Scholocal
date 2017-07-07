const router = require("express")();
const cookieParser = require("cookie-parser");

const auth = require("./auth");

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected web!' });
});

//router.use(cookieParser);
router.use('/auth', auth);

module.exports = router;
