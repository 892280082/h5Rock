define(function(require) {
	function Stage(){
		this.children =[],
		this.addChild = function(sprite){
			this.children.push(sprite);
			sprite._stage = this;
			sprite.getStage = function(){
				return this._stage;
			}
		},
		this.removeChild = function(sprite){
			for(var i=0;i<this.children;i++){
				if(this.children[i] == sprite){
					alert("true hahaha");
				}
			}
			this.children.remove(sprite);
		},
		this.renderAll = function(ctx){
			for(var i=0;i<this.children.length;i++){
				this.children[i].show(ctx);
			}
		},
		this.getChildArray = function(){
			return this.children;
		},
		this.getObjectUnderPoint = function(x, y, usePolyCollision){
			for (var i = this.children.length - 1; i >= 0; i--) {
				var child = this.children[i];
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