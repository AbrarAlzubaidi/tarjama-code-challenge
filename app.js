var express = require('express');
var sequelize = require("./database/sequelize.js");
var _a = require('./TSmodules/user.js'), createUser = _a.createUser, getLoggedUser = _a.getLoggedUser;
require("dotenv").config();
var app = express();
var port = 3000;
app.use(express.json());
try {
    if (sequelize) {
        app.get("/", function (req, res) {
            return res.send('hello');
        });
        app.get("/api/user/:id", getLoggedUser);
        app.post("/api/create-user", createUser);
    }
}
catch (error) {
    console.error('Connection Failed:', error);
}
app.listen(port, function () {
    console.log('app is listening');
});
