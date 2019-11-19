this.Widget = this.Widget||{};
(function(){
	/**
	 * 初始化气泡组件
	 * @param {Object组件容器选择符，同css选择符} boxElement
	 */
	function bubble(boxElement){
		//canvas
		this.canvas = document.createElement("canvas");
		//组件容器
		this.boxElement = document.querySelector(boxElement);
		//组件配置参数
		this.config = null;
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.boxW = this.boxElement.offsetWidth;
        this.canvas.height = this.boxH = this.boxElement.offsetHeight;
        this.bbleArr = [];
        this.requestID = null;
        return this;
	};
	var p = bubble.prototype;
	/**
	 * 初始化组件配置
	 * @param {Object组件配置参数} config
	 */
	p.setConfig = function(config){
		this.config = config;
		//this.start();
		this.resize();
		return this;
	}
	p.start = function(){
		if (this.config == null) return;
		this.boxElement.appendChild(this.canvas);
		window.cancelAnimationFrame(this.requestID);
		this.bbleArr.length = 0;
		for(var i = 0; i < this.config.size; i++) {
			this.bbleArr.push({
				gravity:this.rnd(1,10)/100,//重力
				borderWidth:this.config.borderWidth,//气泡边框宽度
				x: this.rnd(0, this.boxW), //点的X坐标
				y: this.boxH+50, //点的Y坐标
				radius:this.rnd(this.config.minRadius,this.config.maxRadius),//气泡半径
				color: Math.random() * 360,//气泡颜色
				alpha: this.config.alpha,//气泡透明度
				speedX: this.rnd(-this.config.speedX,this.config.speedX), //X轴移动的速度，正数和负数，也就是往左往右
				speedY: this.rnd(this.config.speedY, 0) //Y轴移动的速度，负数，也就是往上
			});
		};
		this._createContent();
		return this;
	}
	/**
	 * 返回n-m范围内的随机数
	 * @param {Number} n
	 * @param {Number} m
	 */
	p.rnd = function(n, m){
		return Math.floor(Math.random() * (m - n) + n)
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
    p.resize = function(){
    	var cur = this;
    	window.addEventListener("resize",function(){
    		cur.canvas.width = cur.boxW = cur.boxElement.offsetWidth;
	        cur.canvas.height = cur.boxH = cur.boxElement.offsetHeight;
    	})
    }
    /**
     * 初始化组件显示对象
     */
    p._createContent = function(){
    	if (this.config == null) return;
    	var cur = this;
    	//清除画布
    	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    	//画圆环
		this.bbleArr.forEach(function(circle) {
            cur.context.beginPath();
            cur.context.lineWidth = circle.borderWidth;
            cur.context.arc(circle.x, circle.y, circle.radius,Math.PI * 2,0);
            cur.context.strokeStyle = 'hsla(' + circle.color + ',100%,50%,' + circle.alpha + ')';
            cur.context.stroke();
            cur.context.closePath();
            cur.movecircles(circle);
       	});
       	//创建字体
       	this.context.font=this.config.fontStyle || "20px Arial";
        this.context.fillStyle = this.config.color || "#000";
        this.context.textBaseline="middle";
        this.context.textAlign = "center";
		this.context.fillText(this.config.font || "暂无数据",this.canvas.width/2,this.canvas.height/2);
       	this.requestID = window.requestAnimationFrame(function(){cur._createContent()});
    }
    p.movecircles = function(circle){
   		circle.x += circle.speedX;
        circle.speedY -= circle.gravity;
        circle.y += circle.speedY;
        //circle.alpha -= 0.008;
        if(circle.y<=0){
        	circle.x = this.rnd(0, this.boxW);//X轴坐标
        	circle.y = this.boxH+circle.radius;//Y轴坐标
        	circle.speedY = this.rnd(-5, 0);//Y轴速度
        	circle.radius = this.rnd(10,50);//气泡半径
        	circle.color = Math.random() * 360;//气泡颜色
        	//circle.alpha = 0.6;//透明度
        	circle.gravity = this.rnd(1,10)/100;
        }
    }
    //销毁
    p.destroy = function(){
    	window.cancelAnimationFrame(this.requestID);
    	this.canvas.remove();
    }
    //显示对象布局
    p._layout = function(){
    	
    }
    //事件
    p._events = function(){
    	var cur = this;
    }
    //动画
    p._Animate = function(){
    	var cur = this;
    	
    }
	this.Widget.bubble = bubble;
})();
