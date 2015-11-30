define(function(require) {
	function Stage(){
		this.children ={},
		this.addChild = function(name,sprite){
			this.children[name] = sprite;
			sprite._stage = this;
			sprite.getStage = function(){
				return this._stage;
			}
		},
		this.removeChild = function(name){
			delete this.children[name];
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
			var tempArray = this.getChildArray();
			for (var i = tempArray.length - 1; i >= 0; i--) {
				var child = tempArray[i];
				if(typeof child == 'undefined'){
					return null;
				}
				if(child.type == 'sprite'){
					if (!child.visible || child.alpha <= 0) continue;
					if (child.hitTestPoint(x, y, usePolyCollision) > 0) return child;
				}else if(child.type == 'container'){
					var sprite_array = child.getSpriteArray();
					for(var i=0;i<sprite_array.length;i++){
						var tempChild = sprite_array[i];
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