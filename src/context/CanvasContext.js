define(function(require) {
	var Class = require('core/Class');
	var utils = require('util/Utils');

	var CanvasContext = Class.create({
		initialize: function(props) {
			if (props.canvas == null) throw 'Context Error: canvas is required.';
			this.canvas = null;
			utils.merge(this, props);
			this.context = this.canvas.getContext('2d');
		},
		startDraw: function() {
			this.context.save();
		},
		draw: function(target) {
			if (target._cache != null) {
				this.context.drawImage(target._cache, 0, 0);
			} else {
				var img = target.getDrawable(this);
				if (img != null) {
					arguments[0] = img;
					this.context.drawImage.apply(this.context, arguments);
				}
			}
		},
		endDraw: function() {
			this.context.restore();
		},
		transform: function(target) {
			var ctx = this.context;
			if (target.x != 0 || target.y != 0) ctx.translate(target.x, target.y);
			if (target.regX != 0 || target.regY != 0) ctx.translate(target.regX, target.regY);
			if (target.rotation % 360 != 0) ctx.rotate(target.rotation % 360 * Math.PI / 180);
			if (target.scaleX != 1 || target.scaleY != 1) ctx.scale(target.scaleX, target.scaleY);
			if (target.regX != 0 || target.regY != 0) ctx.translate(-target.regX, -target.regY);

			if (target.alpha > 0) ctx.globalAlpha *= target.alpha;
		},
		clear: function(x, y, width, height) {
			this.context.clearRect(x, y, width, height);
		}
	});

	return CanvasContext;
});