this.answer = this.answer || {};
(function() {
	var Cover = function(opt) {
		this.init(opt);
	}
	var p = Cover.prototype;
	var globalOption = {}; //全局配置参数
	var stage = null; //舞台对象
	var loader = null;//加载图片资源对象
	var fixH = 960; //固定高
	var minW = 567; //最小宽
	var maxW = 760; //最大宽
	var hwS = fixH / maxW; //比例
	var canvasScale = 1; //缩放数
	var screenW = $(window).width();//实际屏幕宽
	var screenH = $(window).height();//实际屏幕高
	var w = screenH / hwS;//缩放比例
	var yesimg = document.createElement("img");//是按钮的图片元素
	var noimg = document.createElement("img");//否按钮的图片元素
	//显示对象资源集合，方便调用
	var mcMap = {};
	//图片资源集合，方便调用
	var resourcesMap = {};
	//图片资源地址
	var resourcesUrl = [{
		"id": "loading",
		src: "img/loading.png"
	}, {
		id: "tree",
		src: "img/loading/tree.jpg"
	}, {
		id: "boat",
		src: "img/loading/boat.png"
	}, {
		id: "maxFlaky",
		src: "img/answer/1_03.png"
	}, {
		id: "middleFlaky",
		src: "img/answer/1_06.png"
	}, {
		id: "minFlaky",
		src: "img/answer/1_09.png"
	}, {
		id: "tel",
		src: "img/answer/1_15.png"
	}, {
		id: "mountain",
		src: "img/answer/1_23.png"
	}, {
		id: "boatline",
		src: "img/answer/1_26.png"
	}, {
		id: "fisline",
		src: "img/answer/1_28.png"
	}, {
		id: "seaweed",
		src: "img/answer/1_35.png"
	}, {
		id: "fis",
		src: "img/answer/1_38.png"
	}, {
		id: "bubble",
		src: "img/answer/1_39.png"
	},{
		id: "waveline",
		src: "img/answer/line.png"
	}, {
		id: "line",
		src: "img/answer/1_03.png"
	}, {
		id: "yes",
		src: "img/btn/01_01.png"
	}, {
		id: "no",
		src: "img/btn/01_03.png"
	}, {
		id: "often",
		src: "img/btn/01_08.png"
	}, {
		id: "while",
		src: "img/btn/01_10.png"
	},{
		id: "myself",
		src: "img/btn/01_23.png"
	}, {
		id: "takeout",
		src: "img/btn/01_24.png"
	}, {
		id: "zero",
		src: "img/btn/01_27.png"
	}, {
		id: "threeT",
		src: "img/btn/01_28.png"
	},{
		id: "mycar",
		src: "img/btn/01_35.png"
	}, {
		id: "bus",
		src: "img/btn/01_36.png"
	}];
	//显示对象列表
	var displayObjectList = [{
		"key": "mountain",
		"type": "Bitmap",
		"imageKey": "mountain",
		"x": 380,
		"y": 608
	}, {
		"key": "tel",
		"type": "Bitmap",
		"imageKey": "tel",
		"x":99,
		"y": 90
	}, {
		"key": "what",
		"type": "Text",
		"font": "bold 28px Arial",
		"color": "#000",
		"text": "1/环境不理想，搬家次数逐年涨",
		"x": 158,
		"y": 330
	}, {
		"key": "yes",
		"type": "Bitmap",
		"imageKey": "yes",
		"x": 132,
		"y": 449
	}, {
		"key": "no",
		"type": "Bitmap",
		"imageKey": "no",
		"x": 354,
		"y": 449
	}, {
		"key": "yesbtn",
		"type": "Shape",
		"imageKey": "yes",
		"x": 132,
		"y": 449
	}, {
		"key": "nobtn",
		"type": "Shape",
		"imageKey": "no",
		"x": 354,
		"y": 449
	}, {
		"key": "maxFlaky",
		"type": "Bitmap",
		"imageKey": "maxFlaky",
		"x": 340,
		"y": 91
	}, {
		"key": "middleFlaky",
		"type": "Bitmap",
		"imageKey": "middleFlaky",
		"x": 542,
		"y": 174
	}, {
		"key": "minFlaky",
		"type": "Bitmap",
		"imageKey": "minFlaky",
		"x": 110,
		"y": 180
	}, {
		"key": "boatline",
		"type": "Bitmap",
		"imageKey": "boatline",
		"x": 156,
		"y": 713
	}, {
		"key": "waveline",
		"type": "Bitmap",
		"imageKey": "waveline",
		"x": 0,
		"y": 804
	}, {
		"key": "fisline",
		"type": "Bitmap",
		"imageKey": "fisline",
		"x": 358,
		"y": 732
	}, {
		"key": "seaweed",
		"type": "Bitmap",
		"imageKey": "seaweed",
		"x": 137,
		"y": 861
	}, {
		"key": "swimming",
		"type": "Container",
		"x":760,
		"y":827,
		"sub": [{
			"key": "fis",
			"type": "Bitmap",
			"imageKey": "fis",
			"X":36,
			"y":38
		}, {
			"key": "bubble",
			"type": "Bitmap",
			"imageKey": "bubble",
			"x":-5,
			"y":0
		}]
	}];

	var keys = 1;
	var arr = [];
	var whatobj = {
		1: {
			num: 1,
			txt: "环境不理想，搬家次数逐年涨",
			yes: {
				next: 2,
				flag: true,
				imgUrl: "yes"
			},
			no: {
				next: 2,
				flag: false,
				imgUrl: "no"
			}
		},
		2: {
			num: 2,
			txt: "习以为常，不加班才是不正常",
			yes: {
				next: 3,
				flag: true,
				imgUrl: "yes"
			},
			no: {
				next: 3,
				flag: false,
				imgUrl: "no"
			}
		},
		3: {
			num: 3,
			txt: "自己做饭太难，外卖才是真爱",
			yes: {
				next: 4,
				flag: true,
				imgUrl: "myself"

			},
			no: {
				next: 4,
				flag: false,
				imgUrl: "takeout"
			}
		},
		4: {
			num: 4,
			txt: "早已习惯，一言不合被逼婚",
			yes: {
				next: 5,
				flag: true,
				imgUrl: "myself"
			},
			no: {
				next: 5,
				flag: false,
				imgUrl: "takeout"
			}
		},
		5: {
			num: 5,
			txt: "请叫我月光王子/月光公主",
			yes: {
				next: 6,
				flag: true,
				imgUrl: "yes"
			},
			no: {
				next: 6,
				flag: true,
				imgUrl: "no"
			}
		},
		6: {
			num: 6,
			txt: "漂了这么久，对象有没有",
			yes: {
				next: 7,
				flag: true,
				imgUrl: "yes"
			},
			no: {
				next: 7,
				flag: false,
				imgUrl: "no"
			}
		},
		7: {
			num: 7,
			txt: "你是有车一族，还是公共交通\n的忠\"乘\"者",
			yes: {
				next: 8,
				flag: true,
				imgUrl: "mycar"
			},
			no: {
				next: 8,
				flag: false,
				imgUrl: "bus"
			}
		},
		8: {
			num: 8,
			txt: "不跟朋友出来嗨一下，人生怎\n能完美",
			yes: {
				next:0,
				flag: true,
				imgUrl: "often"
			},
			no: {
				next:0,
				flag: false,
				imgUrl: "while"
			}
		}
	};

	//初始化
	p.init = function(opt) {
			globalOption.canvas = opt.canvas;
			stage = new createjs.Stage(globalOption.canvas[0]);
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
			//右边的树
			mcMap["tree"] = new createjs.Bitmap("img/loading/tree.jpg");
			mcMap["loadingPanel"].addChildAt(mcMap["tree"], 0);
			mcMap["tree"].x = (maxW - 168) - Math.max((w - screenW) / 2, 0) / canvasScale;
			mcMap["tree"].y = -105;
			stage.update();
			//进度条小船
			mcMap["loading"] = new createjs.Bitmap("img/loading/boat.png");
			mcMap["loading"].x = 0;
			mcMap["loading"].y = -75;
			mcMap["loading"].toX = (maxW - 124) - Math.max((w - screenW) / 2, 0) / canvasScale - 168;
			mcMap["loadingPanel"].addChildAt(mcMap["loading"], 0);
			//进度条数字
			mcMap["loadingTxt"] = new createjs.Text("0%", "38px Arial", "#000");
			mcMap["loadingPanel"].addChild(mcMap["loadingTxt"]);
			mcMap["loadingTxt"].x = maxW / 2;
			mcMap["loadingTxt"].y = 120;
			mcMap["loadingTxt"].textAlign = "center";
			stage.update();
			this.initLoader();
		}
		//自适应
	p.initResize = function() {
		var cur = this;
		$(window).resize(function() {
			screenW = $(window).width();
			screenH = $(window).height();
			w = screenH / hwS;
			canvasScale = screenH / fixH;
			if(mcMap["tree"]) {
				mcMap["tree"].x = (maxW - 168) - Math.max((w - screenW) / 2, 0) / canvasScale;
			}
			if(mcMap["loading"]) {
				mcMap["loading"].toX = mcMap["loading"].x = (maxW - 124) - Math.max((w - screenW) / 2, 0) / canvasScale - 168;
			}
			cur.scaleCanvas(screenW, screenH);
		});
		$(window).resize();
	};
	p.mcMap = {};

	//自适应
	p.scaleCanvas = function(screenW, screenH) {
		var h = screenH;
		var w = screenH / hwS;
		var left = (screenW - w) / 2;
		globalOption.canvas.css({
			"width": w,
			"height": h,
			"left": left
		});
	};
	//加载进度条
	p.initLoader = function() {
		var cur = this;
		loader = new createjs.LoadQueue(false);
		loader.setMaxConnections(15);
		loader.on("fileload", function(e) {
			var id = e.item.id;
			var item = e.item;
			var type = e.item.type;
			resourcesMap[id] = item;
		});
		loader.on("progress", function(e) {
			mcMap["loadingTxt"].text = Math.round(e.progress * 100) + "%";
			mcMap["loading"].x = e.progress.toFixed(2) * mcMap["loading"].toX;
			stage.update();
		});
		loader.on("complete", function() {
			cur.loadComplete();
		});
		loader.loadManifest(resourcesUrl);
		loader.load();
	};
	//问题开始
	p.loadComplete = function() {
			var cur = this;
			createjs.Tween.get(mcMap["loadingPanel"], {
				loop: false
			}).wait(900).to({
				alpha: 0
			}, 1000, createjs.Ease.backOut).to({
				visible: false
			}).call(cur.initDisPlayObject, null, cur);
			//this.initDisPlayObject();
		}
		//初始化显示对象
	p.initDisPlayObject = function() {
		var cur = this;
		this.createDisplayObject(stage,displayObjectList);
		console.log(mcMap["yesbtn"])
		mcMap["yesbtn"].graphics.rect(0, 0, 212, 82);
		var hit = new createjs.Shape();
		hit.graphics.beginFill("#000").rect(0, 0, 212, 82);
		mcMap["yesbtn"].hitArea = hit;
		console.log(mcMap["swimming"])
		mcMap["nobtn"].graphics.rect(0, 0, 212, 82);
		mcMap["nobtn"].hitArea = hit;
		createjs.Tween.get(mcMap["swimming"], {
				loop: true
			}).to({
				x:-50
			},3000, createjs.Ease.linear);
		//mcMap["swimming"].
		this.initEvent();
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
	//初始化事件
	p.initEvent = function() {
		var cur = this;
		stage.cursor = 'pointer';
		mcMap["yesbtn"].on("click", function() {
			cur.setwhat("yes");
		});
		mcMap["nobtn"].on("mousedown", function() {
			cur.setwhat("no");
		});
	}

	p.setwhat = function(type) {
		if(whatobj[keys][type].flag) {
			arr.push(keys)
			console.log("出动画");
		} else {
			console.log("不出动画");
		}
		keys = whatobj[keys][type].next;
		if(!whatobj[keys] || keys===0){
			this.initAn();
			return false;
		}
		mcMap["what"].text = whatobj[keys].num + "/" + whatobj[keys].txt;
		yesimg.src = resourcesMap[whatobj[keys].yes.imgUrl].src;
		mcMap["yes"].image = yesimg;
		noimg.src = resourcesMap[whatobj[keys].no.imgUrl].src;
		mcMap["no"].image = noimg;
	}
	p.initAn = function(){
		createjs.Tween.get(stage, {
				loop: false
			}).to({
				alpha: 0
			}, 1000, createjs.Ease.linear);
		console.log("开始场景动画！");
	}
	answer.Cover = Cover;
})();