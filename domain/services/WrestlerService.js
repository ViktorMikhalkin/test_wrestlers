'use strict';

var request = require('request');
var j = request.jar();
var cookie = request.cookie('PHPSESSID=pokh17lrg57fe831ke8vtmu556');
var url = 'http://streamtv.net.ua/base';
j.setCookie(cookie, 'http://streamtv.net.ua/base');

var Wrestler = require('../entities/wrestler.js').Wrestler;

var _ = require('lodash');

var WrestlerService = function () {
    this._baseUrl = 'http://streamtv.net.ua/base/php/wrestler/';

    this._createWrestlerBySearchMapping = function (obj) {
        var wrestler = new Wrestler();

        _.forOwn(obj, function (value, key) {
            switch (key) {
                case 'id_wrestler': wrestler.setId(value); break;
                case 'lname': wrestler.setLastName(value); break;
                case 'fname': wrestler.setFirstName(value); break;
                case 'mname': wrestler.setMiddleName(value); break;
                case 'dob': wrestler.setDateOfBirth(value); break;
                case 'stname': wrestler.setStyle(value); break;
                case 'region': wrestler.setRegion1(value); break;
                case 'fst': wrestler.setFst1(value); break;
                case 'lictype': wrestler.setLicType(value); break;
                case 'expires': wrestler.setExpires(value); break;
            }
        });
        return wrestler;
    };

    this._createWrestlerByReadMapping = function (obj) {
        var wrestler = new Wrestler();

        _.forOwn(obj, function (value, key) {
            switch (key) {
                case 'id_wrestler': wrestler.setId(value); break;
                case 'lname': wrestler.setLastName(value); break;
                case 'fname': wrestler.setFirstName(value); break;
                case 'mname': wrestler.setMiddleName(value); break;
                case 'dob': wrestler.setDateOfBirth(value); break;
                case 'style': wrestler.setStyle(value); break;
                case 'region1': wrestler.setRegion1(value); break;
                case 'fst1': wrestler.setFst1(value); break;
                case 'lictype': wrestler.setLicType(value); break;
                case 'expires': wrestler.setExpires(value); break;
            }
        });
        return wrestler;
    };
};

WrestlerService.prototype.get = function (urlOp) {
    var url = this._baseUrl + urlOp;
    var options = {
        url: url,
        jar: j,
        json: true
    };

    var defer = protractor.promise.defer();

    request.get(options, function (error, response, body) {
        console.log(response.statusCode);
        if (error || response.statusCode >= 400) {
            defer.reject({
                error: error,
                message: response
            });
        } else {
            defer.fulfill(body);
        }
    }).auth('auto', 'test', false);

    return defer.promise;
};

WrestlerService.prototype.search = function (lastName) {
    return this.get('search.php?count=25&filters=%7B%7D&order=w.changed+DESC&search=' + lastName + '&start=0');
};

WrestlerService.prototype.findBy = function(lastName, firstName, middleName, dateOfBirth) {
    firstName = firstName || null;
    middleName = middleName || null;
    dateOfBirth = dateOfBirth || null;

    return this.search(lastName).then(function (rowsObject) {
        return _.find(rowsObject.rows,
            { 'lname': lastName, 'fname': firstName, 'mname': middleName, 'dob': dateOfBirth });
    }).then(function (obj) {
        return this._createWrestlerBySearchMapping(obj);
    }.bind(this));
};

WrestlerService.prototype.read = function (id) {
    return this.get('read.php?id=' + id).then(function (obj) {
        return this._createWrestlerByReadMapping(obj);
    }.bind(this));
};

module.exports = WrestlerService;