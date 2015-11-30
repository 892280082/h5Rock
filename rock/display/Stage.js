define(function(require) {
	var children = [];
	var stage = {};

	stage.addChild = function(sprite){
		children.push(sprite);
		sprite.getStage = function(){
			return stage;
		}
	}

	stage.removeChild = function(sprite){
		children.remove(sprite);
	}

	stage.renderAll = function(ctx){
		for(var i=0;i<children.length;i++){
			children[i].show(ctx);
		}
	}

	stage.getChildArray = function(){
		return children;
	}

	stage.getObjectUnderPoint = function(x, y, usePolyCollision){
		for (var i = children.length - 1; i >= 0; i--) {
			var child = children[i];
			if (!child.visible || child.alpha <= 0) continue;
			if (child.hitTestPoint(x, y, usePolyCollision) > 0) return child;
		}
		return null;
	}
	return stage;
});