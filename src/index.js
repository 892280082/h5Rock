define(function(require) {
	var Stage = require('display/Stage');
	var DisplayObject = require('display/DisplayObject');
	var CanvasContext = require('context/CanvasContext');
	var EventMng = require('game/EventMng');
	var Drawable = require('display/Drawable');
	var utils = require('util/Utils');

	var canvas = document.getElementById('game');
	var ctx = new CanvasContext({canvas: canvas});

	var gameManger = 'begin';




	//创建英雄机队列 并添加了背景精灵在里面
	var stage = new Stage();
	//创建子弹队列
	var bulletStage = new Stage();
	//创建敌机队列
	var airplaneStage = new Stage();

	var eventMng = new EventMng(canvas, stage);
	eventMng.init();

	var TimeCount = 0;
	//生成背景
	var npc1 = new DisplayObject({ name:'background',width:400,height:500 });
	//生成敌机
	var npc2 = new DisplayObject({ x: 200,name:'airplane' });
	//生成英雄机
	var npc3 = new DisplayObject({ x:200,y:300,name:'hero0',width:97,height:124 });
	//创建子弹
	var bullet = new DisplayObject({ name:'bullet'});
	//创建暂停
	var pause = new DisplayObject({name:'pause',x:110,y:200});
	//创建开始图片
	var start = new DisplayObject({name:'begin'});
	//创建蜜蜂图片 并添加默认方法
	var bee = new DisplayObject({name:'bee'});
	//创建结束图片
	var gameOver = new DisplayObject({name:'gameOver',x:45,y:200});
	bee.defaultFunction = function(){
		if(this.x < 400 && this.defaultCount %2 ==0){
			this.x+=3;
			if(this.x >= 400){
				this.defaultCount++;
			}
		}
		if(this.defaultCount %2 ==1){
			this.x-=3;
			if(this.x <0){
				this.defaultCount++;
			}
		}
	}
	//添加背景图片
	npc1.setDrawable(document.getElementById('background'));
	//添加敌机图片
	npc2.setDrawable(document.getElementById('airplane'));
	//添加英雄机对象 并设置自身动态替换的图片
	npc3.setDrawable(document.getElementById('hero0'));
	var heroOne = document.getElementById('hero0');
	var heroTwo = document.getElementById('hero1');
	npc3.totalPic.push(heroOne);
	npc3.totalPic.push(heroTwo);
	//英雄机添加生命值
	npc3.life =3;
	npc3.socre = 0;
	//添加子弹图片
	bullet.setDrawable(document.getElementById('bullet'));
	//添加暂时图片
	pause.setDrawable(document.getElementById('pause'));
	//添加开始图片
	start.setDrawable(document.getElementById('start'));
	//添加蜜蜂图片
	bee.setDrawable(document.getElementById('bee'));
	//添加结束图片
	gameOver.setDrawable(document.getElementById('gameOver'));
	//把精灵放进数组对象
	stage.addChild(npc1);
	stage.addChild(npc3);
    
	npc1.on('mousemove',function(e){

	});

	npc1.on('mouseNow',function(e){
		npc3.x = e.mouse.x - npc3.width/2;
		npc3.y = e.mouse.y - npc3.height/2;
	});

	npc3.on('click',function(e){
		if(gameManger == 'start'){
			gameManger = 'stop';
		}else{
			gameManger = 'start';
		}
	});

	npc3.onHitEvent = function(){
		this.life--;
		if(this.life == 0){
			gameManger ='gameOver';
		}
	}

	npc3.scoreEvent = function(){
		this.socre +=50;
	}

	setInterval(function() {
		if(gameManger == 'start'){
			ctx.clear(0, 0, 800, 600);
			TimeCount++;
			//生成子弹 并加入子弹队列
			if(TimeCount % 20 == 0){
				var NewBee = utils.copyObject(bullet);
				NewBee.x = npc3.x + 46;
				NewBee.y = npc3.y - 7;
				bulletStage.addChild(NewBee);
			}
			//生成敌机 并加入敌机队列
			if(TimeCount % 50 == 0){
				var NewAirplane = utils.copyObject(npc2);
				NewAirplane.x = utils.random(0,400) - npc2.width;
				NewAirplane.y =0;
				airplaneStage.addChild(NewAirplane);
				var NewBee = utils.copyObject(bee);
				NewBee.x = utils.random(0,400);
				NewBee.defaultCount = utils.random(1,10)%2;
				airplaneStage.addChild(NewBee);
			}
			//画英雄机和背景
			stage.children.forEach(function(npc) {
				if(npc.name == 'airplane'){
					npc.y++;
				}
				if(npc.name == 'hero0'){
					npc.changeSelfPic(TimeCount);
				}
				if(npc.name == 'bullet'){
					npc.y--;
				}
				npc._update();
				npc._render(ctx);
			});
			//画子弹 
			bulletStage.children.forEach(function(bullet){
				bullet.y--;
				bullet._update();
				bullet._render(ctx);
			});
			//画敌机
			airplaneStage.children.forEach(function(air){
				if(air.name == 'bee'){
					air.defaultFunction();
				}
				air.y++;
				air._update++;
				air._render(ctx);
			});
			//循环敌机 检测碰撞
			utils.TestArrayDisplay(bulletStage.children,airplaneStage.children,true,npc3);
			utils.TestArraytoObject(airplaneStage.children,npc3,true,gameManger);

			//清除无效资源 释放内存
			utils.clearArrayObject(airplaneStage.children);
			utils.clearArrayObject(bulletStage.children);

		}
		if(gameManger == 'stop'){
			pause._render(ctx);
		}
		if(gameManger == 'begin'){
			start._render(ctx);
		}
		if(gameManger == 'gameOver'){
			gameOver._render(ctx);
		}
		utils.PaintText(ctx,"分数:"+npc3.socre,30,30);
		utils.PaintText(ctx,"生命:"+npc3.life,30,50);

		eventMng.dispatch();
		if(TimeCount > 100000){
			TimeCount = 0;
		}
	}, 16);
});