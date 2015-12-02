define(function(require,exports,module) {
	var DisplayObject = require('../display/DisplayObject');
	var spriteUtil = require('../util/spriteUtil');

	var magic_stick = spriteUtil.getSprite('magic_stick');

	magic_stick.init = function(){
		this.x = 52;
		this.y = 55;
		this.rotation = -60;
		this.scaleY = 1.2;
		this.setCenter();
	}
	magic_stick.init();

	magic_stick.doRota = function(){
		var count = 2;
		var index = 0;
		var flag = setInterval(function(){
			magic_stick.rotation += 5;
			if(magic_stick.rotation%360 == 0){
				index++;
			}
			if(index == count){
				clearInterval(flag);
			}
		},30);
	}

	magic_stick.on('click',function(){
		this.doRota();
	});

	module.exports = magic_stick;
});