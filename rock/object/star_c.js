define(function(require,exports,module) {
	var Container =  require('../display/SpriteContainer');
	var DisplayObject = require('../display/DisplayObject');
	var spriteUtil = require('../util/spriteUtil');

	var container = new Container();
	var start = spriteUtil.getSprite('stick_light');
	container.setSprite('start',start);

	module.exports = container;
});