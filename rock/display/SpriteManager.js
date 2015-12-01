define(function(require,exports,module) {
	function SpriteManager(){
		this.sprite_container = {},
		this._sprite_array = [];
		this.setSprite = function(name,sprite){
			this.sprite_container[name] = sprite;
			this._sprite_array = [];
			for(var p in this.sprite_container){
				this._sprite_array.push(this.sprite_container[p]);
			}
			sprite._spriteManager = this;
			sprite.getSpriteManager = function(){
				return sprite._spriteManager;
			}
		},
		this.getSprite = function(name){
			if(typeof this.sprite_container[name] == 'undefined') throw 'could not find sprite in spriteManger'
			return this.sprite_container[name];
		},
		this.removeSprite = function(name){
			delete this.sprite_container[name];
			this._sprite_array = [];
			for(var p in this.sprite_container){
				this._sprite_array.push(this.sprite_container[p]);
			}
		},
		this.clearArray = function(){
			this.sprite_container = [];
		},
		this.getSpriteArray = function(){
			return this._sprite_array;
		}
	}
	module.exports = new SpriteManager();
});