define(function(require,exports,module) {
	var Container =  require('../display/SpriteContainer');
	var DisplayObject = require('../display/DisplayObject');
	var spriteUtil = require('../util/spriteUtil');

	var container = new Container();
	var sprite_id_array = ['font_mai','font_ji','font_ke','font_xue'];
	var $ = spriteUtil.setSpriteToContainer(sprite_id_array,container);

	$.font_mai.init = function(){
		this.scaleX = 4;
		this.scaleY = 4;
		this.x = 10;
		this.y = 90;
		this.rotation = -30;
		this.alpha =0.1;
	}
	
	$.font_ji.init = function(){
		this.scaleX = 0.8;
		this.scaleY = 0.8;
		this.x = 60;
		this.y = -30;
	}

	$.font_ke.init = function(){
		this.scaleX = 0.8;
		this.scaleY = 0.8;
		this.alpha = 0.1;
		this.x = 105;
		this.y = 50;
		this.setCenter();
	}


	$.font_xue.init = function(){
		this.scaleX = 0.1;
		this.scaleY = 0.1;
		this.x = 145;
		this.y = 85;
	}
	

	container.action_mai = function(){
		$.font_mai.init();
		var flag = setInterval(function(){
			$.font_mai.alpha +=0.05;
			if($.font_mai.scaleX > 0.8){
				$.font_mai.scaleX -= 0.1;
				$.font_mai.scaleY -= 0.1;
			}
			if($.font_mai.alpha >= 2)clearInterval(flag);
		},30);
	}

	container.action_ji = function(){
		$.font_ji.init();
		var flag = setInterval(function(){
			$.font_ji.y += 10;
			if($.font_ji.y >= 85)clearInterval(flag);
		},30);
	}


	container.action_ke = function(){
		$.font_ke.init();
		var flag = setInterval(function(){
			$.font_ke.rotation += 10;
			if($.font_ke.alpha < 1) $.font_ke.alpha+=0.1;
			if($.font_ke.rotation%360 ==0)clearInterval(flag);
		},30);
	}

	container.action_xue = function(){
		$.font_xue.init();
		var flag = setInterval(function(){
			$.font_xue.scaleX  += 0.1;
			$.font_xue.scaleY += 0.1;
			if($.font_xue.scaleX > 0.8){
				clearInterval(flag);
			}
		},30);
	}

	container.init = function(){
		$.font_mai.init();
		$.font_ji.init();
		$.font_ke.init();
		$.font_xue.init();
	}

	container.init();
	module.exports = container;
});