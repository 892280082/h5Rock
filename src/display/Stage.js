define(function(require) {
	var Class = require('core/Class');

	var Stage = Class.create({
		initialize: function(props) {
			this.children = [];
		},
		addChild: function(child) {
			this.children.push(child);
		},
		getObjectUnderPoint: function(x, y, usePolyCollision) {
			for (var i = this.children.length - 1; i >= 0; i--) {
				var child = this.children[i];
				if (!child.visible || child.alpha <= 0) continue;
				if (child.hitTestPoint(x, y, usePolyCollision) > 0) return child;
			}
			return null;
		}
	});

	return Stage;
});