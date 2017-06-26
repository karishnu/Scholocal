const app = require("express");

const auth = require("./api/auth");

app.use('/auth', auth);

module.exports = app;
