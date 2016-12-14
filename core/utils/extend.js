'use strict';

function extend(child, parent) {
	var f = new Function();
	f.prototype = parent.prototype;
	child.prototype = new f();
	child.prototype.constructor = child;
	child.superclass = parent.prototype;
    
    return child;
}

module.exports = extend;