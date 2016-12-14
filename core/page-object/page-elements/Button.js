'use strict';

var PageElement = require('./PageElement');
var extend = require('../../utils/extend');

var Button = function(elementName, elementType, locatorType, locator, parentId, childId) {
	Button.superclass.constructor.call(this,
		elementName, elementType, locatorType, locator, parentId, childId);
};

extend(Button, PageElement);

module.exports = Button;