define(function(require) {
	var Class = require('core/Class');
	var Event = require('core/Events');
	var Drawable = require('display/Drawable');
	var utils = require('util/Utils');

	var DisplayObject = Class.create({
		Implements: Event,
		initialize: function(props) {
			this.id = utils.createUID('DisplayObject');
			this.name = '';
			this.x = 0;
			this.y = 0;
			this.width = 0;
			this.height = 0;
			this.scaleX = 1;
			this.scaleY = 1;
			this.rotation = 0;
			this.alpha = 1;
			this.regX = 0;
			this.regY = 0;
			this.visible = true;
			this.totalPic = [];
			this.type = 'sprite';

			this.context = null;
			this.drawable = null;

			utils.merge(this, props);
		},
		setDrawable: function(drawable) {
			if (this.drawable == null) {
				this.drawable = new Drawable(drawable);
			} else if (this.drawable.rawDrawable != drawable) {
				this.drawable.set(drawable);
			}
			this.width = drawable.width;
			this.height = drawable.height;
		},
		getWidth:function(){
			return this.width*this.scaleX;
		},
		getHeight:function(){
			return this.height*this.scaleY;
		},
		setCenter:function(){
			this.regX  =  this.getWidth()/2;
			this.regY =  this.getHeight()/2;
		},
		getDrawable: function(context) {
			return this._cache || this.drawable && this.drawable.get(this, context);
		},
		_update: function() {
			this.update();
		},
		update: function() {
			return true;
		},
		_render: function(context) {
			var ctx = this.context || context;
			if (!this.visible || this.alpha <= 0) {
				return;
			}
			ctx.startDraw();
			ctx.transform(this);
			this.render(ctx);
			ctx.endDraw();
		},
		render: function(context) {
			context.draw(this, 0, 0);
		},
		cache: function(toImage, type) {
			var w = this.width, h = this.height;
			var canvas = utils.createDOM('canvas', {width: w, height: h});
			var context = canvas.getContext('2d');
			this.render(context);

			if (toImage) {
				var img = new Image();
				img.width = w;
				img.height = h;
				img.src = canvas.toDataURL(type || 'image/png');
				this._cache = img;
			}
			this._cache = canvas;
		},		uncache: function() {
			this._cache = null;
		},
		isCached: function() {
			return !!this._cache;
		},
		toImage: function(type) {
			return this.cache(true, type);
		},
		getBounds: function() { // todo matrix
			var w = this.width || this.drawable.getWidth();
			var h = this.height || this.drawable.getHeight();
			var vertexs = [{x:0, y:0}, {x:w, y:0}, {x:w, y:h}, {x:0, y:h}];
			vertexs.x = this.x;
			vertexs.y = this.y;
			vertexs.width = w;
			vertexs.height = h;
			return vertexs;
		},
		hitTestPoint: function(x, y, usePolyCollision) {
			return utils.hitTestPoint(this, x, y, usePolyCollision);
		},
		changeSelfPic:function(timeCount){
			var length = this.totalPic.length;
			var changeIndex = timeCount % length;
			this.setDrawable(this.totalPic[changeIndex]);
		},
		show:function(ctx){
			this._update();
			this._render(ctx);
		}
	});

	return DisplayObject;
});