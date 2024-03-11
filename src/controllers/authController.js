const {login, verify, logout, checkAuth}= require("../middleware/authentication");

exports.login = function(req, res, next) {
    login(req, res, next);
}

exports.verify = function(req, res) {
    verify(req, res);
}

exports.logout = function(req, res) {
    logout(req, res);
}

exports.checkAuth = function(req, res, next) {
    checkAuth(req, res, next);
}