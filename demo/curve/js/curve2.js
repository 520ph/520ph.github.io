this.Widget = this.Widget||{};
(function(){
	/**
	 * 初始化曲线组件
	 * @param {Object组件容器选择符，同css选择符} boxElement
	 */
	function curve(boxElement){
		this.canvas = document.createElement("canvas");
		this.boxElement = document.querySelector(boxElement);
		this.config = null;
		this.dataProvider = null;
		this.EventDispatcher = $({});		//	组件通信事件触发器
		this.nodeMap = null;
        this.boxElement.appendChild(this.canvas);
        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(10);
        this.stage.cursor = "pointer";
        createjs.Touch.enable(this.stage);
        createjs.Ticker.on("tick",this.stage);
        this.AnimateObj = null;
	};
	var p = curve.prototype;
	/**
	 * 初始化组件配置
	 * @param {Object组件配置参数} config
	 */
	p.setConfig = function(config){
		this.config = config;
	}
	/**
	 * 数据发生改变时，需要重新创建元素
	 * @param {Object组件数据} data
	 */
	p.setDataProvider = function(data){
		this.dataProvider = data;
		//初始化组件显示对象
		this._createContent();
	}
	/**
     * 初始化组件尺寸或resize时调用
     * @param size 最新尺寸：{width: 100, height: 100}
     */
    p.resize = function(size)
    {
    	this.canvas.width = size.width;
    	this.canvas.height = size.height;
    }
    /**
     * 初始化组件显示对象
     */
    p._createContent = function(){
    	if (this.config == null || this.dataProvider == null) return;
    	//每次都清空显示对象列表
    	//引用给nodeMap，每次this.nodeMap太麻烦了
    	var nodeMap = this.nodeMap = {};
    	this.AnimateObj = null;
    	var Space = this.dataProvider.bottomNodeArr[0][this.config.bottomName].length*this.config.fontStyle.slice(0,2)/2;
    	this.stage.removeAllChildren();
    	nodeMap.container1 = new createjs.Container();
    	nodeMap.topNodeCon = new createjs.Container();
    	nodeMap.bottomNodeCon = new createjs.Container();
    	nodeMap.lineNodeCon = new createjs.Container();
    	nodeMap.topName = new createjs.Container();
    	nodeMap.bottomName = new createjs.Container();
    	this.stage.addChild(nodeMap.container1);
    	nodeMap.container1.addChild(nodeMap.topNodeCon);
    	nodeMap.container1.addChild(nodeMap.bottomNodeCon);
    	nodeMap.container1.addChild(nodeMap.lineNodeCon);
    	nodeMap.container1.addChild(nodeMap.topName);
    	nodeMap.container1.addChild(nodeMap.bottomName);
    	nodeMap.topNodeCon.x = nodeMap.bottomNodeCon.x = nodeMap.topName.x = nodeMap.bottomName.x = Space;
    	var spacingTop = (this.canvas.width - nodeMap.topNodeCon.x - Space)/this.dataProvider.topNodeArr.length;
    	for (var i = 0; i < this.dataProvider.topNodeArr.length; i++) {
    		var circle = new createjs.Shape();
    		var color = this.config.circleColor;
    		var radius = this.config.radius;
    		if(i%this.config.Highlightsize==0){
    			color = this.config.topHighlightcircleColor;
    			radius = this.config.Highlightradius;
    			var textTop = new createjs.Text(this.dataProvider.topNodeArr[i][this.config.topName],this.config.fontStyle,this.config.fontColor);
    			textTop.x = i*spacingTop-radius;
    			textTop.y = this.config.top-radius*2.5;
    			textTop.rotation = this.config.fontdeg;
    			nodeMap.topName.addChild(textTop);
    		}
    		circle.type = "circle";
    		circle.name = this.dataProvider.topNodeArr[i][this.config.topName];
    		circle.x = i*spacingTop;
    		circle.y = this.config.top;
    		circle.lineArr = [];
    		circle.graphics.beginFill(color).drawCircle(0,0,radius);
    		nodeMap.topNodeCon.addChild(circle);
    		this.stage.update();
    	}
    	var spacingBottom = (this.canvas.width - nodeMap.bottomNodeCon.x - Space)/this.dataProvider.bottomNodeArr.length;
    	for (var i = 0; i < this.dataProvider.bottomNodeArr.length; i++) {
    		this.dataProvider.bottomNodeArr[i]
    		var circle = new createjs.Shape();
    		var color = this.config.circleColor;
    		var radius = this.config.radius;
    		if(i%this.config.Highlightsize==0){
    			color = this.config.bottomHighlightcircleColor;
    			radius = this.config.Highlightradius;
    			var textTop = new createjs.Text(this.dataProvider.bottomNodeArr[i][this.config.bottomName],this.config.fontStyle,this.config.fontColor);
    			textTop.x = i*spacingBottom;
    			textTop.y = this.canvas.height-this.config.bottom+radius;
    			textTop.regX = Space;
    			textTop.rotation = this.config.fontdeg;
    			nodeMap.bottomName.addChild(textTop);
    		}
    		circle.type = "circle";
    		circle.name = this.dataProvider.bottomNodeArr[i][this.config.bottomName];
    		circle.x = i*spacingBottom;
    		circle.y = this.canvas.height-this.config.bottom;
    		circle.lineArr = [];
    		circle.graphics.beginFill(color).drawCircle(0,0,radius);
    		nodeMap.bottomNodeCon.addChild(circle);
    	}
    	var tos = this.dataProvider.to;
    	var colorIndex = 0;
    	for(var key in tos){
    		var bottomNode = nodeMap.bottomNodeCon.getChildByName(key);
    		var nodeArr = tos[key];
    		var y1 = (this.canvas.height-this.config.top)*0.75*random(8,10)/10;
    		var ytop = (this.canvas.height-this.config.top)*this.config.topline*random(5,10)/10+this.config.top;
    		var ybottom = (this.canvas.height-this.config.bottom)-(this.canvas.height-this.config.bottom)*this.config.bottomline*random(5,10)/10;
			var y2 = this.canvas.height - y1;
    		for (var i = 0; i < nodeArr.to.length; i++) {
    			var topNode = nodeMap.topNodeCon.getChildByName(nodeArr.to[i][this.config.topName]);
    			var line = new createjs.Shape();
    			line.name = "line";
    			line.tips = nodeArr.to[i];
    			nodeMap.lineNodeCon.addChild(line);
    			bottomNode.lineArr.push(line);
    			line.graphics
						.setStrokeStyle(2)
						.beginStroke(this.config.colorArr[colorIndex])
						.moveTo(bottomNode.x+nodeMap.bottomNodeCon.x,bottomNode.y-this.config.radius)
						.lineTo(bottomNode.x+nodeMap.bottomNodeCon.x,ybottom);
				line.bezierCurveToPath = {
					"x0":bottomNode.x+nodeMap.bottomNodeCon.x,
					"y0":ybottom,
					"x1":bottomNode.x+nodeMap.bottomNodeCon.x,
					"y1":y2,
					"x2":topNode.x+nodeMap.topNodeCon.x,
					"y2":y1,
					"x3":topNode.x+nodeMap.topNodeCon.x,
					"y3":ytop
				};
				line.endline = {
					"x":topNode.x+nodeMap.topNodeCon.x,
					"y":topNode.y+this.config.radius
				}
						/*.bezierCurveTo(
							bottomNode.x+nodeMap.bottomNodeCon.x,
							y2,
							topNode.x+nodeMap.topNodeCon.x,
							y1,
							topNode.x+nodeMap.topNodeCon.x,
							ytop)
						.lineTo(topNode.x+nodeMap.topNodeCon.x,topNode.y+this.config.radius);*/
					nodeMap.lineNodeCon.addChild(line);
					topNode.lineArr.push(line);
    		}
    		colorIndex++;
    		if(colorIndex==this.config.colorArr.length){
    			colorIndex = 0;
    		}
    	}
    	this.stage.on("stagemousedown",mouseoutNode);
    	nodeMap.topNodeCon.on("click",mouseoverNode);
    	nodeMap.bottomNodeCon.on("click",mouseoverNode);
    	nodeMap.lineNodeCon.on("mouseover",mouseoverline);
    	nodeMap.lineNodeCon.on("mouseout",mouseoutline);
    	var cur = this;
    	//鼠标移入
    	function mouseoverNode(e){
    		for (var i = 0; i < nodeMap.lineNodeCon.children.length; i++) {
				nodeMap.lineNodeCon.children[i].alpha = 0.2;
			};
			for (var i = 0; i < e.target.lineArr.length; i++) {
				e.target.lineArr[i].alpha = 1;
			}
			e.stopPropagation();
    	}
    	//鼠标移出
    	function mouseoutNode(e){
    		for (var i = 0; i < nodeMap.lineNodeCon.children.length; i++) {
				nodeMap.lineNodeCon.children[i].alpha = 1;
			};
    	}
    	function mouseoverline(e){
    		var argObj = {
    			tips:e.target.tips,
    			x:e.stageX,
    			y:e.stageY
    		}
    		cur.EventDispatcher.trigger("WIDGET_OVER",argObj);
    	};
    	function mouseoutline(e){
    		cur.EventDispatcher.trigger("WIDGET_OUT");
    	};
    	function random(min,max){
	    	return Math.floor(Math.random()*(max-min+1)+min);
	    }
    	this.Animate();
    }
    p.Animate = function(){
    	function Point2D(x,y){  
		    this.x=x||0.0;  
		    this.y=y||0.0;  
		} 
    	function PointOnCubicBezier( cp, t ){  
		    var ax, bx, cx;  
		    var ay, by, cy;  
		    var tSquared, tCubed;
		    var result = new Point2D();  
		    /*计算各项系数*/  
		    cx = 3.0 * (cp[1].x - cp[0].x);  
		    bx = 3.0 * (cp[2].x - cp[1].x) - cx;  
		    ax = cp[3].x - cp[0].x - cx - bx;  
		  
		    cy = 3.0 * (cp[1].y - cp[0].y);  
		    by = 3.0 * (cp[2].y - cp[1].y) - cy;  
		    ay = cp[3].y - cp[0].y - cy - by;  
		  
		    tSquared = t * t;  
		    tCubed = tSquared * t;  
		  
		    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;  
		    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;  
		  
		    return result;  
		}  
  		//计算点的位置
	  	function ComputeBezier( cp, numberOfPoints, curve ){  
		    var dt;  
		    var i;  
		    dt = 1.0 / ( numberOfPoints - 1 );  
		    for( i = 0; i < numberOfPoints; i++){
		        curve[i] = PointOnCubicBezier( cp, i*dt );  
	       	}
		}  
		var numberOfPoints=100; 
		for (var i = 0; i < this.nodeMap.lineNodeCon.children.length; i++) {
			var lineNode = this.nodeMap.lineNodeCon.children[i];
			var bezierCurveToPath = lineNode.bezierCurveToPath;
			var cp=[  
				new Point2D(bezierCurveToPath.x0,bezierCurveToPath.y0),
			    new Point2D(bezierCurveToPath.x1,bezierCurveToPath.y1),
			    new Point2D(bezierCurveToPath.x2,bezierCurveToPath.y2),
			    new Point2D(bezierCurveToPath.x3,bezierCurveToPath.y3)
			];
			lineNode.curve=[];
			ComputeBezier(cp,numberOfPoints,lineNode.curve);  
			lineNode.time = 0;
			this.AnimateObj = TweenMax.to(lineNode,2,{
				time:lineNode.curve.length,
				onUpdateScope:this,
				onUpdateParams:[lineNode],
				onUpdate:function(line){
					var j = Math.floor(line.time)-1;  
			    	line.graphics.lineTo(line.curve[j].x,line.curve[j].y);
				},
				onCompleteParams:[lineNode],
				onComplete:function(line){
					line.endtime = 0;
					var bezierCurveToPath = line.bezierCurveToPath;
					TweenMax.to(line,0.1,{
						endtime:1,
						onUpdateScope:this,
						onUpdateParams:[line],
						onUpdate:function(line){
					    	line.graphics.lineTo(
					    		bezierCurveToPath.x3+(line.endline.x - bezierCurveToPath.x3)*line.endtime,
					    		bezierCurveToPath.y3+(line.endline.y - bezierCurveToPath.y3)*line.endtime
					    	);
						},
					});
				}
			});
		}
    }
	this.Widget.curve = curve;
})();
