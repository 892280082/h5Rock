define(function(require,exports,module) {
	var Container =  require('../display/SpriteContainer');
	var DisplayObject = require('../display/DisplayObject');
	var spriteUtil = require('../util/spriteUtil');

	var container = new Container();
	var sprite_id_array = ['monkey','red_package',
	'curtain_left','curtain_right'];
	var $ = spriteUtil.setSpriteToContainer(sprite_id_array,container);

	var monkey = $.monkey;
	var red_package = $.red_package;
	var curtain_left = $.curtain_left;
	var curtain_right = $.curtain_right;

	//set monkey
	monkey.x = 30;
	monkey.y = 10;
	monkey.scaleX = 0.8;
	monkey.scaleY = 0.8;

	//red_page
	red_package.x =40;
	red_package.y = 88;

	//curtain_right.scaleY = 0.3;
	curtain_left.x = 0;
	curtain_right.x = 100;

	container.packAgeAction = function(){
			var rotation_time = 5;
			var totation_angel = 15;
			var totation_delta = 2;
			var rotaFlag = 1;
		var flag = setInterval(function(){
			if(rotaFlag < rotation_time){
				if(rotaFlag%2 == 1){
					red_package.rotation +=totation_delta;
					if(red_package.rotation>totation_angel){
						rotaFlag +=1;
					}
				}else{
					red_package.rotation -=totation_delta;
					if(red_package.rotation < -totation_angel){
						rotaFlag +=1;
					}
				}
			}else{
				if(red_package.rotation <0){
					red_package.rotation += totation_delta;
					if(red_package.rotation >0){
						red_package.rotation = 0;
						clearInterval(flag);
						container.close();
					}
				}else{
					red_package.rotation -= totation_delta;
					if(red_package.rotation <0){
						red_package.rotation = 0;
						clearInterval(flag);
						container.close();
					}				
				}
			}
		},30);
	}

	var open_time;
	container.open = function(){
		open_time=0;
		curtain_left.x = 0;
		curtain_right.x = 100;
		var flag = setInterval(function(){
			curtain_left.x-=2;
			curtain_right.x+=2;
			open_time++;
			if(curtain_left.x<=-100){
				clearInterval(flag);
			}
		},30);
	}

	container.close = function(){
		close_time = 0;
		var flag = setInterval(function(){
			curtain_left.x+=2;
			curtain_right.x-=2;
			close_time++;
			if(close_time == open_time){
				var hand = container.getSpriteManager().getSprite('hand');
				container.getStage().addChild('hand',hand);
				clearInterval(flag);
			}
		},30);
	}




	container.toNextAction = function(){
		setTimeout(function(){
			container.open();
			setTimeout(function(){
				container.packAgeAction();
			},1000);
		},600);
	}
	module.exports = container;
});