'use strict';

var PageElement = require('./PageElement');
var extend = require('../../utils/extend');

var Input = function(elementName, elementType, locatorType, locator, parentId, childId) {
    Input.superclass.constructor.call(this,
        elementName, elementType, locatorType, locator, parentId, childId);
};

extend(Input, PageElement);

Input.prototype.getValue = function () {
    return this.get().getAttribute('value');
};

Input.prototype.setValue = function(str) {
    return this.get().sendKeys(str);
};

module.exports = Input;