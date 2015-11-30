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

	hand._nextPojo = [];
	hand.setNextPojo = function(name,pojo){
		name = "_nextPojo" + name;
		hand._nextPojo[name] = pojo;
	}
	hand.getNextPojo  = function(name){
		name = "_nextPojo" + name;
		if(typeof hand._nextPojo[name] == 'undefined') throw "_nextPojo havn't this pojo";
		return hand._nextPojo[name];
	}

	hand.upParent = Object;



	hand.toNextAction = function(){
		hand.upParent.removeChild(hand);
		var curtain = hand.getNextPojo('curtain');
		hand.upParent.addChild(curtain.left);
		hand.upParent.addChild(curtain.right);
		setTimeout(function(){
			curtain.open();
		},1000)
		// curtain.render(ctx);
		// curtain.open();
	}

	module.exports = hand;
});