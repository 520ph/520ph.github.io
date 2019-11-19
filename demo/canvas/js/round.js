this.Widget = this.Widget||{};
(function(){
	/**
	 * 初始化圆环组件
	 * @param {Object组件容器选择符，同css选择符} boxElement
	 */
	function round(boxElement){
		//canvas
		this.canvas = document.createElement("canvas");
		//组件容器
		this.boxElement = document.querySelector(boxElement);
		//组件配置参数
		this.config = null;
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.boxW = this.boxElement.offsetWidth;
        this.canvas.height = this.boxH = this.boxElement.offsetHeight;
        this.timer = {
        	time:0
        };
        this.times = 0;
        this.resize();
        return this;
	};
	var p = round.prototype;
	/**
	 * 初始化组件配置
	 * @param {Object组件配置参数} config
	 */
	p.setConfig = function(config){
		this.config = config;
		return this;
	}
	p.start = function(){
		if (this.config == null) return;
		this.boxElement.appendChild(this.canvas);
		this.times = this.config.time;
		this._createContent();
		return this;
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
	        cur.times = 0;
	        cur._createContent();
    	})
    }
    /**
     * 初始化组件显示对象
     */
    p._createContent = function(){
    	if (this.config == null) return;
    	var cur = this;
    	//清除画布
    	//this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    	this.context.lineWidth = this.config.lineWidth || 10;
		this.context.lineCap = this.config.lineCap || "round";
		this.context.strokeStyle = this.config.strokeStyle || "red" ;
    	this.context.translate(this.canvas.width/2,this.canvas.height/2);
    	//创建字体
       	this.context.font=this.config.fontStyle || "20px Arial";
        this.context.fillStyle = this.config.color || "#000";
        this.context.textBaseline="middle";
        this.context.textAlign = "center";
		TweenMax.to(this.timer,this.times,{
			time:1,
			ease:Bounce.easeOut,
			onUpdateScope:this,
			onUpdate:function(){
				this.context.clearRect(-this.canvas.width/2,-this.canvas.height/2,this.canvas.width,this.canvas.height);
				this.context.beginPath();
    			this.context.arc(0,0,this.config.radius || this.canvas.width/2-25,(Math.PI*-0.5),Math.PI*(this.config.per*this.timer.time/100*2)-(Math.PI*0.5));
    			this.context.stroke();
    			//var width = this.context.measureText(Math.floor(this.config.per*this.timer.time)+this.config.unit || "%").width;
    			//var height = Number(this.config.fontStyle.slice(0,2));
    			//this.context.clearRect(-width/2,-height/2,width,height);
    			this.context.fillText(this.config.per ? (Math.floor(this.config.per*this.timer.time)+this.config.unit || "%") : "暂无数据",0,0);
			}
		});
    }
    p.movecircles = function(circle){
   		
    }
    //销毁
    p.destroy = function(){
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
	this.Widget.round = round;
})();