define(function(require) {
	var Class = require('core/Class');
	var Event = require('core/Events');
	var utils = require('util/Utils');

	var EventMng = Class.create({
		initialize: function(canvas, stage) {
			this.canvas = canvas;
			this.stage = stage;
			this.lastDown = null;
			this.lastOver = null;
			this.mouseCache = {};
		},
		init: function() {
			if (utils.isMobile && !utils.isWPhone) {
				this.canvas.addEventListener('touchstart', this.mousedown.bind(this), false);
				this.canvas.addEventListener('touchend', this.mouseup.bind(this), false);
				this.canvas.addEventListener('touchmove', this.mousemove.bind(this), false);
			} else {
				this.canvas.addEventListener('mousedown', this.mousedown.bind(this), false);
				this.canvas.addEventListener('mouseup', this.mouseup.bind(this), false);
				this.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
			}
		},
		mousedown: function(e) {
			e.preventDefault();
			this._updateMouse(e);
			this.mouseCache.mousedown = true;
		},
		mouseup: function(e) {
			e.preventDefault();
			this._updateMouse(e);
			this.mouseCache.mouseup = true;
		},
		mousemove: function(e) {
			e.preventDefault();
			this._updateMouse(e);
			this.mouseCache.mousemove = true;
		},
		_updateMouse: function(e) {
			var layerX, layerY;
			if (utils.isMobile && !utils.isWPhone) {
				if (e.type == 'touchend') {
					layerX = e.changedTouches[0].clientX;
					layerY = e.changedTouches[0].clientY;
				} else if (e.touches && e.touches[0]) {
					layerX = e.touches[0].clientX;
					layerY = e.touches[0].clientY;
				}
				layerX -= this.originX;
				layerY -= this.originY;
			} else {
				layerX = e.layerX || e.offsetX;
				layerY = e.layerY || e.offsetY;
			}

			EventMng.mouse.x = layerX;
			EventMng.mouse.y = layerY;
		},
		dispatch: function() {
			var targetSprite;
			this.mouseCache.mouseNow = true;
			if (utils.isEmptyObject(this.mouseCache)) {
				targetSprite = this.stage.getObjectUnderPoint(EventMng.mouse.x, EventMng.mouse.y);
				//获得背景的鼠标坐标
				targetSpriteUnder = this.stage.children[0];
				this.mouseCache.mousedown && this.mousedownDispatch(targetSprite);
				this.mouseCache.mouseup && this.mouseupDispatch(targetSprite);
				this.mouseCache.mousemove && this.mousemoveDispatch(targetSprite);
				this.mouseCache.mouseNow && this.mouseNowDispatch(targetSpriteUnder);
				this.mouseCache = {};
			}
			EventMng.mouse.deltaX = EventMng.mouse.x - EventMng.mouse.lastX;
			EventMng.mouse.deltaY = EventMng.mouse.y - EventMng.mouse.lastY;
			EventMng.mouse.lastX = EventMng.mouse.x;
			EventMng.mouse.lastY = EventMng.mouse.y;
		},
		mousedownDispatch: function(targetSprite) {
			this._trigger(this.lastDown = targetSprite, 'mousedown');
		},
		mouseupDispatch: function(targetSprite) {
			if (targetSprite) {
				this._trigger(targetSprite, 'mouseup');
				if (targetSprite == this.lastDown) {
					this._trigger(targetSprite, 'click');
				}
			}
			if (this.lastDown && this.lastDown != targetSprite) {
				this._trigger(this.lastDown, 'mouseout');
			}
			this.lastDown = null;
		},
		mousemoveDispatch: function(targetSprite) {
			if (this.lastDown) return this._trigger(this.lastDown, 'mousemove');

			if (targetSprite) {
				if (this.lastOver != targetSprite) {
					if (this.lastOver) this._trigger(this.lastOver, 'mouseout');
					this.lastOver = targetSprite;
					this._trigger(targetSprite, 'mouseover');
				}
				this._trigger(targetSprite, 'mousemove');
			} else {
				if (this.lastOver) {
					this._trigger(this.lastOver, 'mouseout');
					this.lastOver = null;
				}
			}
		},
		mouseNowDispatch: function(targetSprite){
			this._trigger(targetSprite,'mouseNow');
		}
		,
		_trigger: function(targetSprite, type) {
			if (!targetSprite) return;

			var evt = new _Event(targetSprite, type);
			targetSprite.trigger(type, evt);
		},
		Statics: {
			mouse: {
				x: 0,
				y: 0
			}
		}
	});

	var _Event = Class.create({
		initialize: function(targetSprite, type) {
			this.type = type;
			this.target = targetSprite;
			this.mouse = EventMng.mouse;
		}
	});

	return EventMng;
});