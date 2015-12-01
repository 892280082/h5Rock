define(function(require,exports,module) {
	var Container =  require('../display/SpriteContainer');
	var DisplayObject = require('../display/DisplayObject');

	var curtain_left_pic = document.getElementById('curtain_left');
	var curtain_left = new DisplayObject({ name:'curtain_left'});
	curtain_left.setDrawable(curtain_left_pic);

	var curtain_right_pic= document.getElementById('curtain_right');
	var curtain_right = new DisplayObject({ name:'curtain_right'});
	curtain_right.setDrawable(curtain_right_pic);

	var mon_pic = document.getElementById('monkey');
	var monkey = new DisplayObject({ name:'monkey' });
	monkey.setDrawable(mon_pic);

	var red_package_pic = document.getElementById('red_package');
	var red_package = new DisplayObject({ name:'red_package'});
	red_package.setDrawable(red_package_pic);

	var container = new Container();
	
	container.setSprite('monkey',monkey);
	container.setSprite('red_package',red_package);
	container.setSprite('left',curtain_left);
	container.setSprite('right',curtain_right);

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


	curtain_left.on('click',function(e){
		alert('hahaha');
	});


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
					}
				}else{
					red_package.rotation -= totation_delta;
					if(red_package.rotation <0){
						red_package.rotation = 0;
						clearInterval(flag);
					}				
				}
			}
		},30);
	}

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
			setTimeout(function(){
				container.packAgeAction();
			},300);
		},600);
	}
	module.exports = container;
});