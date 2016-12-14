'use strict';

var Button = require('./page-elements/Button');
var Div = require('./page-elements/Div');
var Input = require('./page-elements/Input');
var Link = require('./page-elements/Link');
var Select = require('./page-elements/Select');

var ElementFactory = function() {
	var element = null;

	this.createElement = function(elementName, elementType, locatorType, locator, parentId, childId) {
		var element = null;
        
		switch(elementType.toUpperCase()) {
			case 'BUTTON':
                element = new Button(elementName, elementType, locatorType, locator, parentId, childId);
				break;
			case 'DIV':
				element = new Div(elementName, elementType, locatorType, locator, parentId, childId);
				break;
            case 'INPUT':
                element = new Input(elementName, elementType, locatorType, locator, parentId, childId);
				break;
            case 'LINK':
                element = new Link(elementName, elementType, locatorType, locator, parentId, childId);
                break;
            case 'SELECT':
                element = new Select(elementName, elementType, locatorType, locator, parentId, childId);
                break;
		}

		return element;
	};
};


module.exports = ElementFactory;