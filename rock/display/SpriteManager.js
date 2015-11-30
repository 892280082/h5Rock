define(function(require,exports,module) {
	function SpriteManager(){
		this._sprite_array = {},
		this.setSprite = function(name,sprite){
			this._sprite_array[name] = sprite;
			sprite._spriteManager = this;
			sprite.getSpriteManager = function(){
				return sprite._spriteManager;
			}
		},
		this.getSprite = function(name){
			if(typeof this._sprite_array[name] == 'undefined') throw 'could not find sprite in spriteManger'
			return this._sprite_array[name];
		},
		this.clearArray = function(){
			this._sprite_array = [];
		},
		this.getSpriteArray = function(){
			var tempArray = [];
			for(var p in this._sprite_array){
				tempArray.push(this._sprite_array[p]);
			}
			return tempArray;
		}
	}
	module.exports = new SpriteManager();
});