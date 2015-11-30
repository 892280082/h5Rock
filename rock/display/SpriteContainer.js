define(function(require,exports,module) {
	function SpriteContainer(){
		this._sprite_array = {},
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
			this._sprite_array[name] = sprite;
			sprite._spriteContainer = this;
			sprite.getSpriteContainer = function(){
				return sprite._spriteContainer;
			}
		},
		this.getSprite = function(name){
			if(typeof this._sprite_array[name] == 'undefined') throw 'could not find sprite in spriteManger'
			return this._sprite_array[name];
		},
		this.getSpriteArray = function(){
			var tempArray = [];
			for(var p in this._sprite_array){
				tempArray.push(this._sprite_array[p]);
			}
			return tempArray;
		},
		this.clearArray = function(){
			this._sprite_array = [];
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
		this.visible = function(flag){
			flag = !!flag;
			for(var i=0;i<this._sprite_array.length;i++){
				this._sprite_array[i].visible = flag;
			}
		},
		this.setRotation = function(value){
			var delRotation = this.rotation - value;
			for(var i=0;i<this._sprite_array.length;i++){
				this._sprite_array[i].rotation = delRotation;
			}
		},
		this.show = function(ctx){
			var spriteArray = this.getSpriteArray();
			for(var i=0;i<spriteArray.length;i++){
				spriteArray[i]._update();
				spriteArray[i]._render(ctx);
			}
		}
	}
	module.exports =  SpriteContainer;
});