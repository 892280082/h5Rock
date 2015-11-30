define(function(require,exports,module) {
	var _sprite_array = [];
	var spriteManager = {};
	spriteManager.setSprite = function(name,sprite){
		_sprite_array[name] = sprite;
		sprite.getSpriteManager = function(){
			return spriteManager;
		}
	}

	spriteManager.getSprite = function(name){
		if(typeof _sprite_array[name] == 'undefined') throw 'could not find sprite in spriteManger'
		return _sprite_array[name];
	}

	spriteManager.clearArray = function(){
		_sprite_array = [];
	}

	module.exports = spriteManager;
});