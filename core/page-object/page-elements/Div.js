'use strict';

var PageElement = require('./PageElement');
var extend = require('../../utils/extend');

var Div = function(elementName, elementType, locatorType, locator, parentId, childId) {
    Div.superclass.constructor.call(this,
        elementName, elementType, locatorType, locator, parentId, childId);
};

extend(Div, PageElement);

module.exports = Div;