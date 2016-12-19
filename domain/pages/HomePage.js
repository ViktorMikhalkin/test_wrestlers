'use strict';

var PageObject = require('../../core/page-object/PageObject');
var extend = require('../../core/utils/extend');

var HOME_PAGE_URL = 'http://streamtv.net.ua/base/';
var HOME_PAGE_MAP_FILE = './domain/pages/element-maps/HomePageElements.json';

var Wrestler = require('../entities/wrestler.js').Wrestler;

var EC = protractor.ExpectedConditions;

var HomePage = function() {
    HomePage.superclass.constructor.call(this, HOME_PAGE_URL, HOME_PAGE_MAP_FILE);
};

extend(HomePage, PageObject);

HomePage.prototype.getFirstName = function () {
    return this.getElement('FIRST_NAME_INPUT').getValue();
};

HomePage.prototype.setFirstName = function (name) {
    return this.getElement('FIRST_NAME_INPUT').setValue(name);
};

HomePage.prototype.getMiddleName = function () {
    return this.getElement('MIDDLE_NAME_INPUT').getValue();
};

HomePage.prototype.setMiddleName = function (name) {
    return this.getElement('MIDDLE_NAME_INPUT').setValue(name);
};

HomePage.prototype.getLastName = function () {
    return this.getElement('LAST_NAME_INPUT').getValue();
};

HomePage.prototype.setLastName = function (name) {
    return this.getElement('LAST_NAME_INPUT').setValue(name);
};

HomePage.prototype.getDateOfBirth = function () {
    return this.getElement('DATE_OF_BIRTH_INPUT').getValue();
};

HomePage.prototype.setDateOfBirth = function (dob) {
    return this.getElement('DATE_OF_BIRTH_INPUT').setValue(dob);
};

HomePage.prototype.getRegion1 = function () {
    return this.getElement('REGION_1_SELECT').getOptionValue();
};

HomePage.prototype.setRegion1 = function (region) {
    return this.getElement('REGION_1_SELECT').selectOptionByName(region);
};

HomePage.prototype.getFst1 = function () {
    return this.getElement('FST_1_SELECT').getOptionValue();
};

HomePage.prototype.setFst1 = function (fst) {
    return this.getElement('FST_1_SELECT').selectOptionByName(fst);
};

HomePage.prototype.getStyle = function () {
    return this.getElement('STYLE_SELECT').getOptionValue();
};

HomePage.prototype.setStyle = function (style) {
    return this.getElement('STYLE_SELECT').selectOptionByName(style);
};

HomePage.prototype.getAge = function () {
    return this.getElement('LIC_TYPE_SELECT').getOptionValue();
};

HomePage.prototype.setAge = function (age) {
    return this.getElement('LIC_TYPE_SELECT').selectOptionByName(age);
};

HomePage.prototype.getYear = function () {
    return this.getElement('EXPIRES_SELECT').getOptionValue();
};

HomePage.prototype.setYear = function (year) {
    return this.getElement('EXPIRES_SELECT').selectOptionByName(year);
};

HomePage.prototype.save = function () {
    return this.getElement('SAVE_BUTTON').click().then(function () {
        return browser.sleep(5000);
    });
};

HomePage.prototype.addWrestler = function (wrestler) {
    return this.getElement('NEW_BUTTON').click()
        .then(function () {
            return protractor.promise.all([
                this.setFirstName(wrestler.getFirstName()),
                this.setMiddleName(wrestler.getMiddleName()),
                this.setLastName(wrestler.getLastName()),
                this.setDateOfBirth(wrestler.getDateOfBirth()),
                this.setRegion1(wrestler.getRegion1()),
                this.setFst1(wrestler.getFst1()),
                this.setStyle(wrestler.getStyle()),
                this.setAge(wrestler.getLicType()),
                this.setYear(wrestler.getExpires())
            ]);
        }.bind(this))
        .then(function () {
            return this.save();
        }.bind(this));
};

HomePage.prototype.findById = function (id) {
    return this.getElement('SEARCH_FOR_INPUT').setValue(id)
        .then(function () {
            return this.getElement('SEARCH_FOR_BUTTON').click();
        }.bind(this))
        .then(function () {
            return protractor.promise.all([
                this.getLastName(),
                this.getFirstName(),
                this.getDateOfBirth(),
                this.getMiddleName(),
                this.getRegion1(),
                this.getFst1(),
                this.getStyle(),
                this.getAge(),
                this.getYear()
            ]);
        }.bind(this))
        .then(function (data) {
            var wrestler = new Wrestler();
            wrestler.setId(id);
            wrestler.setLastName(data[0]);
            wrestler.setFirstName(data[1]);
            wrestler.setDateOfBirth(data[2]);
            wrestler.setMiddleName(data[3]);
            wrestler.setRegion1(data[4]);
            wrestler.setFst1(data[5]);
            wrestler.setStyle(data[6]);
            wrestler.setLicType(data[7]);
            wrestler.setExpires(data[8]);
            return wrestler;
        });
};

HomePage.prototype.openMainTab = function () {
    return this.getElement('MAIN_NAV_TAB_DIV').click();
};

HomePage.prototype.delete = function () {
    return this.getElement('DELETE_BUTTON').click();
};

HomePage.prototype.confirmDeletion = function () {
    return this.getElement('YES_BUTTON').click();
};

HomePage.prototype.deleteWrestler = function (id) {
    return this.findById(id)
        .then(function () {
            return this.delete();
        }.bind(this))
        .then(function () {
            return this.confirmDeletion();
        }.bind(this));
};

module.exports = HomePage;