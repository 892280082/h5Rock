define(function(require,exports,module) {
	var DisplayObject = require('../display/DisplayObject');

	var hand_pic = document.getElementById('hand');
	var hand_rock_voice = document.getElementById('hand_rock_voice');
	var hand = new DisplayObject({ name:'hand',width:hand_pic.width,height:hand_pic.height });
	hand.setDrawable(hand_pic);

	hand.scaleX = 0.6;
	hand.scaleY = 0.6;

	hand.regX = hand.width/2;
	hand.regY = hand.height/2;

	hand.x = 30;
	hand.y = 20;

	hand.doRota = function(){
		hand_rock_voice.play();
		var rotation_time = 3;
		var totation_angel = 50;
		var rotaFlag = 1;
		var flag = setInterval(function(){
			if(rotaFlag < rotation_time){
				if(rotaFlag%2 == 1){
					hand.rotation +=10;
					if(hand.rotation>totation_angel){
						rotaFlag +=1;
					}
				}else{
					hand.rotation -=10;
					if(hand.rotation < -totation_angel){
						rotaFlag +=1;
					}
				}
			}else{
				if(hand.rotation <0){
					hand.rotation += 10;
					if(hand.rotation >0){
						hand.rotation = 0;
						hand.toNextAction();
						clearInterval(flag);
					}
				}else{
					hand.rotation -= 10;
					if(hand.rotation <0){
						hand.rotation = 0;
						hand.toNextAction();
						clearInterval(flag);
					}				
				}
			}
		},30);
	}

	hand.on('click',function(e){
		hand.doRota();
	});

	hand.show = function(ctx){
		hand._update();
		hand._render(ctx);
	}

	hand.toNextAction = function(){
		hand.getStage().removeChild(hand);
		var curtain = hand.getSpriteManager().getSprite('curtain');
		hand.getStage().addChild(curtain);
		//hand.getStage().addChild(curtain.curtain_right);
		curtain.toNextAction();
		// curtain.render(ctx);
		// curtain.open();
	}

	module.exports = hand;
});