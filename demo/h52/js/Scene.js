this.Scene = this.Scene || {};
(function() {
	var init = function(opt) {
		this.star(opt);
	};
	var p = init.prototype;
	var globalOption = {}; //全局配置参数
	var stage = null; //舞台对象
	var loader = null; //加载图片资源对象
	var instance_water = null;//水波纹对象
	var fixH = 960; //固定高
	var minW = 567; //最小宽
	var maxW = 760; //最大宽
	var hwS = fixH / maxW; //比例
	var canvasScale = 1; //缩放数
	var screenW = window.innerWidth; //实际屏幕宽
	var screenH = window.height; //实际屏幕高
	var w = screenH / hwS; //缩放比例
	var an_img = document.createElement("img"); //是问题的图片元素
	var arr = [];
	//显示对象资源集合，方便调用
	var mcMap = {};
	//图片资源集合，方便调用
	var resourcesMap = {};
	//图片资源地址
	var resourcesUrl = [{
		"id":"fx",
		"src":"img/scene/fx.png"
	}];
	var resultObj = {
		"A1": {
			"res": [{
				"key": "A1_1",
				"type": "Bitmap",
				"x": 50,
				"y": 130,
				"imageKey": "A1_1"
			}, {
				"key": "A1_2",
				"type": "Bitmap",
				"x": 190,
				"y": 726,
				"imageKey": "A1_2"
			}, {
				"key": "A1_3",
				"type": "Bitmap",
				"x": 503,
				"y": 330,
				"regX": 31,
				"regY": 22,
				"imageKey": "A1_3"
			}],
			"img": [{
				"id": "A1_1",
				"src": "img/scene/A1_1.png"
			}, {
				"id": "A1_2",
				"src": "img/scene/A1_2.png"
			}, {
				"id": "A1_3",
				"src": "img/scene/A1_3.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["A1_3"], {
					loop: true
				}).to({
					rotation: -7
				}, 500, createjs.Ease.linear).to({
					rotation: 7
				}, 500, createjs.Ease.linear).to({
					rotation: 0
				}, 1000);
				action.push(mcMap["A1_3"]);
				createjs.Tween.get(mcMap["A1_2"], {
					loop: true
				}).to({
					x: 250
				}, 1000, createjs.Ease.linear).to({
					x: 190
				}, 1000, createjs.Ease.linear);
				action.push(mcMap["A1_2"]);
				return action;
			}
		},
		"B1": {
			"res": [{
				"key": "B1_1",
				"type": "Bitmap",
				"x": 80,
				"y": 132,
				"imageKey": "B1_1"
			}, {
				"key": "B1_3",
				"type": "Bitmap",
				"x": 130,
				"y": 666,
				"imageKey": "B1_3"
			}],
			"img": [{
				"id": "B1_1",
				"src": "img/scene/B1_1.png"
			}, {
				"id": "B1_2",
				"src": "img/scene/B1_2.png"
			}, {
				"id": "B1_3",
				"src": "img/scene/B1_3.png"
			}],
			"action": function() {
				var action = [];
				var data = {
					images: [resourcesMap["B1_2"].src],
					frames: [
						[0, 0, 146, 88],
						[146, 0, 190, 82]
					],
					animations: {
						run: {
							frames: [0, 1],
							speed: 0.3
						}
					}
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var instance = new createjs.Sprite(spriteSheet, "run");
				instance.x = 296;
				instance.y = 190;
				mcMap["sce_1"].addChild(instance);
				createjs.Tween.get(mcMap["B1_3"], {
					loop: true
				}).to({
					x: 300
				}, 1000, createjs.Ease.linear).to({
					x: 130
				}, 1000, createjs.Ease.linear);
				action.push(mcMap["B1_3"]);
				return action;
			}
		},
		"C1": {
			"res": [{
				"key": "C1_1",
				"type": "Bitmap",
				"x": 130,
				"y": 232,
				"imageKey": "C1_1"
			}, {
				"key": "C1_3",
				"type": "Bitmap",
				"x": 133,
				"y": 750,
				"imageKey": "C1_3"
			}],
			"img": [{
				"id": "C1_1",
				"src": "img/scene/C1_1.png"
			}, {
				"id": "C1_2",
				"src": "img/scene/C1_2.png"
			}, {
				"id": "C1_3",
				"src": "img/scene/C1_3.png"
			}],
			"action": function() {
				var action = [];
				var data = {
					images: [resourcesMap["C1_2"].src],
					frames: [
						[0, 0, 74, 146],
						[74, 0, 122, 146]
					],
					animations: {
						run: {
							frames: [0, 1],
							speed: 0.3
						}
					}
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var instance = new createjs.Sprite(spriteSheet, "run");
				instance.x = 350;
				instance.y = 220;
				mcMap["sce_1"].addChild(instance);

				createjs.Tween.get(mcMap["C1_3"], {
					loop: true
				}).to({
					x: 300
				}, 1000, createjs.Ease.linear).to({
					x: 130
				}, 1000, createjs.Ease.linear);
				action.push(mcMap["C1_3"]);
				return action;
			}
		},
		"A2": {
			"res": [{
				"key": "A2_1",
				"type": "Bitmap",
				"x": 100,
				"y": 332,
				"imageKey": "A2_1"
			}, {
				"key": "A2_2",
				"type": "Bitmap",
				"x": 390,
				"y": 326,
				"imageKey": "A2_2"
			}, {
				"key": "A2_3",
				"type": "Bitmap",
				"x": 330,
				"y": 100,
				"imageKey": "A2_3"
			}],
			"img": [{
				"id": "A2_1",
				"src": "img/scene/A2_1.png"
			}, {
				"id": "A2_2",
				"src": "img/scene/A2_2.png"
			}, {
				"id": "A2_3",
				"src": "img/scene/A2_3.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["A2_2"], {
					loop: true
				}).to({
					x: 430
				}, 500, createjs.Ease.linear).to({
					x: 460
				}, 500, createjs.Ease.linear).to({
					x: 390
				}, 1000);
				action.push(mcMap["A2_2"]);
				createjs.Tween.get(mcMap["A2_3"], {
					loop: true
				}).to({
					x: 300,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 250,
					y: 100
				}, 1500, createjs.Ease.linear).to({
					x: 200,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 150,
					y: 100
				}, 1500, createjs.Ease.linear);
				action.push(mcMap["A2_3"]);
				return action;
			}
		},
		"B2": {
			"res": [{
				"key": "B2_1",
				"type": "Bitmap",
				"x": 100,
				"y": 332,
				"imageKey": "B2_1"
			}, {
				"key": "B2_2",
				"type": "Bitmap",
				"x": 310,
				"y": 100,
				"imageKey": "B2_2"
			}, {
				"key": "B2_3",
				"type": "Bitmap",
				"x": 171,
				"y": 350,
				"imageKey": "B2_3"
			}],
			"img": [{
				"id": "B2_1",
				"src": "img/scene/B2_1.png"
			}, {
				"id": "B2_2",
				"src": "img/scene/B2_2.png"
			}, {
				"id": "B2_3",
				"src": "img/scene/B2_3.png"
			}, {
				"id": "B2_4",
				"src": "img/scene/B2_4.png"
			}],
			"action": function() {
				var action = [];
				var data = {
					images: [resourcesMap["B2_4"].src],
					frames: [
						[0, -60, 0, 0],
						[0, 0, 37, 28],
						[0, 104, 80, 70],
						[0, 207, 59, 102]
					],
					animations: {
						run: {
							frames: [0, 1, 2, 3],
							speed: 0.2
						}
					}
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var instance = new createjs.Sprite(spriteSheet, "run");
				instance.x = 300;
				instance.y = 510;
				mcMap["sce_2"].addChild(instance);
				createjs.Tween.get(mcMap["B2_3"], {
					loop: true
				}).to({
					visible: false
				}, 0, createjs.Ease.linear).to({
					visible: true
				}, 500, createjs.Ease.linear).to({
					visible: false
				}, 500, createjs.Ease.linear);
				action.push(mcMap["B2_3"]);
				createjs.Tween.get(mcMap["B2_2"], {
					loop: true
				}).to({
					x: 300,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 250,
					y: 100
				}, 1500, createjs.Ease.linear).to({
					x: 200,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 150,
					y: 100
				}, 1500, createjs.Ease.linear);
				action.push(mcMap["B2_2"]);
				return action;
			}
		},
		"C2": {
			"res": [{
				"key": "C2_1",
				"type": "Bitmap",
				"x": 62,
				"y": 200,
				"imageKey": "C2_1"
			}, {
				"key": "C2_2",
				"type": "Bitmap",
				"x": 330,
				"y": 100,
				"imageKey": "C2_2"
			}, {
				"key": "C2_3",
				"type": "Bitmap",
				"x": 130,
				"y": 434,
				"imageKey": "C2_3"
			}],
			"img": [{
				"id": "C2_1",
				"src": "img/scene/C2_1.png"
			}, {
				"id": "C2_2",
				"src": "img/scene/C2_2.png"
			}, {
				"id": "C2_3",
				"src": "img/scene/C2_3.png"
			}, {
				"id": "C2_4",
				"src": "img/scene/C2_4.png"
			}],
			"action": function() {
				var action = [];
				var data = {
					images: [resourcesMap["C2_4"].src],
					frames: [
						[0, -60, 0, 0],
						[0, 0, 37, 28],
						[0, 104, 80, 70],
						[0, 207, 59, 102]
					],
					animations: {
						run: {
							frames: [0, 1, 2, 3],
							speed: 0.2
						}
					}
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var instance = new createjs.Sprite(spriteSheet, "run");
				instance.x = 260;
				instance.y = 590;
				mcMap["sce_2"].addChild(instance);
				createjs.Tween.get(mcMap["C2_3"], {
					loop: true
				}).to({
					visible: false
				}, 0, createjs.Ease.linear).to({
					visible: true
				}, 500, createjs.Ease.linear).to({
					visible: false
				}, 500, createjs.Ease.linear);
				action.push(mcMap["C2_3"]);
				createjs.Tween.get(mcMap["C2_2"], {
					loop: true
				}).to({
					x: 300,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 250,
					y: 100
				}, 1500, createjs.Ease.linear).to({
					x: 200,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 150,
					y: 100
				}, 1500, createjs.Ease.linear);
				action.push(mcMap["C2_2"]);
				return action;
			}
		},
		"A3": {
			"res": [{
				"key": "A3_1",
				"type": "Bitmap",
				"x": 90,
				"y": 332,
				"imageKey": "A3_1"
			}, {
				"key": "A3_2",
				"type": "Bitmap",
				"x": 270,
				"y": 200,
				"imageKey": "A3_2"
			}],
			"img": [{
				"id": "A3_1",
				"src": "img/scene/A3_1.png"
			}, {
				"id": "A3_2",
				"src": "img/scene/A3_2.png"
			}, {
				"id": "A3_3",
				"src": "img/scene/A3_3.png"
			}],
			"action": function() {
				var action = [];
				var data = {
					images: [resourcesMap["A3_3"].src],
					frames: [
						[0, 0, 117, 52],
						[115, 0, 118, 52]
					],
					animations: {
						run: {
							frames: [0, 1],
							speed: 0.2
						}
					}
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var instance = new createjs.Sprite(spriteSheet, "run");
				instance.x = 420;
				instance.y = 480;
				mcMap["sce_3"].addChild(instance);
				return action;
			}
		},
		"B3": {
			"res": [{
				"key": "B3_1",
				"type": "Bitmap",
				"x": 100,
				"y": 332,
				"imageKey": "B3_1"
			}, {
				"key": "B3_2",
				"type": "Bitmap",
				"x": 130,
				"y": 700,
				"imageKey": "B3_2"
			}, {
				"key": "B3_3",
				"type": "Bitmap",
				"x": 160,
				"y": 180,
				"imageKey": "B3_3"
			}, {
				"key": "B3_4",
				"type": "Bitmap",
				"x": 280,
				"y": 240,
				"imageKey": "B3_4"
			}, {
				"key": "B3_5",
				"type": "Bitmap",
				"x": 130,
				"y": 300,
				"imageKey": "B3_5"
			}, {
				"key": "B3_6",
				"type": "Bitmap",
				"x": 460,
				"y": 320,
				"imageKey": "B3_6"
			}],
			"img": [{
				"id": "B3_1",
				"src": "img/scene/B3_1.png"
			}, {
				"id": "B3_2",
				"src": "img/scene/B3_2.png"
			}, {
				"id": "B3_3",
				"src": "img/scene/B3_3.png"
			}, {
				"id": "B3_4",
				"src": "img/scene/B3_4.png"
			}, {
				"id": "B3_5",
				"src": "img/scene/B3_5.png"
			}, {
				"id": "B3_6",
				"src": "img/scene/B3_6.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["B3_2"], {
					loop: true
				}).to({
					x: 300
				}, 1000, createjs.Ease.linear).to({
					x: 130
				}, 1000, createjs.Ease.linear);
				action.push(mcMap["B3_2"]);
				createjs.Tween.get(mcMap["B3_5"], {
					loop: true
				}).to({
					x: 131,
					y: 299
				}, 100, createjs.Ease.linear).to({
					x: 130,
					y: 300
				}, 100, createjs.Ease.linear);
				action.push(mcMap["B3_5"]);
			}
		},
		"C3": {
			"res": [{
				"key": "C3_1",
				"type": "Bitmap",
				"x": 80,
				"y": 332,
				"imageKey": "C3_1"
			}, {
				"key": "C3_2",
				"type": "Bitmap",
				"x": 230,
				"y": 200,
				"imageKey": "C3_2"
			}],
			"img": [{
				"id": "C3_1",
				"src": "img/scene/C3_1.png"
			}, {
				"id": "C3_2",
				"src": "img/scene/C3_2.png"
			}, {
				"id": "C3_3",
				"src": "img/scene/C3_3.png"
			}],
			"action": function() {
				var action = [];
				var data = {
					images: [resourcesMap["C3_3"].src],
					frames: [
						[0, 0, 117, 52],
						[115, 0, 118, 52]
					],
					animations: {
						run: {
							frames: [0, 1],
							speed: 0.2
						}
					}
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var instance = new createjs.Sprite(spriteSheet, "run");
				instance.x = 345;
				instance.y = 480;
				mcMap["sce_3"].addChild(instance);
				return action;
			}
		},
		"A4": {
			"res": [{
				"key": "A4_1",
				"type": "Bitmap",
				"x": 70,
				"y": 332,
				"imageKey": "A4_1"
			}, {
				"key": "A4_2",
				"type": "Bitmap",
				"x": 270,
				"y": 200,
				"imageKey": "A4_2"
			}],
			"img": [{
				"id": "A4_1",
				"src": "img/scene/A4_1.png"
			}, {
				"id": "A4_2",
				"src": "img/scene/A4_2.png"
			}],
			"action": function() {
				var action = [];
				return action;
			}
		},
		"B4": {
			"res": [{
				"key": "B4_1",
				"type": "Bitmap",
				"x": 300,
				"y": 232,
				"imageKey": "B4_1"
			}, {
				"key": "B4_2",
				"type": "Bitmap",
				"x": 130,
				"y": 280,
				"imageKey": "B4_2"
			}, {
				"key": "B4_3",
				"type": "Bitmap",
				"x": 220,
				"y": 415,
				"imageKey": "B4_3"
			}, {
				"key": "B4_4",
				"type": "Bitmap",
				"x": 130,
				"y": 500,
				"imageKey": "B4_4"
			}],
			"img": [{
				"id": "B4_1",
				"src": "img/scene/B4_1.png"
			}, {
				"id": "B4_2",
				"src": "img/scene/B4_2.png"
			}, {
				"id": "B4_3",
				"src": "img/scene/B4_3.png"
			}, {
				"id": "B4_4",
				"src": "img/scene/B4_4.jpg"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["B4_3"], {
					loop: true
				}).to({
					alpha: 0
				}, 800, createjs.Ease.linear).to({
					alpha: 1
				}, 300, createjs.Ease.linear);
				action.push(mcMap["B4_3"]);
				return action;
			}
		},
		"C4": {
			"res": [{
				"key": "C4_1",
				"type": "Bitmap",
				"x": 300,
				"y": 232,
				"imageKey": "C4_1"
			}, {
				"key": "C4_2",
				"type": "Bitmap",
				"x": 130,
				"y": 280,
				"imageKey": "C4_2"
			}, {
				"key": "C4_3",
				"type": "Bitmap",
				"x": 220,
				"y": 415,
				"imageKey": "C4_3"
			}, {
				"key": "C4_4",
				"type": "Bitmap",
				"x": 130,
				"y": 500,
				"imageKey": "C4_4"
			}],
			"img": [{
				"id": "C4_1",
				"src": "img/scene/C4_1.png"
			}, {
				"id": "C4_2",
				"src": "img/scene/C4_2.png"
			}, {
				"id": "C4_3",
				"src": "img/scene/C4_3.png"
			}, {
				"id": "C4_4",
				"src": "img/scene/C4_4.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["C4_3"], {
					loop: true
				}).to({
					alpha: 0
				}, 800, createjs.Ease.linear).to({
					alpha: 1
				}, 300, createjs.Ease.linear);
				action.push(mcMap["C4_3"]);
				return action;
			}
		},
		"A5": {
			"res": [{
				"key": "A5_1",
				"type": "Bitmap",
				"x": 100,
				"y": 332,
				"imageKey": "A5_1"
			}, {
				"key": "A5_2",
				"type": "Bitmap",
				"x": 350,
				"y": 150,
				"imageKey": "A5_2"
			}, {
				"key": "A5_3",
				"type": "Bitmap",
				"x": 290,
				"y": 285,
				"imageKey": "A5_3"
			}],
			"img": [{
				"id": "A5_1",
				"src": "img/scene/A5_1.png"
			}, {
				"id": "A5_2",
				"src": "img/scene/A5_2.png"
			}, {
				"id": "A5_3",
				"src": "img/scene/A5_3.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["A5_3"], {
					loop: true
				}).to({
					x: 289,
					y: 284
				}, 100, createjs.Ease.linear).to({
					x: 290,
					y: 285
				}, 100, createjs.Ease.linear);
				action.push(mcMap["A5_3"]);
				createjs.Tween.get(mcMap["A5_2"], {
					loop: true
				}).to({
					x: 150
				}, 1000, createjs.Ease.linear).to({
					x: 350
				}, 1000, createjs.Ease.linear);
				action.push(mcMap["A5_2"]);
				return action;
			}
		},
		"B5": {
			"res": [{
				"key": "B5_2",
				"type": "Bitmap",
				"x": 350,
				"y": 130,
				"imageKey": "B5_2"
			}],
			"img": [{
				"id": "B5_1",
				"src": "img/scene/B5_1.png"
			}, {
				"id": "B5_2",
				"src": "img/scene/B5_2.png"
			}],
			"action": function() {
				var action = [];
				var data = {
					images: [resourcesMap["B5_1"].src],
					frames: [
						[0, 0, 601, 509],
						[601, 0, 601, 509]
					],
					animations: {
						run: {
							frames: [0, 1],
							speed: 0.2
						}
					}
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var instance = new createjs.Sprite(spriteSheet, "run");
				instance.x = 100;
				instance.y = 300;
				mcMap["sce_5"].addChild(instance);
				createjs.Tween.get(mcMap["B5_2"], {
					loop: true
				}).to({
					x: 150
				}, 1000, createjs.Ease.linear).to({
					x: 350
				}, 1000, createjs.Ease.linear);
				action.push(mcMap["B5_2"]);
				return action;
			}
		},
		"C5": {
			"res": [{
				"key": "C5_1",
				"type": "Bitmap",
				"x": 50,
				"y": 300,
				"imageKey": "C5_1"
			}, {
				"key": "C5_2",
				"type": "Bitmap",
				"x": 350,
				"y": 100,
				"imageKey": "C5_2"
			}, {
				"key": "C5_3",
				"type": "Bitmap",
				"x": 515,
				"y": 450,
				"regX": 35,
				"regY": 35,
				"rotation": 10,
				"imageKey": "C5_3"
			}],
			"img": [{
				"id": "C5_1",
				"src": "img/scene/C5_1.png"
			}, {
				"id": "C5_2",
				"src": "img/scene/C5_2.png"
			}, {
				"id": "C5_3",
				"src": "img/scene/C5_3.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["C5_2"], {
					loop: true
				}).to({
					x: 300,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 250,
					y: 100
				}, 1500, createjs.Ease.linear).to({
					x: 200,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 150,
					y: 100
				}, 1500, createjs.Ease.linear);
				action.push(mcMap["C5_2"]);
				createjs.Tween.get(mcMap["C5_3"], {
					loop: true
				}).to({
					rotation: 20
				}, 500, createjs.Ease.linear).to({
					rotation: 5
				}, 500, createjs.Ease.linear).to({
					rotation: 10
				}, 300);
				action.push(mcMap["C5_3"]);
				return action;
			}
		},
		"A6": {
			"res": [{
				"key": "A6_1",
				"type": "Bitmap",
				"x": 130,
				"y": 332,
				"imageKey": "A6_1"
			}, {
				"key": "A6_2",
				"type": "Bitmap",
				"x": 350,
				"y": 150,
				"imageKey": "A6_2"
			}],
			"img": [{
				"id": "A6_1",
				"src": "img/scene/A6_1.png"
			}, {
				"id": "A6_2",
				"src": "img/scene/A6_2.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["A6_2"], {
					loop: true
				}).to({
					x: 150
				}, 1000, createjs.Ease.linear).to({
					x: 350
				}, 1000, createjs.Ease.linear);
				action.push(mcMap["A6_2"]);
				return action;
			}
		},
		"B6": {
			"res": [{
				"key": "B6_1",
				"type": "Bitmap",
				"x": 130,
				"y": 240,
				"imageKey": "B6_1"
			}, {
				"key": "B6_2",
				"type": "Bitmap",
				"x": 330,
				"y": 100,
				"imageKey": "B6_2"
			}, {
				"key": "B6_3",
				"type": "Bitmap",
				"x": 120,
				"y": 130,
				"imageKey": "B6_3"
			}, {
				"key": "B6_4",
				"type": "Bitmap",
				"x": 150,
				"y": 130,
				"imageKey": "B6_4"
			}],
			"img": [{
				"id": "B6_1",
				"src": "img/scene/B6_1.png"
			}, {
				"id": "B6_2",
				"src": "img/scene/B6_2.png"
			}, {
				"id": "B6_3",
				"src": "img/scene/B6_3.png"
			}, {
				"id": "B6_4",
				"src": "img/scene/B6_4.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["B6_2"], {
					loop: true
				}).to({
					x: 300,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 250,
					y: 100
				}, 1500, createjs.Ease.linear).to({
					x: 200,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 150,
					y: 100
				}, 1500, createjs.Ease.linear);
				action.push(mcMap["B6_2"]);
				return action;
			}
		},
		"C6": {
			"res": [{
				"key": "C6_1",
				"type": "Bitmap",
				"x": 10,
				"y": 400,
				"imageKey": "C6_1"
			}, {
				"key": "C6_2",
				"type": "Bitmap",
				"x": 350,
				"y": 565,
				"regX": 0,
				"regY": 249,
				"imageKey": "C6_2"
			}, {
				"key": "C6_3",
				"type": "Bitmap",
				"x": 330,
				"y": 100,
				"imageKey": "C6_3"
			}],
			"img": [{
				"id": "C6_1",
				"src": "img/scene/C6_1.png"
			}, {
				"id": "C6_2",
				"src": "img/scene/C6_2.png"
			}, {
				"id": "C6_3",
				"src": "img/scene/C6_3.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["C6_2"], {
					loop: true
				}).to({
					y: 550,
					rotation: 90
				}, 1000, createjs.Ease.linear).to({
					rotation: 90
				}, 1000, createjs.Ease.linear).to({
					y: 565,
					rotation: 0
				}, 1000, createjs.Ease.linear).to({
					y: 565,
					rotation: 0
				}, 1000, createjs.Ease.linear);
				action.push(mcMap["C6_2"]);
				createjs.Tween.get(mcMap["C6_3"], {
					loop: true
				}).to({
					x: 300,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 250,
					y: 100
				}, 1500, createjs.Ease.linear).to({
					x: 200,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 150,
					y: 100
				}, 1500, createjs.Ease.linear);
				action.push(mcMap["C6_3"]);
				return action;
			}
		},
		"A7": {
			"res": [{
				"key": "A7_1",
				"type": "Bitmap",
				"x": 100,
				"y": 332,
				"imageKey": "A7_1"
			}, {
				"key": "A7_2",
				"type": "Bitmap",
				"x": 330,
				"y": 100,
				"imageKey": "A7_2"
			}],
			"img": [{
				"id": "A7_1",
				"src": "img/scene/A7_1.png"
			}, {
				"id": "A7_2",
				"src": "img/scene/A7_2.png"
			}, {
				"id": "A7_3",
				"src": "img/scene/A7_3.png"
			}],
			"action": function() {
				var action = [];
				var data = {
					images: [resourcesMap["A7_3"].src],
					frames: [
						[0, 0, 152, 48],
						[152, 0, 96, 48, 0, -62, 0]
					],
					animations: {
						run: {
							frames: [0, 1],
							speed: 0.2
						}
					}
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var instance = new createjs.Sprite(spriteSheet, "run");
				instance.x = 325;
				instance.y = 520;
				mcMap["sce_7"].addChild(instance);
				createjs.Tween.get(mcMap["A7_2"], {
					loop: true
				}).to({
					x: 300,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 250,
					y: 100
				}, 1500, createjs.Ease.linear).to({
					x: 200,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 150,
					y: 100
				}, 1500, createjs.Ease.linear);
				action.push(mcMap["A7_2"]);
				return action;
			}
		},
		"B7": {
			"res": [{
				"key": "B7_1",
				"type": "Bitmap",
				"x": 100,
				"y": 440,
				"imageKey": "B7_1"
			}, {
				"key": "B7_2",
				"type": "Bitmap",
				"x": 350,
				"y": 700,
				"imageKey": "B7_2"
			}, {
				"key": "B7_3",
				"type": "Bitmap",
				"x": 120,
				"y": 130,
				"imageKey": "B7_3"
			}],
			"img": [{
				"id": "B7_1",
				"src": "img/scene/B7_1.png"
			}, {
				"id": "B7_2",
				"src": "img/scene/B7_2.png"
			}, {
				"id": "B7_3",
				"src": "img/scene/B7_3.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["B7_2"], {
					loop: true
				}).to({
					x: 150
				}, 1000, createjs.Ease.linear).to({
					x: 350
				}, 1000, createjs.Ease.linear);
				action.push(mcMap["B7_2"]);
				createjs.Tween.get(mcMap["B7_3"], {
					loop: true
				}).to({
					x: 125,
					y: 135
				}, 1500, createjs.Ease.linear).to({
					x: 150,
					y: 120
				}, 1500, createjs.Ease.linear).to({
					x: 200,
					y: 100
				}, 1500, createjs.Ease.linear).to({
					x: 250,
					y: 110
				}, 1500, createjs.Ease.linear);
				action.push(mcMap["B7_3"]);
				return action;
			}
		},
		"C7": {
			"res": [{
				"key": "C7_1",
				"type": "Bitmap",
				"x": 130,
				"y": 300,
				"imageKey": "C7_1"
			}, {
				"key": "C7_2",
				"type": "Bitmap",
				"x": 330,
				"y": 100,
				"imageKey": "C7_2"
			}],
			"img": [{
				"id": "C7_1",
				"src": "img/scene/C7_1.png"
			}, {
				"id": "C7_2",
				"src": "img/scene/C7_2.png"
			}],
			"action": function() {
				var action = [];
				createjs.Tween.get(mcMap["C7_2"], {
					loop: true
				}).to({
					x: 300,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 250,
					y: 100
				}, 1500, createjs.Ease.linear).to({
					x: 200,
					y: 110
				}, 1500, createjs.Ease.linear).to({
					x: 150,
					y: 100
				}, 1500, createjs.Ease.linear);
				action.push(mcMap["C7_2"]);
				return action;
			}
		}
	};
	//显示对象列表
	var displayObjectList = [{
		"key": "scene_box",
		"type": "Container",
		"x":0,
		"y": 0,
		"sub":[{
			"key": "sce_1",
			"type": "Container",
			"sub": [],
			"x":100,
			"y":70,
			"scaleX":0.8,
			"scaleY":0.8
		}, {
			"key": "sce_2",
			"type": "Container",
			"sub": [],
			"x":50,
			"y":70,
			"scaleX":0.8,
			"scaleY":0.8
		}, {
			"key": "sce_3",
			"type": "Container",
			"sub": [],
			"x":75,
			"y":70,
			"scaleX":0.8,
			"scaleY":0.8
		}, {
			"key": "sce_4",
			"type": "Container",
			"sub": [],
			"x":50,
			"y":70,
			"scaleX":0.8,
			"scaleY":0.8
		}, {
			"key": "sce_5",
			"type": "Container",
			"sub": [],
			"x":60,
			"y":70,
			"scaleX":0.8,
			"scaleY":0.8
		}, {
			"key": "sce_6",
			"type": "Container",
			"sub": []
		}, {
			"key": "sce_7",
			"type": "Container",
			"sub": [],
			"x":70,
			"y":70,
			"scaleX":0.8,
			"scaleY":0.8
		}]
	}];
	//第几道问题
	var an_num = 0;
	//问题答案
	var arr = [];
	p.star = function(opt) {
			globalOption.arr = opt.arr;
			//初始化数据
			for(var i = 0; i < globalOption.arr.length; i++) {
				for(var j = 0; j < resultObj[globalOption.arr[i]]["img"].length; j++) {
					resourcesUrl.push(resultObj[globalOption.arr[i]]["img"][j]);
				}
				displayObjectList[0]["sub"][i]["sub"] = resultObj[globalOption.arr[i]]["res"];
				displayObjectList[0]["sub"][i].x = i * maxW + (displayObjectList[0]["sub"][i].x ? displayObjectList[0]["sub"][i].x : 0);
				displayObjectList[0]["sub"][i]["anFlag"] = true;
			}
			globalOption.container = opt.container;
			globalOption.canvas = opt.canvas;
			stage = new createjs.Stage(globalOption.canvas);
			this.initResize();
			createjs.Touch.enable(stage);
			createjs.Ticker.on("tick", stage);
			//进度条面板
			mcMap["loadingPanel"] = new createjs.Container();
			stage.addChild(mcMap["loadingPanel"]);
			mcMap["loadingPanel"].x = 0;
			mcMap["loadingPanel"].y = 512;
			stage.update();
			//进度条波浪线
			mcMap["line"] = new createjs.Bitmap("img/loading/line.png");
			mcMap["loadingPanel"].addChild(mcMap["line"]);
			mcMap["line"].x = 0;
			mcMap["line"].y = 20;
			stage.update();
			//进度条小船
			mcMap["loading"] = new createjs.Bitmap("img/loading/boat.png");
			mcMap["loading"].x = 0;
			mcMap["loading"].y = -75;
			mcMap["loading"].tox = (maxW - 124) - Math.max((w - screenW) / 2, 0) / canvasScale - 168;
			mcMap["loadingPanel"].addChild(mcMap["loading"]);
			//进度条数字
			mcMap["loadingTxt"] = new createjs.Text("0%", "38px Arial", "#000");
			mcMap["loadingPanel"].addChild(mcMap["loadingTxt"]);
			mcMap["loadingTxt"].x = maxW / 2;
			mcMap["loadingTxt"].y = 120;
			mcMap["loadingTxt"].textAlign = "center";
			stage.update();
			this.initLoader();
			//水纹背景动画
			var data = {
				images: ["img/line.jpg"],
				frames: [
					[0, 0, 760, 960],
					[760, 0, 760, 960],
					[1520, 0, 760, 960],
					[2280, 0, 760, 960]
					
				],
				animations: {
					run: {
						frames: [0,1,2,3],
						speed:0.5
					}
				}
			};
			var spriteSheet = new createjs.SpriteSheet(data);
			instance_water = new createjs.Sprite(spriteSheet, "run");
			instance_water.alpha = 0;
			stage.addChild(instance_water);
		}
		//加载进度条
	p.initLoader = function() {
		var cur = this;
		loader = new createjs.LoadQueue(false);
		loader.setMaxConnections(15);
		loader.on("fileload", function(e) {
			var id = e.item.id;
			var item = e.item;
			var type = e.item.type;
			//保存到图片资源信息，方便使用
			resourcesMap[id] = item;
		});
		loader.on("progress", function(e) {
			mcMap["loadingTxt"].text = Math.round(e.progress * 100) + "%";
			mcMap["loading"].x = e.progress.toFixed(2) * mcMap["loading"].tox;
			stage.update();
		});
		loader.on("complete", function() {
			//资源加载完成，开始创建显示列表对象
			cur.loadComplete();
		});
		loader.loadManifest(resourcesUrl);
		loader.load();
	};
	//自适应方法
	p.resize = function() {
			screenW = window.innerWidth; //实际页面宽
			screenH = window.innerHeight; //实际页面高
			w = screenH / hwS;
			canvasScale = screenH / fixH;
			if(mcMap["tree"]) {
				mcMap["tree"].x = (maxW - 168) - Math.max((w - screenW) / 2, 0) / canvasScale;
			}
			if(mcMap["loading"]) {
				mcMap["loading"].tox = mcMap["loading"].x = (maxW - 124) - Math.max((w - screenW) / 2, 0) / canvasScale - 168;
			}
			this.scaleCanvas(screenW, screenH);
		}
		//资源加载完成
	p.loadComplete = function() {
		var cur = this;
		//隐藏加载页
		createjs.Tween.get(mcMap["loadingPanel"], {
			loop: false
		}).wait(900).to({
			alpha: 0
		},1000, createjs.Ease.backOut).to({
			visible: false
		}).call(function() {
			$(".audio_flag").show();
			//globalOption.canvas.style.display = "none";
			//globalOption.container.style.display = "block";
			instance_water.alpha = 1;
			cur.createDisplayObject(stage, displayObjectList);
			var anAll = [];
				//整个动画
				createjs.Tween.get(mcMap["scene_box"], {
					loop:false
				}).wait(2000).to({
					x: -(globalOption.arr.length-1) * maxW
				},30000, createjs.Ease.linear).wait(2000).call(function(){
					$(".audio").attr("src","audio/3.mp3");
					$(".audio_flag").css("top","3%");
					var music = document.querySelector(".audio");
			         if (music.paused) { //判读是否播放
			            music.play(); //没有就播放
			         }else{
			         	music.pause();
			         }
			        $(".audio_flag").removeClass("audio_flags");
					$(".scen_8").css("transform","translate3d(0, 0, 0)");
					$(".scen_8").css("-webkit-transform","translate3d(0, 0, 0)");
					setTimeout(function(){
						for (var i = 0; i < anAll.length; i++) {
							for (var j = 0; j < anAll[i].length; j++) {
								createjs.Tween.removeTweens(anAll[i][j]);
							}
						}
						stage.removeAllChildren();
						globalOption.canvas.style.display = "none";
					},1000);
					
				},null, cur).on("change",function(){
					var index = Math.floor(Math.abs(mcMap["scene_box"].x/760));
					if(mcMap["scene_box"].getChildAt(index)["anFlag"]){
						mcMap["scene_box"].getChildAt(index)["anFlag"] = false;
						var ac = resultObj[globalOption.arr[index]]["action"]();
						if(resultObj[globalOption.arr[index+1]]){
							resultObj[globalOption.arr[index+1]]["action"]();
						}
						anAll.push(ac);
					};
				});
		}, null, cur);
	};
	//自适应事件
	p.initResize = function() {
		var cur = this;
		window.addEventListener("resize", function() {
			cur.resize();
		}, false);
		this.resize();
	};
	//自适应方法
	p.scaleCanvas = function(screenW, screenH) {
		var h = screenH;
		var w = screenH / hwS;
		var left = (screenW - w) / 2;
		globalOption.canvas.style.width = w + "px";
		globalOption.canvas.style.height = h + "px";
		globalOption.canvas.style.left = left + "px";
	};
	//批量创建显示对象
	p.createDisplayObject = function(container, ary) {
		for(var i in ary) {
			var obj = ary[i];
			var key = obj["key"];
			var type = obj["type"];
			var mc = null;
			if(type == "Bitmap") {
				mc = new createjs[type](resourcesMap[obj["imageKey"]].src);
			} else {
				mc = new createjs[type]();
			}
			if(obj["addToList"] == undefined || obj["addToList"] == true) {
				container.addChild(mc);
			}
			for(var k in obj) {
				if(!(k == "key" || k == "type" || k == "imageKey" || k == "sub" || k == "addToList")) {
					mc[k] = obj[k];
				}
			}
			var sub = obj["sub"];
			if(sub) {
				this.createDisplayObject(mc, sub);
			}
			mcMap[key] = mc;
		}
	};
	Scene.init = init;
})();