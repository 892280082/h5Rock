define(function(require,exports,module) {
	function SpriteContainer(){
		this.sprite_container = {},
		this._sprite_array = [],
		this.x = 0,
		this.y = 0,
		this.width = 0,
		this.height = 0,
		this.scaleX = 1,
		this.scaleY = 1,
		this.rotation = 0,
		this.alpha = 1,
		this.regX = 0,
		this.regY = 0,
		this.visible = true,
		this.type = 'container',
		this.setSprite = function(name,sprite){
			this.sprite_container[name] = sprite;
			this._sprite_array = [];
			for(var p in this.sprite_container){
				this._sprite_array.push(this.sprite_container[p]);
			}
			sprite._sprite_container = this;
			sprite.getSpriteContainer = function(){
				return sprite._sprite_container;
			}
		},
		this.getSprite = function(name){
			if(typeof this.sprite_container[name] == 'undefined') throw 'could not find sprite in spriteManger'
			return this.sprite_container[name];
		},
		this.removeSprite = function(name){
			delete this.sprite_container[name];
			this._sprite_array = [];
			for(var p in this._spriteContainer){
				this._sprite_array.push(this._spriteContainer[p]);
			}
		}
		this.getSpriteArray = function(){
			return this._sprite_array;
		},
		this.clearContainer = function(){
			this.sprite_container = {};
		},
		this.setX = function(value){
			var delX = value - this.x;
			for(var i=0;i<this._sprite_array.length;i++){
				this._sprite_array[i].x += delX;
			}
		},
		this.setY = function(value){
			var delY = value - this.y;
			for(var i=0;i<this._sprite_array.length;i++){
				this._sprite_array[i].y += delY;
			}
		},
		this.setVisible = function(flag){
			flag = !!flag;
			for(var i=0;i<this._sprite_array.length;i++){
				this._sprite_array[i].visible = flag;
			}
		},
		this.setRotation = function(value){
			var delRotation = this.rotation - value;
			for(var i=0;i<this._sprite_array.length;i++){
				this._sprite_array[i].rotation += delRotation;
			}
		},
		this.show = function(ctx){
			for(var i=0;i<this._sprite_array.length;i++){
				this._sprite_array[i]._update();
				this._sprite_array[i]._render(ctx);
			}
		}
	}
	module.exports =  SpriteContainer;
});