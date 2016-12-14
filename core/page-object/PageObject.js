'use strict';

var HashMap = require('hashmap');
var jsonfile = require('jsonfile');

var ElementFactory = require('./ElementFactory');

var PageObject = function(url, elementMapFile) {
    this._url = url;
    this._elementMap = new HashMap();

    var data = jsonfile.readFileSync(elementMapFile).pageElements;
    var elementFactory = new ElementFactory();

    for(var i = 0; i < data.length; i++) {
        var element = elementFactory.createElement(data[i]['elementName'],
            data[i]['elementType'], data[i]['locatorType'], data[i]['locator'],
            data[i]['parentId'], data[i]['childId']);

        this._elementMap.set(element.getElementId(), element);
    }
};

PageObject.prototype.getUrl = function() {
    return this._url;
};

PageObject.prototype.getElement = function(elementId) {
    return this._elementMap.get(elementId);
};

PageObject.prototype.go = function() {
    return browser.get(this._url);
};

PageObject.prototype.isPageOpened = function () {
    return this._driver.getCurrentUrl().then(function(url) {
        return this._url === url;
    });
};

module.exports = PageObject;