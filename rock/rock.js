define(function(require) {
	var Stage = require('display/Stage');
	var DisplayObject = require('display/DisplayObject');
	var CanvasContext = require('context/CanvasContext');
	var EventMng = require('game/EventMng');
	var Drawable = require('display/Drawable');
	var utils = require('util/Utils');

	var canvas = document.getElementById('mainCanvas');
	var ctx = new CanvasContext({canvas: canvas});

	var hand = new DisplayObject({ name:'hand',width:200,height:200 });
	hand.setDrawable(document.getElementById('hand'));

	hand.scaleX = 0.5;
	hand.scaleY = 0.5;
	hand.x = 100;
	hand.y = 100;
	hand.doRota = function(){
		var setFlag =  setInterval(function(){
			hand.rotation += 5;
		},30);
	}
	hand.on('click',function(e){
		this.doRota();
	});

	var stage = new Stage();
	var eventMng = new EventMng(canvas, stage);
	eventMng.init();
	stage.addChild(hand);

	

	setInterval(function() {
		ctx.clear(0, 0, 800, 600);
		eventMng.dispatch();
		hand._update();
		hand._render(ctx);
	},30);

});