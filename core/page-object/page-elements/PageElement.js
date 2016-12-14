'use strict';

var Selenium = require('selenium-webdriver');
var Protractor = require('protractor');

var PAGE_ELEMENT_TIMEOUT = 60000;

var PageElement = function(elementName, elementType, locatorType, locator, parentId, childId) {
	this._elementName = elementName;
	this._elementType = elementType;
	this._locatorType = locatorType;
	this._locator = locator;
	this._parentId = parentId;
	this._childId = childId;

	this._elementId = elementName + '_' + elementType;
};

PageElement.prototype.getElementId = function() {
	return this._elementId;
};

PageElement.prototype.setElementId = function(elementId) {
	this._elementId = elementId;
	return this;
};

PageElement.prototype.getElementName = function() {
    return this._elementName;
};

PageElement.prototype.setElementId = function(elementName) {
    this._elementName = elementName;
    return this;
};

PageElement.prototype.getElementType = function() {
	return this._elementType;
};

PageElement.prototype.setElementType = function(elementType) {
	this._elementType = elementType;
	return this;
};

PageElement.prototype.getLocator = function() {
	return this._locator;
};

PageElement.prototype.setLocator = function(locator) {
	this._locator = locator;
	return this;
};

PageElement.prototype.getLocatorType = function() {
	return this._locatorType;
};

PageElement.prototype.setLocatorType = function(locatorType) {
	this._locatorType = locatorType;
	return this;
};

PageElement.prototype.getParentId = function() {
	return this._parentId;
};

PageElement.prototype.setParentId = function(parentId) {
	this._parentId = parentId;
	return this;
};

PageElement.prototype.childId = function() {
	return this._childId;
};

PageElement.prototype.setChildId = function(childId) {
	this._childId = childId;
	return this;
};

PageElement.prototype.get = function() {
    var item;

    if (this._locatorType === 'css') {
        item = element(by.css(this._locator));
    } else {
        throw new Error('XPATH locators are not yet supported.');
    }

	return item;
};

PageElement.prototype.isDisplayed = function () {
	var item = this.get();
    var EC = Protractor.protractor.ExpectedConditions;

    return browser.wait(EC.visibilityOf(item), PAGE_ELEMENT_TIMEOUT);
};

PageElement.prototype.isPresent = function () {
	return this.get().isPresent();
};

PageElement.prototype.appear = function () {
	return this.isDisplayed();
};

PageElement.prototype.disappear = function () {
	return this.isPresent().then(function(present) {
		return !present;
	});
};

PageElement.prototype.click = function() {
    return this.get().click();
};


module.exports = PageElement;