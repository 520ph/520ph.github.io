this.Widget = this.Widget || {};
(function() {
	var barline = function(opt) {
		this.init(opt);
	};
	var p = barline.prototype;
	var stage = null; //舞台对象
	var numline = null; //刻度容器
	var lineval = 0;//刻度尺寸
	var leftArr = [],rightArr = [];//左右数据数组
	var newCanvas = null;//canvas元素
	var barBox = null;//柱图容器
	var lineBox = null;//刻度容器
	var txtBox = null;//文字容器
	//全局配置
	var globalOption = {
		boxElement: document.querySelector("#main"),
		canvasId: "barline",
		data: [],
		legend:{
			title: "图例",
			color:"#fff",
			leftText:"成交金额",
			rightText:"成交数量",
			leftColor:"#f90",
			rightColor:"#23a8b7"
		},
		axisTick:{
			left: 6,
			right: 6,
			lineColor:"#00fff0",
			backgroundColor:"#324b64",
			axisTickColor:"#00fff0",
			textColor:"#699091"
		},
		style:{
			centerColor:"#164272",
			textColor:"#fff",
			leftColor:{
				r:0,
				g:255,
				b:1,
				a:1
			},
			rightColor:{
				r:150,
				g:0,
				b:255,
				a:1
			}
		}
	};
	//自适应配置
	p.initAdaptive = function(opt) {
		globalOption.canvasW = globalOption.boxElement.offsetWidth;
		globalOption.canvasH = globalOption.boxElement.offsetHeight;
		globalOption.hsW = globalOption.canvasH / globalOption.canvasW;
		this.initCanvas();
	}

	p.init = function(opt) {
			globalOption = $.extend(true, globalOption, opt);
			this.initAdaptive(opt);
		}
		//创建canvas
	p.initCanvas = function() {
		//newCanvas = document.createElement('canvas');
		//newCanvas.id = globalOption.canvasId;
		newCanvas = document.querySelector("#barline");
		newCanvas.width = globalOption.canvasW;
		newCanvas.height = globalOption.canvasH;
		//globalOption.boxElement.appendChild(newCanvas);
		this.initDisObj();

	};
	p.initDisObj = function() {
		//创建舞台
		stage = new createjs.Stage(globalOption.canvasId);
		//初始化图例
		this.initTips();
		//初始化刻度
		this.initNumLine();
		/*if (window.devicePixelRatio) {
				globalOption.canvasW *= window.devicePixelRatio;
				globalOption.canvasH *= window.devicePixelRatio;
				stage.scaleX = stage.scaleY = window.devicePixelRatio;
				//$(newCanvas).css("transform","scale("+window.devicePixelRatio, window.devicePixelRatio+")");
				//newCanvas.scale(window.devicePixelRatio, window.devicePixelRatio);
		}*/
	};
	//刻度
	p.initNumLine = function() {
		lineBox = new createjs.Container();
		txtBox = new createjs.Container();
		//循环遍历data数据，获取左右两边的数据并赋值
		for (var i = 0; i < globalOption.data.length; i++) {
			leftArr.push(globalOption.data[i].left);
			rightArr.push(globalOption.data[i].right);
		}
			//左边数据排序，从大到小
			var left = leftArr.concat().sort(function(a, b){
				return b - a;
			});
			//右边数据排序，从大到小
			var right = rightArr.concat().sort(function(a, b){
				return b - a;
			});
			//左边刻度的步长
			var le_line = this.numlines(left[0],0,globalOption.axisTick.left);
			//左边刻度的步长
			var ri_line = this.numlines(right[0],0,globalOption.axisTick.right);
			//左右的刻度数值
			var le_lineData = [],ri_lineDate = [];
			//循环遍历，添加左边刻度数值
			for (var i = 0; i < globalOption.axisTick.left; i++) {
				le_lineData.push(le_line*i);
			}
			//循环遍历，添加右边刻度数值
			for (var i = 0; i < globalOption.axisTick.right; i++) {
				ri_lineDate.push(ri_line*i);
			}
			//因为，刻度是从0开始计算(0-10)，所以，昨天刻度值叙排序一下，右边刻度值，去掉0，然后拼起来就是整个刻度值的数值
			var tol = le_lineData.sort(function(a,b){return b - a;}).concat(ri_lineDate.slice(1))
			//显示区域的宽度/刻度数的长度=步长像素，用来定位
			lineval = (globalOption.canvasW - 20) / tol.length;
			//画横线，刻度横线
			var Xline = new createjs.Shape();
			Xline.graphics.setStrokeStyle(1).beginStroke(globalOption.axisTick.lineColor).moveTo(0, 0).lineTo(globalOption.canvasW, 0);
			Xline.y = 100;
			//画刻度竖线
			var Yline = new createjs.Shape();
			Yline.y = 100;
			Yline.x = (globalOption.canvasW-lineval*(tol.length-1))/2;
			//遍历刻度长度，画出来竖线，文字也创建出来
			for(var i = 0; i < tol.length; i++) {	
				//背景竖线
				Yline.graphics.setStrokeStyle(1).beginStroke(globalOption.axisTick.backgroundColor).moveTo(lineval * i, 0).lineTo(lineval * i, globalOption.canvasH);
				//刻度竖线
				Yline.graphics.setStrokeStyle(2).beginStroke(globalOption.axisTick.axisTickColor).moveTo(lineval * i, -5).lineTo(lineval * i, 5);
				var txt = new createjs.Text();
				txt.text = tol[i];
				txt.color = globalOption.axisTick.textColor;
				//刻度文字
				txt.width = 50 / 2;
				txt.height = 30;
				txt.textAlign = 'center';
				//X轴刻度值位置，刻度像素*i + 刻度像素/2 
				txt.x = txt.originalX = lineval * i + lineval / 2 + 12;
				txt.y = 80;
				
				txt.lineWidth = 5;
				txt.lineHeight = 1;
				txtBox.addChild(txt);
			}
			stage.addChild(lineBox);
			stage.addChild(txtBox);
			lineBox.addChild(Yline);
			lineBox.addChild(Xline);
			//初始化柱图
			this.initBar();
			stage.update();
		}
	function Setcolor(){
		return "#f90";
	}
	//初始化柱图
	p.initBar = function(){
		var barArr = [],txtArr = [],rectArr = [];
		barBox = new createjs.Container();
		stage.addChild(barBox);
		barBox.x = barBox.originalX = globalOption.canvasW/2;
		barBox.y = 110;
		var MaxLeft = leftArr.concat().sort(function(a, b){
				return b - a;
		})[0];
		var MaxRight = rightArr.concat().sort(function(a, b){
				return b - a;
		})[0];
		//右边的柱子要往下一个，左右柱子算一份，只有右边算0.5，所以+0.5
		var height = (globalOption.canvasH - 130-globalOption.data.length*2)/((globalOption.data.length+1.5+0.5)*2);
		for (var i = 0; i < globalOption.data.length; i++) {
			//左边柱图数据
			var left_bar = new createjs.Shape();
			var left_scale = leftArr[i]/MaxLeft;
			left_bar.type = "left";
			left_bar.toX = left_scale;
			left_bar.val = leftArr[i];//
			left_bar.graphics.beginFill(globalOption.legend.leftColor).drawRect(0,i*height*2.5,-lineval*5,height);
			left_bar.getRect = {
				x:-lineval*5,
				y:i*height*2.5,
				w:lineval*5,
				h:height
			};
			left_bar.scaleX = 0;
			barBox.addChild(left_bar);
			barArr.push(left_bar);
			//右边柱图
			var right_bar = new createjs.Shape();
			var right_scale = rightArr[i]/MaxRight;
			right_bar.type = "right";
			right_bar.toX = right_scale;
			right_bar.val = rightArr[i];
			right_bar.graphics.beginFill(globalOption.legend.rightColor).drawRect(0,i*height*2.5+height,lineval*5,height);
			right_bar.getRect = {
				x:0,
				y:i*height*2.5+height,
				w:lineval*5,
				h:height
			};
			right_bar.scaleX = 0;
			barBox.addChild(right_bar);
			barArr.push(right_bar);
			//中间矩形
			var rect_center = new createjs.Shape();
			rect_center.graphics.beginFill(globalOption.style.centerColor).drawRect(-10,i*height*2.5-2,20,height*2+4);
			rect_center.left = left_bar;
			rect_center.right = right_bar;
			barBox.addChild(rect_center);
			rectArr.push(rect_center);
			//中间柱图
			var txt = new createjs.Text((i+1),"14px Arial",globalOption.style.textColor);
			txt.textAlign = 'center';
			txt.y = i*height*2.5;
			txt.left = left_bar;
			txt.right = right_bar;
			barBox.addChild(txt);
			txtArr.push(txt);
		};
		//响应式
		this.resize();
		this.initAni(barArr,txtArr,rectArr);
	}
	//入场动画
	p.initAni = function(barArr,txtArr,rectArr){
		for (var i = 0; i < barArr.length; i++) {
			TweenMax.to(barArr[i],0.3,{
				scaleX:barArr[i].toX,
				delay: i*0.04,
				onUpdate:function(){
					stage.update();
				}
			});
		}
		this.initEvent(barArr,txtArr,rectArr);
	}
	//事件
	p.initEvent = function(barArr,txtArr,rectArr){
		var cur = this;
		stage.enableMouseOver(10);
		stage.cursor = 'pointer';
		var Color = {
			left:[new createjs.ColorFilter(0,0,0,1,globalOption.style.leftColor.r,globalOption.style.leftColor.g,globalOption.style.leftColor.b,globalOption.style.leftColor.a)],
			right:[new createjs.ColorFilter(0,0,0,1,globalOption.style.rightColor.r,globalOption.style.rightColor.g,globalOption.style.rightColor.b,globalOption.style.rightColor.a)]
		}
		function Highlight(obj,flag){
				obj.left.filters = flag==true ? Color["left"] : null;
				obj.left.cache(obj.left.getRect.x,obj.left.getRect.y,
				obj.left.getRect.w,obj.left.getRect.h);
				obj.right.filters = flag==true ? Color["right"] : null;
				obj.right.cache(obj.right.getRect.x,obj.right.getRect.y,
				obj.right.getRect.w,obj.right.getRect.h);
				stage.update();
		}
		for (var i = 0; i < barArr.length; i++) {
			barArr[i].on('mouseover',function(e){
				this.filters = Color[this.type];
				this.cache(this.getRect.x,this.getRect.y,
				this.getRect.w,this.getRect.h);
				stage.update();
			});
			barArr[i].on('mouseout',function(e){
				this.filters = null;
				this.cache(this.getRect.x,this.getRect.y,
				this.getRect.w,this.getRect.h);
				stage.update();
			});
		};
		for (var i = 0; i < txtArr.length; i++) {
			txtArr[i].on('mouseover',function(e){
				Highlight(this,true);
			});
			txtArr[i].on('mouseout',function(e){
				Highlight(this,false);
			});
		}
		for (var i = 0; i < rectArr.length; i++) {
			rectArr[i].on('mouseover',function(e){
				Highlight(this,true);
			});
			rectArr[i].on('mouseout',function(e){
				Highlight(this,false);
			});
		}
		
	}
	p.resize = function(){
		$(window).on("resize",function(){
			newCanvas.width = globalOption.boxElement.offsetWidth;
			newCanvas.height = globalOption.boxElement.offsetHeight;
			var scaleX =globalOption.boxElement.offsetWidth/globalOption.canvasW;
			var scaleY =globalOption.boxElement.offsetHeight/globalOption.canvasH;
			console.log(globalOption.boxElement.offsetWidth)
			barBox.scaleX = scaleX;
			barBox.x = barBox.originalX*scaleX;
			barBox.scaleY = scaleY;
			lineBox.scaleX = scaleX;
			for (var i = 0; i < txtBox.children.length; i++) {
				txtBox.children[i].x = txtBox.children[i].originalX * scaleX;
				stage.update();
			}
		});
	}
		//图例
	p.initTips = function() {
		//创建图例容器
		var container = new createjs.Container();
		//创建图例文字
		var title = new createjs.Text(globalOption.legend.title, "14px Arial",globalOption.legend.color);
		title.x = 10;
		title.y = 10;
		container.addChild(title);

		//创建左边矩形和文字
		var rect1 = new createjs.Shape();
		rect1.graphics.beginFill(globalOption.legend.leftColor).drawRect(0, 0, 40, 15);
		rect1.x = 10;
		rect1.y = 30;
		container.addChild(rect1);
		var left = new createjs.Text(globalOption.legend.leftText, "14px Arial",globalOption.legend.color);
		left.x = 60;
		left.y = 30;
		container.addChild(left);
		//创建右边矩形和文字
		var rect2 = new createjs.Shape();
		rect2.graphics.beginFill(globalOption.legend.rightColor).drawRect(0, 0, 40, 15);
		rect2.x = 10;
		rect2.y = 50;
		container.addChild(rect2);
		var right = new createjs.Text(globalOption.legend.rightText, "14px Arial",globalOption.legend.color);
		right.x = 60;
		right.y = 50;
		container.addChild(right);
		stage.addChild(container);
		stage.update();
		//createjs.Ticker.on("tick", stage);
	};
	//计算步长方法，参数：最大值，最小值(包括0)，要多少个刻度
	p.numlines = function(cormax, cormin, cornumber) {
		
		var tmpmax, tmpmin, corstep, tmpstep, tmpnumber, temp, extranumber;
		if(cormax <= cormin)
			return;
		corstep = (cormax - cormin) / cornumber;
		if(Math.pow(10, parseInt(Math.log(corstep) / Math.log(10))) == corstep) {
			temp = Math.pow(10, parseInt(Math.log(corstep) / Math.log(10)));
		} else {
			temp = Math.pow(10, (parseInt(Math.log(corstep) / Math.log(10)) + 1));
		}
		tmpstep = (corstep / temp).toFixed(6);
		//选取规范步长
		if(tmpstep >= 0 && tmpstep <= 0.1) {
			tmpstep = 0.1;
		} else if(tmpstep >= 0.100001 && tmpstep <= 0.2) {
			tmpstep = 0.2;
		} else if(tmpstep >= 0.200001 && tmpstep <= 0.25) {
			tmpstep = 0.25;
		} else if(tmpstep >= 0.250001 && tmpstep <= 0.5) {
			tmpstep = 0.5
		} else {
			tmpstep = 1;
		}
		tmpstep = tmpstep * temp;
		if(parseInt(cormin / tmpstep) != (cormin / tmpstep)) {
			if(cormin < 0) {
				cormin = (-1) * Math.ceil(Math.abs(cormin / tmpstep)) * tmpstep;
			} else {
				cormin = parseInt(Math.abs(cormin / tmpstep)) * tmpstep;
			}
		}
		if(parseInt(cormax / tmpstep) != (cormax / tmpstep)) {
			cormax = parseInt(cormax / tmpstep + 1) * tmpstep;
		}
		tmpnumber = (cormax - cormin) / tmpstep;
		if(tmpnumber < cornumber) {
			extranumber = cornumber - tmpnumber;
			tmpnumber = cornumber;
			if(extranumber % 2 == 0) {
				cormax = cormax + tmpstep * parseInt(extranumber / 2);
			} else {
				cormax = cormax + tmpstep * parseInt(extranumber / 2 + 1);
			}
			cormin = cormin - tmpstep * parseInt(extranumber / 2);
		}
		cornumber = tmpnumber;
		//最大值，最小值，个数，步长
 		//return [cormax, cormin, cornumber, tmpstep];
		return tmpstep;
	}
	Widget.barline = barline;
})();