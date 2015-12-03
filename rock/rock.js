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
	var fonts = require('object/font_c.js');
	var stick = require('object/stick_c.js');



	//将精灵加入精灵管理器中
	spriteManager.setSprite('hand',hand);
	spriteManager.setSprite('curtain',curtain);
	spriteManager.setSprite('fonts',fonts);
	spriteManager.setSprite('stick',stick);


	var curtain_left = curtain.getSprite('curtain_left');
	var curtain_right = curtain.getSprite('curtain_right');

	//创建舞台，并添加对象
	stage.addChild('curtain',curtain);
	stage.addChild('curtain_left',curtain_left);
	stage.addChild('curtain_right',curtain_right);
	stage.addChild('fonts',fonts);
	stage.addChild('stick',stick);


	//创建并初始化事物管理器
	var eventMng = new EventMng(canvas, stage);
	eventMng.init();

	setInterval(function() {
		ctx.clear(0, 0, 800, 600);
		eventMng.dispatch();
		stage.renderAll(ctx);
	},60);

});