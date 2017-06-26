const app = require("express");

const auth = require("./api/auth");
const faculty = require("./api/faculty");

app.use('/auth', auth);
app.use('/faculty', faculty);

module.exports = app;
