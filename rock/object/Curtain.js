define(function(require,exports,module) {
	var DisplayObject = require('../display/DisplayObject');

	var curtain_left_pic = document.getElementById('curtain_left');
	var curtain_right_pic= document.getElementById('curtain_right');

	var container = new DisplayObject({ name:'curtain_container',width:1,height:1});

	container.curtain_left = new DisplayObject({ name:'curtain_left'});
	container.curtain_right = new DisplayObject({ name:'curtain_right'});

	container.curtain_left.setDrawable(curtain_left_pic);
	container.curtain_right.setDrawable(curtain_right_pic);

	//curtain_right.scaleY = 0.3;
	container.curtain_left.x = 0;
	container.curtain_right.x = 100;

	container.show = function(ctx){
		container.curtain_left._update();
		container.curtain_left._render(ctx);
		container.curtain_right._update();
		container.curtain_right._render(ctx);
	}

	container.open = function(){
		var flag = setInterval(function(){
			container.curtain_left.x-=2;
			container.curtain_right.x+=2;
			if(container.curtain_left.x<=-100){
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