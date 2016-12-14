'use strict';

var PageElement = require('./PageElement');
var extend = require('../../utils/extend');

var Select = function(elementName, elementType, locatorType, locator, parentId, childId) {
    Select.superclass.constructor.call(this,
        elementName, elementType, locatorType, locator, parentId, childId);
};

extend(Select, PageElement);

Select.prototype.selectOptionByNumber = function (optionNum) {
    return this.get().$$('option')
        .then(function (options) {
            return options[optionNum].click();
        });
};

Select.prototype.selectOptionByName = function (name) {
    return this.get().$$('option').map(function (elm) {
        return elm.getText();
    }).then(function (texts) {
        return texts.findIndex(function (text, index, array) {
            return (text === name);
        });
    }).then(function (index) {
        return this.selectOptionByNumber(index);
    }.bind(this));
};

Select.prototype.getOptionValue = function () {
    return this.get().$('option:checked').getText();
};

module.exports = Select;