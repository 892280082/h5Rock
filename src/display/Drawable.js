define(function(require) {
	var Class = require('core/Class');

	var Drawable = Class.create({
		initialize: function(drawable) {
			this.rawDrawable = null;
			this.set(drawable);
		},
		getWidth: function() {
			return this.rawDrawable.width;
		},
		getHeight: function() {
			return this.rawDrawable.height;
		},
		get: function(obj, context) {
			if (context == null || context.canvas.getContext != null) {
				return this.rawDrawable;
			}
		},
		set: function(drawable) {
			if (isDrawable(drawable)) this.rawDrawable = drawable;
		}
	});

	function isDrawable(elem) {
		if (elem == null) return false;
		return (elem instanceof HTMLImageElement) ||
			(elem instanceof HTMLCanvasElement) ||
			(elem instanceof HTMLVideoElement);
	}

	return Drawable;
});