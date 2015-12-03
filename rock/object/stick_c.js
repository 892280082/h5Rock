define(function(require,exports,module) {
	var Container =  require('../display/SpriteContainer');
	var DisplayObject = require('../display/DisplayObject');
	var spriteUtil = require('../util/spriteUtil');

	var container = new Container();
	var sprite_id_array = ['stick'];

	var stick = spriteUtil.getSprite('stick');
	var start = spriteUtil.getSprite('star');

	stick.init = function(){
		this.scaleX = 1;
		this.scaleY = 1;
		this.x = 30;
		this.y = 100;
		this.rotation = -30;
	}
	
	start.init = function(){
		scale_random = Math.random()*2/10;
		x_random =Math.random()*30+40;
		this.scaleX = 0.2+scale_random;
		this.scaleY = 0.2+scale_random;
		this.x = stick.x+x_random;
		this.y = stick.y-30;
	}

	start.dropAction = function(){
		var temp_start = this;
		temp_start.init();
		var speed = Math.random()*6+2;
		if(temp_start._star_dop_flag ){
			var flag = setInterval(function(){
				temp_start.y +=speed;
				if(temp_start.y >=230){
					clearInterval(flag);
					temp_start.dropAction();
				}
			},30);
		}	

	}
	var star_array = spriteUtil.spriteCopyArray(start,6);
	container.setSprite('stick',stick);

	stick.drop_star = function(){
		container.setSpriteArray('star_',star_array);
		for(var i = 0;i<star_array.length;i++){
			star_array[i]._star_dop_flag = true;
			star_array[i].dropAction();
		}
	}
	stick.drop_stop = function(){
		container.removeSpriteArray('star_');
		for(var i = 0;i<star_array.length;i++){
			star_array[i]._star_dop_flag = false;
		}
	}


	stick.move_action = function(){
		stick.init();
		stick.drop_star();
		var rotation = 0;
		var flag = setInterval(function(){
			stick.rotation -= 1;
			stick.x -=2;
			if(stick.rotation == -60){
				clearInterval(flag);
				stick.left_action();
			}
		},30);
	}

	stick.left_action = function(){
		var fonts = container.getSpriteManager().getSprite('fonts');
		var curtain = container.getSpriteManager().getSprite('curtain');
		var flag = setInterval(function(){
			stick.x +=2;
			if(stick.x%2) stick.x +=1;
			if(stick.x == 2)fonts.action_mai();
			if(stick.x == 20)fonts.action_ji();
			if(stick.x == 40)fonts.action_ke();
			if(stick.x == 100)fonts.action_xue();
			if(stick.x >= 230){
				clearInterval(flag);
				stick.drop_stop();
				curtain.toNextAction();
			}
		},30);
	}


	stick.init();
	stick.on('click',function(){
		stick.move_action();
	})

	container.init = function(){
		stick.init();
	}

	module.exports = container;
});