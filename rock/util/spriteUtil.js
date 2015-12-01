define(function(require,exports,module) {
	var DisplayObject = require('../display/DisplayObject');

	var util = {};

	util.getSpritesById = function(array){
		var _spriteContainer = {};
		for(var i=0;i<array.length;i++){
			var sprite_draw = document.getElementById(array[i]);
			var sprite = new DisplayObject({ name:array[i]});
			sprite.setDrawable(sprite_draw);
			_spriteContainer[array[i]] = sprite;
		}
		return _spriteContainer;
	}

	util.setSpriteToContainer = function(sprite_id_array,container){
		var _spriteContainer = this.getSpritesById(sprite_id_array);
		for(var p in _spriteContainer){
			container.setSprite(p,_spriteContainer[p]);
		}
		return _spriteContainer;
	}

	util.getSpritesGif = function(image_id_array,speed,name){
		name ? name : image_id_array[0];
		speed ? speed : 1000;
		var sprite = new DisplayObject({ 'name':name});
		sprite._gif_drawable = [];
		sprite._gif_speed = speed;
		for(var i=0;i<image_id_array.length;i++){
			sprite._gif_drawable.push(document.getElementById(image_id_array[i]));
		}
		sprite.gifStart = function(){
			var array_length = this._gif_drawable.length;
			var i =0;
			this._gif_flag = setInterval(function(){
				this.setDrawable(this._gif_drawable[i++]);
				if(i%array_length) i = 0;
			},this._gif_speed);
		}
		sprite.gifStop = function(){
			clearInterval(this._gif_flag);
		}
	}

	module.exports = util;
});