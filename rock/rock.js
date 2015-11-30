define(function(require) {
	var stage = require('display/Stage');
	var DisplayObject = require('display/DisplayObject');
	var CanvasContext = require('context/CanvasContext');
	var EventMng = require('game/EventMng');
	var Drawable = require('display/Drawable');
	var spriteManager = require('display/SpriteManager');
	var utils = require('util/Utils');

	//配置canvas画布
	var canvas = document.getElementById('mainCanvas');
	var ctx = new CanvasContext({canvas: canvas});
	//创建手对象
	var hand = require('object/Hand.js');
	var curtain = require('object/curtation_c.js');


	//将精灵加入精灵管理器中
	spriteManager.setSprite('hand',hand);
	spriteManager.setSprite('curtain',curtain);

	//创建舞台，并添加对象
	stage.addChild(hand);


	//创建并初始化事物管理器
	var eventMng = new EventMng(canvas, stage);
	eventMng.init();

	setInterval(function() {
		ctx.clear(0, 0, 800, 600);
		eventMng.dispatch();
		stage.renderAll(ctx);
	},30);

});