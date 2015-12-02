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
		this.y = 80;
		this.rotation = -30;
		this.alpha =0.1;
	}
	$.font_mai.init();

	$.font_ji.init = function(){
		this.scaleX = 0.8;
		this.scaleY = 0.8;
		this.x = 60;
		this.y = -40;
	}
	$.font_ji.init();

	$.font_ke.init = function(){
		this.scaleX = 0.8;
		this.scaleY = 0.8;
		this.x = 85;
		this.y = 20;
		this.setCenter();
	}
	$.font_ke.init();

	$.font_xue.init = function(){
		this.scaleX = 0.1;
		this.scaleY = 0.1;
		this.x = 135;
		this.y = 65;
	}
	$.font_xue.init();

	container.action_mai = function(){
		$.font_mai.init();
		var flag = setInterval(function(){
			$.font_mai.alpha +=0.05;
			if($.font_mai.scaleX > 0.8){
				$.font_mai.scaleX -= 0.1;
				$.font_mai.scaleY -= 0.1;
			}
			if($.font_mai.alpha == 1)clearInterval(flag);
		},30);
	}

	container.action_ji = function(){
		$.font_ji.init();
		var flag = setInterval(function(){
			$.font_ji.y += 10;
			if($.font_ji.y == 130)clearInterval(flag);
		},30);
	}

	container.action_ke = function(){
		$.font_ke.init();
		var flag = setInterval(function(){
			$.font_ke.rotation += 10;
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




	// container.packAgeAction = function(){
	// 		var rotation_time = 5;
	// 		var totation_angel = 15;
	// 		var totation_delta = 2;
	// 		var rotaFlag = 1;
	// 	var flag = setInterval(function(){
	// 		if(rotaFlag < rotation_time){
	// 			if(rotaFlag%2 == 1){
	// 				red_package.rotation +=totation_delta;
	// 				if(red_package.rotation>totation_angel){
	// 					rotaFlag +=1;
	// 				}
	// 			}else{
	// 				red_package.rotation -=totation_delta;
	// 				if(red_package.rotation < -totation_angel){
	// 					rotaFlag +=1;
	// 				}
	// 			}
	// 		}else{
	// 			if(red_package.rotation <0){
	// 				red_package.rotation += totation_delta;
	// 				if(red_package.rotation >0){
	// 					red_package.rotation = 0;
	// 					clearInterval(flag);
	// 					container.close();
	// 				}
	// 			}else{
	// 				red_package.rotation -= totation_delta;
	// 				if(red_package.rotation <0){
	// 					red_package.rotation = 0;
	// 					clearInterval(flag);
	// 					container.close();
	// 				}				
	// 			}
	// 		}
	// 	},30);
	// }

	// var open_time;
	// container.open = function(){
	// 	open_time=0;
	// 	curtain_left.x = 0;
	// 	curtain_right.x = 100;
	// 	var flag = setInterval(function(){
	// 		curtain_left.x-=2;
	// 		curtain_right.x+=2;
	// 		open_time++;
	// 		if(curtain_left.x<=-100){
	// 			clearInterval(flag);
	// 		}
	// 	},30);
	// }

	// container.close = function(){
	// 	close_time = 0;
	// 	var flag = setInterval(function(){
	// 		curtain_left.x+=2;
	// 		curtain_right.x-=2;
	// 		close_time++;
	// 		if(close_time == open_time){
	// 			var hand = container.getSpriteManager().getSprite('hand');
	// 			container.getStage().addChild('hand',hand);
	// 			clearInterval(flag);
	// 		}
	// 	},30);
	// }




	// container.toNextAction = function(){
	// 	setTimeout(function(){
	// 		container.open();
	// 		setTimeout(function(){
	// 			container.packAgeAction();
	// 		},1000);
	// 	},600);
	// }
	module.exports = container;
});