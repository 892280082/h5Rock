define(function(require,exports,module) {
	var Container =  require('../display/SpriteContainer');
	var DisplayObject = require('../display/DisplayObject');


	var curtain_left_pic = document.getElementById('curtain_left');
	var curtain_right_pic= document.getElementById('curtain_right');
	curtain_left = new DisplayObject({ name:'curtain_left'});
	curtain_right = new DisplayObject({ name:'curtain_right'});
	curtain_left.setDrawable(curtain_left_pic);
	curtain_right.setDrawable(curtain_right_pic);

	var container = new Container();

	container.setSprite('left',curtain_left);
	container.setSprite('right',curtain_right);

	//curtain_right.scaleY = 0.3;
	curtain_left.x = 0;
	curtain_right.x = 100;

	curtain_left.on('click',function(e){
		alert('hahaha');
	});
	
	container.open = function(){
		var flag = setInterval(function(){
			curtain_left.x-=2;
			curtain_right.x+=2;
			if(curtain_left.x<=-100){
				clearInterval(flag);
			}
		},30);
	}

	container.toNextAction = function(){
		setTimeout(function(){
			container.open();
		},600);
	}
	module.exports = container;
});