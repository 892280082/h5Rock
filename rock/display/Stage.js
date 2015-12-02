define(function(require) {
	function Stage(){
		this.children ={},
		this._sprite_array = [];
		this.addChild = function(name,sprite){
			this.children[name] = sprite;
			sprite._stage = this;
			this._sprite_array = this.getChildArray();
			sprite.getStage = function(){
				return this._stage;
			}
		},
		this.removeChild = function(name){
			delete this.children[name];
			this._sprite_array = this.getChildArray();
		},
		this.renderAll = function(ctx){
			var array = this.getChildArray();
			for(var i=0;i<array.length;i++){
				array[i].show(ctx);
			}
		},
		this.getChildArray = function(){
			var tempArray = [];
			for(var p in this.children){
				tempArray.push(this.children[p]);
			}
			return tempArray;
		},
		this.getObjectUnderPoint = function(x, y, usePolyCollision){
			for (var i = this._sprite_array.length - 1; i >= 0; i--) {
				var child = this._sprite_array[i];
				if(typeof child == 'undefined'){
					return null;
				}else if(child.type == 'sprite'){
					if (!child.visible || child.alpha <= 0) continue;
					if (child.hitTestPoint(x, y, usePolyCollision) > 0) return child;
				}else if(child.type == 'container'){
					var sprite_array = child.getSpriteArray();
					for(var j=0;j<sprite_array.length;j++){
						var tempChild = sprite_array[j];
						if (!tempChild.visible || tempChild.alpha <= 0) continue;
						if (tempChild.hitTestPoint(x, y, usePolyCollision) > 0) return tempChild;
					}
				}
			}
			return null;
		}
	}

	return new Stage();
});