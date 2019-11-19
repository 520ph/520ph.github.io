this.eight = this.eight || {};
(function(){
	var Eight = function(opt){
		this.init(opt);
	};
	var p = Eight.prototype;
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
	var mcMap = {};//显示对象集合
	var globalOption = {
		"data":[{val:500},
		{val:200},
		{val:300},
		{val:200},
		{val:350},
		{val:180},
		{val:400},
		{val:250},
		{val:150},
		{val:100},
		{val:285},
		{val:312},
		{val:418},
		{val:500},
		{val:178},
		{val:400},
		{val:500}]
	};
	var displayObjectList = [
	{
		"key": "engit",
		"type": "Container",
		"x": maxW/2,
		"y": fixH/2,
		"sub": [
		{
			"key": "engit4",
			"type": "Shape",
			"X":0,
			"y":0,
			"attr":{
				"scale":200
			}
		},
		{
			"key": "engit3",
			"type": "Shape",
			"X":0,
			"y":0,
			"attr":{
				"scale":150
			}
		}, {
			"key": "engit2",
			"type": "Shape",
			"x":0,
			"y":0,
			"attr":{
				"scale":100
			}
		}, {
			"key": "engit1",
			"type": "Shape",
			"x":0,
			"y":0,
			"attr":{
				"scale":50
			}
		}]
	},{
		"key": "lineBox",
		"type": "Container",
		"x": maxW/2,
		"y": fixH/2,
		"sub":[{
			"key": "lines",
			"type": "Shape",
			"x":0,
			"y":0,
			"attr":{
				"scale":300
			}
		}]
	},{
		"key":"valine",
		"type": "Container",
		"x": maxW/2,
		"y": fixH/2,
	},{
		"key":"cloth",
		"type": "Container",
		"x": maxW/2,
		"y": fixH/2,
		"sub":[{
			"key": "balls",
			"type": "Shape",
			"x":0,
			"y":0
		},{
			"key": "baline",
			"type": "Shape",
			"x":0,
			"y":0
		},{
			"key": "cloths",
			"type": "Shape",
			"x":0,
			"y":0
		}]
	},{
		"key":"valtxt",
		"type": "Container",
		"x": maxW/2,
		"y": fixH/2,
	}];
	//初始化
	p.init = function(opt){
		globalOption.canvas = opt.canvas;
		stage = new createjs.Stage(globalOption.canvas[0]);
		this.initResize();
		createjs.Ticker.on("tick", stage);
		this.initObj();
	};
	//初始化显示列表
	p.initObj = function(){
		this.createDisplayObject(stage,displayObjectList);
		this.loadComplete();
	}
	//自适应
	p.initResize = function() {
		var cur = this;
		$(window).resize(function() {
			screenW = $(window).width();
			screenH = $(window).height();
			w = screenH / hwS;
			canvasScale = screenH / fixH;
			/*if(mcMap["tree"]) {
				mcMap["tree"].x = (maxW - 168) - Math.max((w - screenW) / 2, 0) / canvasScale;
			}
			if(mcMap["loading"]) {
				mcMap["loading"].toX = mcMap["loading"].x = (maxW - 124) - Math.max((w - screenW) / 2, 0) / canvasScale - 168;
			}*/
			cur.scaleCanvas(screenW, screenH);
		});
		$(window).resize();
	};
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
	//批量创建显示对象
	p.createDisplayObject = function(container, ary) {
		for(var i in ary) {
			var obj = ary[i];
			var key = obj["key"];
			var type = obj["type"];
			var mc = {
				attr:obj["attr"]
			};
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
	//
	p.loadComplete = function(){
		mcMap["engit1"].graphics.beginFill("#975555").setStrokeStyle(1)
			.beginStroke("#556297");
		mcMap["engit2"].graphics.beginFill("#559782").setStrokeStyle(1)
			.beginStroke("#975555");
		mcMap["engit3"].graphics.beginFill("#556297").setStrokeStyle(1)
			.beginStroke("#559782");
			mcMap["engit4"].graphics.beginFill("#fde205").setStrokeStyle(1)
			.beginStroke("#559782");
		for (var i = 0; i < 8; i++) {
			//画第一个八边形
			mcMap["engit1"].graphics.lineTo(
				Math.cos((22.5+i * 45) / 180 * Math.PI)*mcMap["engit1"].attr.scale,
				-Math.sin((22.5+i * 45) / 180 * Math.PI)*mcMap["engit1"].attr.scale
			);
			//画第二个八边形
			mcMap["engit2"].graphics.lineTo(
				Math.cos((22.5+i * 45) / 180 * Math.PI)*mcMap["engit2"].attr.scale,
				-Math.sin((22.5+i * 45) / 180 * Math.PI)*mcMap["engit2"].attr.scale
			);
			//画第三个八边形
			mcMap["engit3"].graphics.lineTo(
				Math.cos((22.5+i * 45) / 180 * Math.PI)*mcMap["engit3"].attr.scale,
				-Math.sin((22.5+i * 45) / 180 * Math.PI)*mcMap["engit3"].attr.scale
			);
			//画第三个八边形
			mcMap["engit4"].graphics.lineTo(
				Math.cos((22.5+i * 45) / 180 * Math.PI)*mcMap["engit4"].attr.scale,
				-Math.sin((22.5+i * 45) / 180 * Math.PI)*mcMap["engit4"].attr.scale
			);
			//画分割线
			mcMap["lines"].graphics.setStrokeStyle(1)
			.beginStroke("#001dff")
			.moveTo(0,0)
			.lineTo(
				Math.cos((22.5+i * 45) / 180 * Math.PI)*mcMap["engit4"].attr.scale,
				-Math.sin((22.5+i * 45) / 180 * Math.PI)*mcMap["engit4"].attr.scale
			);
		}
		//半径
		var a = Math.round(-Math.sin(22.5)*mcMap["engit4"].attr.scale);
		var rad = Math.sqrt((mcMap["engit4"].attr.scale*mcMap["engit4"].attr.scale)-(a*a));
		//新数据
		var arr = [];
		for(var i = 0;i < globalOption.data.length;i++){
			arr.push(globalOption.data[i])
		}
		arr = arr.sort(function(a,b){
			return b.val-a.val;
		})
		var angle = 360/arr.length;
		mcMap["baline"].graphics.setStrokeStyle(2)
			.beginStroke("#0ff1ff");
		mcMap["cloths"].graphics.beginFill("#b0adad");
		console.log(globalOption.data)
		for (var i = 0; i < globalOption.data.length; i++) {
			var scale = globalOption.data[i].val/arr[0].val;
			var x = Math.cos((i * angle) / 180 * Math.PI)*(scale*rad);
			var y = -Math.sin((i * angle) / 180 * Math.PI)*(scale*rad);
			mcMap["balls"].graphics.beginFill("#2cd1e4").arc(x,y,5,0,2*Math.PI);
			mcMap["baline"].graphics.lineTo(x,y);
			mcMap["cloths"].graphics.lineTo(x,y);
			var diff = x < 0 ? -250 : 250;
			var line = new createjs.Shape();
			mcMap["valine"].addChild(line);
			line.x = x;
			line.y = y;
			line.graphics.setStrokeStyle(2)
			.beginStroke("#0ff1ff").moveTo(0,0).lineTo(diff-x,0);
			var txt = new createjs.Text();
			var dis = x < 0 ? -12 : 12;
			txt.x = diff+dis;
			txt.y = y-6;
			txt.font = "normal 12px Arial";
			txt.textAlign = 'center';
			txt.text = globalOption.data[i].val;
			txt.color = "#000";
			mcMap["valtxt"].addChild(txt);
		}
		mcMap["baline"].graphics.closePath();
		mcMap["cloths"].graphics.closePath();
		mcMap["cloths"].alpha = 0.5;
	}
	eight.Eight = Eight;
})();
