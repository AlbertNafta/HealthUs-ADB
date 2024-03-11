const accountsModel = require("../models/accounts");

exports.findAll = function(req, res, next) {
    accountsModel.findAll(req, res, next);
}

exports.findOne = function(req, res, next) {
    accountsModel.findOne(req, res, next);
}

exports.create = function(req, res, next) {
    accountsModel.create(req, res, next);
}
exports.update = function(req, res, next) {
    accountsModel.update(req, res, next);
}
exports.delete = function(req, res, next) {
    accountsModel.delete(req, res, next);
}



