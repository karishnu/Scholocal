const express = require("express");

const app = express();

const auth = require("./auth");
const faculty = require("./faculty");

app.use('/auth', auth);
app.use('/faculty', faculty);

module.exports = app;
