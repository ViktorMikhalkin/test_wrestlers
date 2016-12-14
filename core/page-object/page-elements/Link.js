'use strict';

var PageElement = require('./PageElement');
var extend = require('../../utils/extend');

var Link = function(elementName, elementType, locatorType, locator, parentId, childId) {
    Link.superclass.constructor.call(this,
        elementName, elementType, locatorType, locator, parentId, childId);
};

extend(Link, PageElement);

module.exports = Link;