this.Drift = this.Drift || {};
(function() {
	var init = function(opt) {
		this.star(opt);
	};
	var p = init.prototype;
	var globalOption = {}; //全局配置参数
	var stage = null; //舞台对象
	var loader = null; //加载图片资源对象
	var fixH = 960; //固定高
	var minW = 567; //最小宽
	var maxW = 760; //最大宽
	var hwS = fixH / maxW; //比例
	var canvasScale = 1; //缩放数
	var screenW = window.innerWidth; //实际屏幕宽
	var screenH = window.height; //实际屏幕高
	var w = screenH / hwS; //缩放比例
	var an_img = document.createElement("img"); //是问题的图片元素
	//显示对象资源集合，方便调用
	var mcMap = {};
	//图片资源集合，方便调用
	var resourcesMap = {};
	//图片资源地址
	var resourcesUrl = [
	{
		"id":"boat",
		"src":"img/loading/boat.png"
	},{
		"id":"loadline",
		"src":"img/loading/line.png"
	},{
		"id": "1",
		"src": "img/answer/1.png"
	}, {
		"id": "2",
		"src": "img/answer/2.png"
	}, {
		"id": "3",
		"src": "img/answer/3.png"
	}, {
		"id": "4",
		"src": "img/answer/4.png"
	}, {
		"id": "5",
		"src": "img/answer/5.png"
	}, {
		"id": "6",
		"src": "img/answer/6.png"
	}, {
		"id": "7",
		"src": "img/answer/7.png"
	}, {
		"id": "A1",
		"src": "img/answer/A1.png"
	}, {
		"id": "B1",
		"src": "img/answer/B1.png"
	}, {
		"id": "C1",
		"src": "img/answer/C1.png"
	}, {
		"id": "A2",
		"src": "img/answer/A2.png"
	}, {
		"id": "B2",
		"src": "img/answer/B2.png"
	}, {
		"id": "C2",
		"src": "img/answer/C2.png"
	}, {
		"id": "A3",
		"src": "img/answer/A3.png"
	}, {
		"id": "B3",
		"src": "img/answer/B3.png"
	},  {
		"id": "C3",
		"src": "img/answer/C3.png"
	}, {
		"id": "A4",
		"src": "img/answer/A4.png"
	}, {
		"id": "B4",
		"src": "img/answer/B4.png"
	},  {
		"id": "C4",
		"src": "img/answer/C4.png"
	}, {
		"id": "A5",
		"src": "img/answer/A5.png"
	}, {
		"id": "B5",
		"src": "img/answer/B5.png"
	},  {
		"id": "C5",
		"src": "img/answer/C5.png"
	}, {
		"id": "A6",
		"src": "img/answer/A6.png"
	}, {
		"id": "B6",
		"src": "img/answer/B6.png"
	}, {
		"id": "C6",
		"src": "img/answer/C6.png"
	}, {
		"id": "A7",
		"src": "img/answer/A7.png"
	}, {
		"id": "B7",
		"src": "img/answer/B7.png"
	}, {
		"id": "C7",
		"src": "img/answer/C7.png"
	}, {
		"id": "top",
		"src": "img/info/top.jpg"
	}, {
		"id": "info",
		"src": "img/info/info.jpg"
	}, {
		"id": "star",
		"src": "img/info/star.png"
	}, {
		"id": "person",
		"src": "img/answer/person.png"
	},{
		"id": "line",
		"src": "img/line.jpg"
	},{
		"id": "s1",
		"src": "img/answer/s1.png"
	},{
		"id": "s2",
		"src": "img/answer/s2.png"
	},{
		"id": "s3",
		"src": "img/answer/s3.png"
	},{
		"id": "s4",
		"src": "img/answer/s4.png"
	},{
		"id": "s5",
		"src": "img/answer/s5.png"
	},{
		"id": "s6",
		"src": "img/answer/s6.png"
	},{
		"id": "s7",
		"src": "img/answer/s7.png"
	}];
	//显示对象列表
	var displayObjectList = [{
		"key": "inset_img",
		"type": "Container",
		"x":130,
		"y":150,
		"alpha": 0,
		"sub": [{
			"key": "s1",
			"type": "Bitmap",
			"imageKey": "s1",
			"x":10,
			"y":0,
			"scaleX":1.2,
			"scaleY":1.2
		},{
			"key": "s2",
			"type": "Bitmap",
			"imageKey": "s2",
			"x":65,
			"y":0,
			"alpha": 0,
			"scaleX":0.9,
			"scaleY":0.9
		},{
			"key": "s3",
			"type": "Bitmap",
			"imageKey": "s3",
			"x":50,
			"y":0,
			"alpha": 0
		},{
			"key": "s4",
			"type": "Bitmap",
			"imageKey": "s4",
			"x":50,
			"y":0,
			"alpha": 0
		},{
			"key": "s5",
			"type": "Bitmap",
			"imageKey": "s5",
			"x":60,
			"y":0,
			"alpha": 0,
			"scaleX":0.9,
			"scaleY":0.9
		},{
			"key": "s6",
			"type": "Bitmap",
			"imageKey": "s6",
			"x":60,
			"y":0,
			"alpha": 0,
			"scaleX":0.9,
			"scaleY":0.9
		},{
			"key": "s7",
			"type": "Bitmap",
			"imageKey": "s7",
			"x":60,
			"y":0,
			"alpha": 0,
			"scaleX":0.9,
			"scaleY":0.9
		}
		]
	}, {
		"key": "an_img_box",
		"type": "Container",
		"x":130,
		"y":70,
		"alpha": 0,
		"sub": [{
			"key": "an_img1",
			"type": "Bitmap",
			"imageKey": "1",
			"x":0,
			"y":0
		}, {
			"key": "an_img2",
			"type": "Bitmap",
			"imageKey": "2",
			"alpha": 0
		}, {
			"key": "an_img3",
			"type": "Bitmap",
			"imageKey": "3",
			"alpha": 0
		}, {
			"key": "an_img4",
			"type": "Bitmap",
			"imageKey": "4",
			"alpha": 0
		}, {
			"key": "an_img5",
			"type": "Bitmap",
			"imageKey": "5",
			"alpha": 0
		}, {
			"key": "an_img6",
			"type": "Bitmap",
			"imageKey": "6",
			"alpha": 0
		}, {
			"key": "an_img7",
			"type": "Bitmap",
			"imageKey": "7",
			"alpha": 0
		}]
	}, {
		"key": "answer",
		"type": "Container",
		"x":110,
		"y":543,
		"alpha": 0,
		"sub": [{
			"key": "an_1",
			"type": "Container",
			"x": 0,
			"y": 0,
			"sub": [{
				"key": "A1",
				"type": "Bitmap",
				"imageKey": "A1",
				"x": 0,
				"y": 0,
				"scene": "A1"
			}, {
				"key": "B1",
				"type": "Bitmap",
				"imageKey": "B1",
				"x": 0,
				"y":134,
				"scene": "B1"
			}, {
				"key": "C1",
				"type": "Bitmap",
				"imageKey": "C1",
				"x": 0,
				"y":271,
				"scene": "C1"
			}]
		}, {
			"key": "an_2",
			"type": "Container",
			"x": 0,
			"y": 0,
			"alpha": 0,
			"sub": [{
				"key": "A2",
				"type": "Bitmap",
				"imageKey": "A2",
				"x": 0,
				"y": 0,
				"scene": "A2"
			}, {
				"key": "B2",
				"type": "Bitmap",
				"imageKey": "B2",
				"x": 0,
				"y":134,
				"scene": "B2"
			}, {
				"key": "C2",
				"type": "Bitmap",
				"imageKey": "C2",
				"x": 0,
				"y":271,
				"scene": "C2"
			}]
		}, {
			"key": "an_3",
			"type": "Container",
			"x": 0,
			"y": 0,
			"alpha": 0,
			"sub": [{
				"key": "A3",
				"type": "Bitmap",
				"imageKey": "A3",
				"x": 0,
				"y": 0,
				"scene": "A3"
			}, {
				"key": "B3",
				"type": "Bitmap",
				"imageKey": "B3",
				"x": 0,
				"y":134,
				"scene": "B3"
			}, {
				"key": "C3",
				"type": "Bitmap",
				"imageKey": "C3",
				"x": 0,
				"y":271,
				"scene": "C3"
			}]
		}, {
			"key": "an_4",
			"type": "Container",
			"x": 0,
			"y": 0,
			"alpha": 0,
			"sub": [{
				"key": "A4",
				"type": "Bitmap",
				"imageKey": "A4",
				"x": 0,
				"y": 0,
				"scene": "A4"
			}, {
				"key": "B4",
				"type": "Bitmap",
				"imageKey": "B4",
				"x": 0,
				"y":134,
				"scene": "B4"
			}, {
				"key": "C4",
				"type": "Bitmap",
				"imageKey": "C4",
				"x": 0,
				"y":271,
				"scene": "C4"
			}]
		}, {
			"key": "an_5",
			"type": "Container",
			"x": 0,
			"y": 0,
			"alpha": 0,
			"sub": [{
				"key": "A5",
				"type": "Bitmap",
				"imageKey": "A5",
				"x": 0,
				"y": 0,
				"scene": "A5"
			}, {
				"key": "B5",
				"type": "Bitmap",
				"imageKey": "B5",
				"x": 0,
				"y":134,
				"scene": "B5"
			}, {
				"key": "C5",
				"type": "Bitmap",
				"imageKey": "C5",
				"x": 0,
				"y":271,
				"scene": "C5"
			}]
		}, {
			"key": "an_6",
			"type": "Container",
			"x": 0,
			"y": 0,
			"alpha": 0,
			"sub": [{
				"key": "A6",
				"type": "Bitmap",
				"imageKey": "A6",
				"x": 0,
				"y": 0,
				"scene": "A6"
			}, {
				"key": "B6",
				"type": "Bitmap",
				"imageKey": "B6",
				"x": 0,
				"y":134,
				"scene": "B6"
			}, {
				"key": "C6",
				"type": "Bitmap",
				"imageKey": "C6",
				"x": 0,
				"y":271,
				"scene": "C6"
			}]
		}, {
			"key": "an_7",
			"type": "Container",
			"x": 0,
			"y": 0,
			"alpha": 0,
			"sub": [{
				"key": "A7",
				"type": "Bitmap",
				"imageKey": "A7",
				"x": 0,
				"y": 0,
				"scene": "A7"
			}, {
				"key": "B7",
				"type": "Bitmap",
				"imageKey": "B7",
				"x": 0,
				"y":134,
				"scene": "B7"
			}, {
				"key": "C7",
				"type": "Bitmap",
				"imageKey": "C7",
				"x": 0,
				"y":271,
				"scene": "C7"
			}]
		}]
	}];
	//第几道问题
	var an_num = 0;
	//问题答案
	var arr = [];
	p.star = function(opt) {
			globalOption.container = opt.container;
			globalOption.canvas = opt.canvas;
			stage = new createjs.Stage(globalOption.canvas);
			this.initResize();
			createjs.Touch.enable(stage);
			stage.cursor = 'pointer';
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
			//进度条美人鱼
			mcMap["loading"] = new createjs.Bitmap("img/loading/boat.png");
			mcMap["loading"].x = 0;
			mcMap["loading"].y = -75;
			mcMap["loading"].tox = (maxW - 124) - Math.max((w - screenW) / 2, 0) / canvasScale - 168;
			mcMap["loadingPanel"].addChild(mcMap["loading"]);
			//进度条数字
			mcMap["loadingTxt"] = new createjs.Text("0%", "38px Arial", "#000");
			mcMap["loadingPanel"].addChild(mcMap["loadingTxt"]);
			mcMap["loadingTxt"].x = maxW / 2;
			mcMap["loadingTxt"].y = -150;
			mcMap["loadingTxt"].textAlign = "center";
			
			mcMap["loadingTxtTop"] = new createjs.Text("正在生成漂流史", "38px Arial", "#000");
			mcMap["loadingPanel"].addChild(mcMap["loadingTxtTop"]);
			mcMap["loadingTxtTop"].x = maxW / 2;
			mcMap["loadingTxtTop"].y = -350;
			mcMap["loadingTxtTop"].textAlign = "center";
			stage.update();
			this.initLoader();
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
		//进度条显示
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
			if(mcMap["loading"]) {
				mcMap["loading"].tox = mcMap["loading"].x = (maxW - 124) - Math.max((w - screenW) / 2, 0) / canvasScale - 168;
			}
			this.scaleCanvas(screenW, screenH);
		}
		//资源加载完成
	p.loadComplete = function() {
		var cur = this;
		createjs.Tween.get(mcMap["loadingPanel"], {
			loop: false
		}).wait(900).to({
			alpha: 0
		}, 500, createjs.Ease.backOut).to({
			visible: false
		}).call(function() {
			$(".audio_flag").show();
			//globalOption.canvas.style.display = "none";
			//globalOption.container.style.display = "block";
			var data = {
					images:["img/line.jpg"],
					frames:[
						[0,0,760,960],
						[760,0,760,960],
						[1520,0,760,960],
						[2280,0,760,960]
					],
					animations:{
						run:{
							frames: [0,1,2,3],
				            speed:0.5
						}
					}
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var instance = new createjs.Sprite(spriteSheet,"run");
				stage.addChild(instance);
			cur.createDisplayObject(stage, displayObjectList);
			cur.initEvent();
		}, null, cur);
	};
	//答案保存，切换动画
	p.scene = function(btn) {
		arr.push(btn.scene);
		this.setwhat(btn.parent);
	};
	//更新画布
	p.change = function() {
			stage.update();
		}
		//初始化事件
	p.initEvent = function() {
			var cur = this;
			//资源加载完成，显示列表对象
			for(var i = 0; i < stage.children.length; i++) {
				stage.update();
				createjs.Tween.get(stage.children[i], {
					loop: false
				}).to({
					alpha: 1
				}, 500, createjs.easeIn);
			};
			var cur = this;
			for(var i = 0; i < mcMap["answer"].children.length; i++) {
				for(var j = 0; j < mcMap["answer"].children[i].children.length; j++) {
					mcMap["answer"].children[i].children[j].on("click", function() {
						cur.scene(this);
					});
				}
			}
				
		}
		//答题按钮和题目切换动画
	p.setwhat = function(btn) {
			an_num++;
			var cur = this;
			if(an_num > mcMap["an_img_box"].children.length) return false;
			//场景切换
			createjs.Tween.get(mcMap["inset_img"].children[an_num - 1], {
					loop: false
				}).to({
					alpha: 0
				}, 500, createjs.easeIn).call(function(){
					createjs.Tween.get(mcMap["inset_img"].children[an_num], {
						loop: false
					}).to({
						alpha: 1
					}, 500, createjs.easeIn);
				},null,cur)
			//题目切换动画
			createjs.Tween.get(mcMap["an_img_box"].children[an_num - 1], {
					loop: false
				}).to({
					alpha: 0
				}, 500, createjs.easeIn)
				.call(function() {
					if(an_num >= mcMap["an_img_box"].children.length) {
						window.location.href = "scene.html";
						return false;
					};
					createjs.Tween.get(mcMap["an_img_box"].children[an_num], {
						loop: false
					}).to({
						alpha: 1
					}, 500, createjs.easeIn);
				}, null, cur);
			//上一题按钮掉落，下一题透明动画
			for(var i = 0; i < btn.children.length; i++) {
				createjs.Tween.get(btn.children[i], {
						loop: false
					}).wait(i * 0.3 * 500).to({
						y: 960
					}, 500, createjs.easeIn)
					.call(function() {
						if(an_num >= mcMap["an_img_box"].children.length) return false;
						createjs.Tween.get(btn.parent.children[an_num], {
							loop: false
						}).to({
							alpha: 1
						}, 500, createjs.easeIn);
					}, null, cur);
			}
		}
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
	Drift.init = init;
})();