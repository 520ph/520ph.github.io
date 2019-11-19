this.bezier = this.bezier || {};
(function() {
	var wmbezier = function(opt) {
		this.init(opt);
	};
	
	var p = wmbezier.prototype;
	var satge = null; //舞台对象
	var grid = null; //网格对象
	var threeBox = null; //柱状图对象
	var circleBox = null;//小圆球对象
	var lineBox = null;//线条对象
	var textBox = null;//文字对象
	var numline = null;//刻度对象
	//全局合并配置
	var globalOption = {
		animflag:false,
		boxElement:null,
		resize:false,
		totalTime:0.1,
		gridColor:"#008eb1",//网格颜色
		textColor:"#bdfeff",//文字颜色
		circleRadius:5,
		gridWidth:0.3,//网格线条宽度
		barTime:0.8,//柱状图运动时间
		textYTime:0.8,//文字运动时间
		circleTime:0.8,//小圆球运动时间
		lineTime:0.8,//线条运动时间
		arrObj:[{//默认数据
			val:180,
			txt:"域名1"
			},{
			val:150,
			txt:"域名2"
			}, {
			val:120,
			txt:"域名3"
			}, {
			val:90,
			txt:"域名4"
			}, {
			val:50,
			txt:"域名5"
			}, {
			val:70,
			txt:"域名6"
			}, {
			val:140,
			txt:"域名7"
			}, {
			val:200,
			txt:"域名8"
			}, {
			val:30,
			txt:"域名9"
			}]
	};
	
	
	p.EventDispatcher = $({}); //组件通信事件触发器
	//初始化
	p.init = function(opt) {
		globalOption = $.extend(globalOption, opt);
		this.initAdaptive();
	};
	//重绘
	$(window).on("resize", function() {
		if(!globalOption.animflag)return;
		/*var parentNode = document.getElementById(globalOption.canvasId).parentNode;
		parentNode.removeChild(document.getElementById(globalOption.canvasId));
		p.initAdaptive();*/
		globalOption.newCanvas.width = globalOption.boxElement.offsetWidth;
		globalOption.newCanvas.height = globalOption.boxElement.offsetHeight;
		var scaleX =globalOption.boxElement.offsetWidth/globalOption.canvasW;
		var scaleY =globalOption.boxElement.offsetHeight/globalOption.canvasH;
		threeBox.scaleX = scaleX;
		threeBox.scaleY = scaleY;
		for (var i = 0; i < stage.children.length; i++) {
			stage.children[i].x = stage.children[i].originalX*scaleX;
			stage.children[i].y = stage.children[i].originalY*scaleY;
		}
		for(var i = 0; i < circleBox.children.length; i++) {
			//X轴缩放
			circleBox.children[i].x = circleBox.children[i].originalX*scaleX;
			lineBox.children[i].x = lineBox.children[i].originalX*scaleX;
			lineBox.children[i].scaleX = scaleX;
			textBox.children[i].x = textBox.children[i].originalX*scaleX;
			//Y轴缩放
			threeBox.children[i].y = threeBox.children[i].originalY*scaleY;
			circleBox.children[i].y = circleBox.children[i].originalY*scaleY;
			lineBox.children[i].y = lineBox.children[i].originalY*scaleY;
			textBox.children[i].y = textBox.children[i].originalY*scaleY;
			
		}
		for (var i = 0; i < numline.children.length; i++) {
			//X轴缩放
			numline.children[i].x = numline.children[i].originalX*scaleX;
			//Y轴缩放
			numline.children[i].y = numline.children[i].originalY*scaleY;
		}
		stage.update();
	});
	//	自适应配置
	p.initAdaptive = function() {
		if(globalOption.boxElement instanceof $) {
			globalOption.boxElement = globalOption.boxElement[0];
		}
		globalOption.canvasW = globalOption.boxElement.offsetWidth;
		globalOption.canvasH = globalOption.boxElement.offsetHeight;
		globalOption.hsW = globalOption.canvasH/globalOption.canvasW;
		/*if (window.devicePixelRatio) {
			globalOption.canvasW *= window.devicePixelRatio;
			globalOption.canvasH *= window.devicePixelRatio;
			//ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		}*/
		this.initCanvas();
	};

	//创建画布
	p.initCanvas = function() {
		var self = this;
		globalOption.newCanvas = document.createElement('canvas');
		globalOption.newCanvas.id = globalOption.canvasId;
		globalOption.newCanvas.setAttribute('width', globalOption.canvasW);
		globalOption.newCanvas.setAttribute('height', globalOption.canvasH);
		globalOption.boxElement.appendChild(globalOption.newCanvas);
		this.initDisObj();
	};

	//建立显示对象
	p.initDisObj = function() {
		stage = new createjs.Stage(globalOption.canvasId);
		stage.removeAllChildren();
		//画网格
		grid = new createjs.Container();
		grid.x = grid.originalX = globalOption.canvasW;
		grid.y = grid.originalX = globalOption.canvasH;
		stage.addChild(grid);
		this.initGird();
		
		threeBox = new createjs.Container();
		threeBox.x = threeBox.originalX = 5;
		threeBox.y = threeBox.originalY = globalOption.canvasH;
		stage.addChild(threeBox);
		//初始化小圆球容器
		circleBox = new createjs.Container();
		circleBox.x = circleBox.originalX = 5;
		circleBox.y = circleBox.originalY = globalOption.canvasH;
		stage.addChild(circleBox);
		//初始化线条容器
		lineBox = new createjs.Container();
		lineBox.x = lineBox.originalX = 5;
		lineBox.y = lineBox.originalY = globalOption.canvasH;
		stage.addChild(lineBox);
		//初始化文字容器
		textBox = new createjs.Container();
		textBox.x = textBox.originalX = 5;
		textBox.y = textBox.originalY = globalOption.canvasH;
		stage.addChild(textBox);
		this.initThree();
		//初始化刻度容器
		numline = new createjs.Container();
		numline.x = numline.originalX = 0;
		numline.y = numline.originalY = globalOption.canvasH;
		stage.addChild(numline);
		this.numlines();
		//初始化入场动画
		this.initAnima();
		stage.update();
		
		stage.enableMouseOver(10);
		stage.cursor = 'pointer';
		this.initEvent();
		stage.update();
	};
	
	//画网格
	p.initGird = function() {
		var line = new createjs.Shape();
		//因为网格坐标从右下角开始，右下角定义为0，0，左上为负数，
		//左为-canavs.width,上为-canvas.height
		//画横线
		//var numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / 100); 
		for(var i = 0; i < globalOption.canvasH/25; i++) {
			line.graphics.setStrokeStyle(globalOption.gridWidth).beginStroke("#00fef0").moveTo(0, -i * 25).lineTo(-globalOption.canvasW,-i*25);
		}
		grid.addChild(line);
	}
	
	p.initThree = function(){
		//排序从大到小
		globalOption.arrObj = globalOption.arrObj.sort(function(b, a) {
			return a.val - b.val;
		})
		var translateX = 0;
		for (var i = 0; i < globalOption.arrObj.length; i++) {
			//算出数据比例
			var scale = (globalOption.arrObj[i].val / globalOption.arrObj[0].val);
			//算数平分的三角形宽的一半
			var scaleX = globalOption.canvasW/globalOption.arrObj.length;
			//创建显示对象用于画三角形
			var san = new createjs.Shape();
			//绘制三角形
			san.graphics
			.beginFill("#2cd1e4")
			.moveTo(0,-globalOption.canvasH+globalOption.canvasH*0.1)
			.lineTo(-scaleX,0)
			.lineTo(scaleX,0)
			.closePath();
			san.txt = globalOption.arrObj[i].txt;
			san.val = globalOption.arrObj[i].val;
			//位移的位置是每个三角形的2/3
			//宽度为scaleX*2
			//比例是scale
			//宽度*比例，然后分为3份/3，再*2
			translateX += (scaleX*2)*scale/3*2;
			san.x = san.originalX = translateX;
			san.y = san.originalY = 0;
			//透明度从0.9递减
			san.alpha = 1-i*0.1;
			//X轴按比例缩放
			san.scaleX = scale;
			//Y轴按比例缩放
			san.scaleY = 0;
			//让第一个三角形在之前，因为一般都是后添加的在前面
			//所以倒叙添加，每次添加到下标为0的子元素之前，也就是每次都是添加第一个
			threeBox.addChildAt(san,0);
			//绘制小球
			var circle = new createjs.Shape();
			circle.x = circle.originalX = translateX;
			circle.toY = circle.originalY = -(globalOption.canvasH-globalOption.canvasH*0.1)*scale;
			circle.y = globalOption.circleRadius*2;
			circle.graphics.beginFill("#2cd1e4").arc(0,0,globalOption.circleRadius,0,2*Math.PI);
			circleBox.addChild(circle);
			//绘制线条
			var line = new createjs.Shape();
			line.graphics.setStrokeStyle(1).beginStroke("#00fef0")
			.moveTo(0,0)
			.lineTo(globalOption.canvasH*0.1,0);
			line.x = line.originalX = translateX+5;
			line.y = line.originalY = circle.toY;
			line.scaleX = 0;
			lineBox.addChild(line);
			
			var txt = new createjs.Text();
			txt.x = txt.originalX = translateX+globalOption.canvasH*0.1+20;
			txt.toY = txt.originalY = circle.toY-7;
			txt.y = 0;
			txt.font = "normal 12px Arial";
			txt.textAlign = 'center';
			txt.text = globalOption.arrObj[i].txt;
			txt.color = globalOption.textColor;
			txt.lineWidth = 16;
			txt.lineHeight = 1;
			textBox.addChild(txt);
		}
	}
	
	p.numlines = function(){
			var log = globalOption.arrObj[0].val/10;
			var scale = (globalOption.canvasH-globalOption.canvasH*0.1)/10;
			var scaleY = 6;
			var translateX = 0;
			var length = globalOption.arrObj[0].val.toString().length;
			for (var i = 1; i <= 11; i++) {
				var num = new createjs.Text();
				num.x = num.originalX = length*10;
				num.toY = num.originalY = -scaleY-6;
				num.y = 0;
				num.font = "normal 12px Arial";
				num.textAlign = 'right';
				num.text = translateX;
				num.color = globalOption.textColor;
				scaleY=scale*i;
				translateX=i*log;
				numline.addChild(num);
			}
	}
	
	//入场动画
	p.initAnima = function(){
		globalOption.arrObj.reverse();
		var t2 = new TimelineLite();
		for (var i = 0; i <= 10; i++) {
			t2.to(numline.children[i],0.1,{
				delay: i * 0.1,
				y:numline.children[i].toY,
				onUpdate: function() {
					stage.update();
				}
			});
		}
		for (var i = 0; i < threeBox.children.length; i++) {
			//threeBox.children[i].scaleY = 
			var scale = (globalOption.arrObj[i].val / globalOption.arrObj[globalOption.arrObj.length-1].val);
			var tl = new TimelineLite();
			tl.to(threeBox.children[i],globalOption.barTime, {
				delay: i * globalOption.totalTime,
				scaleY: scale,
				onUpdate: function() {
					stage.update();
				}
			})
			.to(circleBox.children[i],globalOption.circleTime,{
				delay: i * globalOption.totalTime,
				y:circleBox.children[i].toY,
				onUpdate: function() {
					stage.update();
				}
			})
			.to(lineBox.children[i],globalOption.lineTime,{
				delay: i * globalOption.totalTime,
				scaleX:1,
				onUpdate: function() {
					stage.update();
				}
			})
			.to(textBox.children[i],globalOption.textYTime,{
				delay: i * globalOption.totalTime,
				y:textBox.children[i].toY,
				onUpdate: function() {
					stage.update();
					globalOption.animflag = true;
				}
			});
		}
	}
	//事件通知
	p.initEvent = function(){
		/* for(var i in this.barBox.children){
			this.barBox.children.addEventListener('mouseover',function(){
				
			});
		} */
		console.log(1)
		stage.on('mouseover',function(e){
			console.log(1)
			console.log(e);
		});
		console.log(25)
	};

	//	组件重配
	p.resetStage = function(opt){
		globalOption = (opt instanceof Object) ? this.mergeConfig(opt,globalOption) : globalOption;
		var parentNode = document.getElementById(globalOption.canvasId).parentNode;
		parentNode.removeChild(document.getElementById(globalOption.canvasId));
		this.initAdaptive();
	};

	bezier.wmbezier = wmbezier;
})();