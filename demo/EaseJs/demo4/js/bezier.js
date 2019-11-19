this.bezier = this.bezier || {};
(function() {
	var wmbezier = function(opt) {
		this.init(opt);
	};
	
	var p = wmbezier.prototype;
	var satge = null; //舞台对象
	var grid = null; //网格对象
	var barBox = null; //柱状图对象
	var lineBox = null; //曲线对象
	var textX = null; //横轴文字
	var textLine = null; //横轴文字线条
	var textY = null; //纵轴文字
	//全局合并配置
	var globalOption = {
		resize:false,
		totalTime:0.2,
		gridColor:"#008eb1",//网格颜色
		gridWidth:0.3,//网格线条宽度
		textColor:"#bdfeff",//文字颜色
		textYTime:0.1,//Y轴文字运动时间
		textXTime:1,//X轴文字运动时间
		textLineTime:1,//X轴线条运动时间
		textLineWidth:1,//X轴线条宽度
		textLineColor:"#8afff8",//X轴线条颜色
		barColor:"#2cd1e4",//柱状图颜色
		barTime:1,//柱状图运动时间
		bezierColor:"rgb(44,209,228)",//曲线颜色
		bezierTime:1,//曲线运动时间
		bezierWidth:0.5,//曲线宽度
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
		var parentNode = document.getElementById(globalOption.canvasId).parentNode;
		parentNode.removeChild(document.getElementById(globalOption.canvasId));
		p.initAdaptive();
	});
	//	自适应配置
	p.initAdaptive = function() {
		if(globalOption.boxElement instanceof $) {
			globalOption.boxElement = globalOption.boxElement[0];
		}
		globalOption.canvasW = globalOption.boxElement.offsetWidth;
		globalOption.canvasH = globalOption.boxElement.offsetHeight;
		// if (window.devicePixelRatio) {
			// globalOption.canvasW *= window.devicePixelRatio;
			// globalOption.canvasH *= window.devicePixelRatio;
			// //ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		// }
		this.initCanvas();
	};

	//创建画布
	p.initCanvas = function() {
		var self = this;
		var newCanvas = document.createElement('canvas');
		newCanvas.id = globalOption.canvasId;
		newCanvas.setAttribute('width', globalOption.canvasW);
		newCanvas.setAttribute('height', globalOption.canvasH);
		globalOption.boxElement.appendChild(newCanvas);
		this.initDisObj();
	};

	//建立显示对象
	p.initDisObj = function() {
		stage = new createjs.Stage(globalOption.canvasId);
		stage.removeAllChildren();
		//画网格
		grid = new createjs.Container();
		grid.x = globalOption.canvasW;
		grid.y = globalOption.canvasH - 20;
		stage.addChild(grid);
		this.initGird();
		//画柱状图
		barBox = new createjs.Container();
		barBox.x = globalOption.canvasW;
		barBox.y = globalOption.canvasH - 20;
		stage.addChild(barBox);
		this.initBar();
		//画曲线
		lineBox = new createjs.Container();
		lineBox.x = globalOption.canvasW;
		lineBox.y = globalOption.canvasH - 20;
		stage.addChild(lineBox);
		//画横轴文字
		textX = new createjs.Container();
		textX.x = globalOption.canvasW;
		textX.y = globalOption.canvasH - 20;
		stage.addChild(textX);
		//横轴线条
		textLine = new createjs.Container();
		textLine.x = globalOption.canvasW;
		textLine.y = globalOption.canvasH - 20;
		stage.addChild(textLine);
		//纵轴文字
		textY = new createjs.Container();
		textY.x = globalOption.canvasW;
		textY.y = globalOption.canvasH;
		stage.addChild(textY);

		this.initText();
		//!globalOption.resize && 
		this.initAnima();
		stage.update();
	};

	//画网格
	p.initGird = function() {
		var line = new createjs.Shape();
		//因为网格坐标从右下角开始，右下角定义为0，0，左上为负数，
		//左为-canavs.width,上为-canvas.height
		//画横线
		for(var i = 0; i < globalOption.canvasH / 25; i++) {
			line.graphics.setStrokeStyle(globalOption.gridWidth).beginStroke(globalOption.gridColor).moveTo(0, -i * 25).lineTo(-globalOption.canvasW, -i * 25);
		}
		//画竖线
		for(var i = 0; i < globalOption.canvasW / 25; i++) {
			line.graphics.setStrokeStyle(globalOption.gridWidth).beginStroke(globalOption.gridColor).moveTo(-i * 25, 0).lineTo(-i * 25, -globalOption.canvasH);
		}
		grid.addChild(line);
	}

	//画柱状图
	p.initBar = function() {
		globalOption.arrObj = globalOption.arrObj.sort(function(b, a) {
			return a.val - b.val;
		})
		globalOption.boxwidth = (globalOption.canvasW-20) / 3;
		globalOption.barwidth = globalOption.boxwidth / globalOption.arrObj.length / 2;
		for(var i = 0; i < globalOption.arrObj.length; i++) {
			var bar = new createjs.Shape();
			bar.width = globalOption.barwidth;
			bar.height = (globalOption.arrObj[i].val / globalOption.arrObj[0].val) * (globalOption.canvasH - 50);
			bar.color = globalOption.barColor;
			bar.graphics.beginFill(bar.color).drawRoundRect(0, 0, bar.width, bar.height, 0);
			bar.x = -(i * globalOption.barwidth) * 2 - globalOption.barwidth - globalOption.boxwidth;
			bar.y = 0;
			bar.rotation = 180;
			bar.scaleY = 0;
			barBox.addChild(bar);
		}
	}

	//画文字和文字线
	p.initText = function() {

			for(var i = 0; i < barBox.children.length; i++) {
				var txtX = new createjs.Text();
				txtX.text = globalOption.arrObj[i].txt;
				txtX.font = "normal 16px Arial";
				txtX.textAlign = 'left';
				txtX.x = -globalOption.boxwidth / 4 * 3;
				txtX.y = 20;
				txtX.toY = -barBox.children[i].height - 16 / 2;
				txtX.color = globalOption.textColor;
				txtX.lineWidth = 16;
				txtX.lineHeight = 1;
				textX.addChild(txtX);

				var line = new createjs.Shape();
				line.toX = 0;
				line.graphics.setStrokeStyle(globalOption.textLineWidth)
				.beginStroke(globalOption.textLineColor)
				.drawRoundRect(barBox.children[i].x - globalOption.barwidth, barBox.children[i].y - barBox.children[i].height, -barBox.children[i].x + txtX.x, 1, 0);
				line.scaleX = 0;
				textLine.addChild(line);

				var txtY = new createjs.Text();
				txtY.text = globalOption.arrObj[i].val;
				txtY.font = "normal 16px Arial";
				txtY.textAlign = 'center';
				txtY.x = -(globalOption.boxwidth * (globalOption.arrObj[i].val / globalOption.arrObj[0].val) + globalOption.boxwidth * 2);
				txtY.y = 0;
				txtY.toY = -20;
				txtY.color = globalOption.textColor;
				txtY.lineWidth = 16;
				txtY.lineHeight = 1;
				textY.addChild(txtY);

			}
		}
		//入场动画
	p.initAnima = function() {

		for(var i = 0; i < barBox.children.length; i++) {
			var bezier = new createjs.Shape();
			bezier.toY = 0;
			lineBox.addChild(bezier);
			var startX = barBox.children[i].x - globalOption.barwidth;
			var startY = -barBox.children[i].height + 1;
			var x1 = -(globalOption.boxwidth * (globalOption.arrObj[i].val / globalOption.arrObj[0].val)/3 + globalOption.boxwidth * 2);
			var y1 = startY;
			var x2 = -(globalOption.boxwidth * (globalOption.arrObj[i].val / globalOption.arrObj[0].val) + globalOption.boxwidth * 2);
			var y2 = startY*0.6;
			var obj = {
				bezier: bezier,
				startX: startX,
				startY: startY,
				x1: x1,
				y1: y1,
				x2: x2,
				y2: y2,
				bezierWidth:globalOption.bezierWidth
			}

			var tl = new TimelineLite();
			tl.to(barBox.children[i],globalOption.barTime, {
				delay: i * globalOption.totalTime,
				scaleY: 1,
				onUpdate: function() {
					stage.update();
				}
			})
			.to(obj.bezier,globalOption.bezierTime, {
					delay: i * globalOption.totalTime,
					toY: 1,
					ease: Linear.easeNone,
					onUpdateParams: [obj],
					onUpdate: function(obj) {
						obj.bezier.graphics.clear().setStrokeStyle(obj.bezierWidth)
							.beginLinearGradientStroke(["rgba(0,0,0,0)",globalOption.bezierColor,globalOption.bezierColor, "rgba(0,0,0,0)"], [0, 0.01, 0.99, 1], obj.startX + 10, obj.startY, obj.x1 + (obj.x2 - obj.x1) * obj.bezier.toY, obj.y1 - obj.y1 * obj.bezier.toY + 10)
							.moveTo(obj.startX, obj.startY)
							.bezierCurveTo(obj.x1, obj.y1, obj.x2, obj.y2, obj.x2, 0);
						stage.update();
					}
				})
				.to(textY.children[i],globalOption.textYTime, {
					y: textY.children[i].toY,
					ease: Linear.easeNone,
					onUpdate: function() {
						stage.update();
					}
				});
			var t2 = new TimelineLite();
			t2.to(textLine.children[i],globalOption.textLineTime, {
					delay: i * globalOption.totalTime,
					scaleX:1,
					ease: Linear.easeNone,
					onUpdate: function() {
						stage.update();
					}
				})
			var t3 = new TimelineLite();
				t3.to(textX.children[i],globalOption.textXTime, {
					delay: i * globalOption.totalTime,
					y: textX.children[i].toY,
					ease: Linear.easeNone,
					onUpdate: function() {
						stage.update();
					}
				});
		}
	}
	//	组件重配
	p.resetStage = function(opt){
		globalOption = (opt instanceof Object) ? this.mergeConfig(opt,globalOption) : globalOption;
		var parentNode = document.getElementById(globalOption.canvasId).parentNode;
		parentNode.removeChild(document.getElementById(globalOption.canvasId));
		this.initAdaptive();
	};

	bezier.wmbezier = wmbezier;
})();