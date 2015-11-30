define(function(require,exports,module) {
	var DisplayObject = require('../display/DisplayObject');

	var curtain_left_pic = document.getElementById('curtain_left');
	var curtain_right_pic= document.getElementById('curtain_right');
	var curtain_left = new DisplayObject({ name:'curtain_left',width:curtain_left_pic.width,height:curtain_left_pic.height });
	var curtain_right = new DisplayObject({ name:'curtain_right',width:curtain_right_pic.width,height:curtain_right_pic.height });

	curtain_left.setDrawable(curtain_left_pic);
	curtain_right.setDrawable(curtain_right_pic);

	//curtain_right.scaleY = 0.3;
	 curtain_left.x = 0;
	 curtain_right.x = 100;

	var show = function(ctx){
		curtain_left._update();
		curtain_left._render(ctx);
		curtain_right._update();
		curtain_right._render(ctx);
	}



	var open = function(){
		var flag = setInterval(function(){
			curtain_left.x-=2;
			curtain_right.x+=2;
			if(curtain_left.x<=-100){
				clearInterval(flag);
			}
		},30);
	}	

	var _pojo = {
		left:curtain_left,
		right:curtain_right,
		show:show,
		open:open
	}

	module.exports = _pojo;
});