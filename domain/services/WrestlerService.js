'use strict';

var request = require('request');
var j = request.jar();

var Wrestler = require('../entities/wrestler.js').Wrestler;

var _ = require('lodash');

var WrestlerService = function (url) {
    this._url = url;
    this._baseUrl = url + 'php/wrestler/';
    this._cookies;

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

WrestlerService.prototype.getCookie = function (name) {
    return browser.executeScript('return document.cookie;')
        .then(function (cookieString) {
            return cookieString.substr(cookieString.indexOf(name) + name.length + 1);
        });
};

WrestlerService.prototype.setCookie = function (name, value) {
    var defer = protractor.promise.defer();

    // this._cookies[name] = value;

    this._cookies = request.cookie(name + '=' + value);

    defer.fulfill(this._cookies);

    return defer.promise;
};

WrestlerService.prototype.get = function (urlOp) {
    var url = this._baseUrl + urlOp;
    j.setCookie(this._cookies, url);
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