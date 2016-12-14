'use strict';

var PageObject = require('../../core/page-object/PageObject');
var extend = require('../../core/utils/extend');

var LOGIN_PAGE_URL = 'http://streamtv.net.ua/base/';
var LOGIN_PAGE_MAP_FILE = './domain/pages/element-maps/LoginPageElements.json';

var LoginPage = function() {
    LoginPage.superclass.constructor.call(this, LOGIN_PAGE_URL, LOGIN_PAGE_MAP_FILE);
};

extend(LoginPage, PageObject);

LoginPage.prototype.setLogin = function (login) {
    return this.getElement('LOGIN_INPUT').setValue(login);
};

LoginPage.prototype.setPassword = function (password) {
    return this.getElement('PASSWORD_INPUT').setValue(password);
};

LoginPage.prototype.submitCredentials = function () {
    return this.getElement('SUBMIT_BUTTON').click();
};

LoginPage.prototype.login = function (login, password) {
    this.setLogin(login);
    this.setPassword(password);
    this.submitCredentials();
};

module.exports = LoginPage;