const app = require("express");
const cookieParser = require("cookie-parser");

app.use(cookieParser);

module.exports = app;
