this.Widget = this.Widget||{};
(function(){
	/**
	 * 初始化{}组件
	 * @param {Object组件容器选择符，同css选择符} boxElement
	 */
	function Sector(boxElement){
		//canvas
		this.canvas = document.createElement("canvas");
		//组件容器
		this.boxElement = document.querySelector(boxElement);
		//组件配置参数
		this.config = null;
		//组件数据
		this.dataProvider = null;
		//组件通信事件触发器
		this.EventDispatcher = $({});		
		//显示对象地图
		this.nodeMap = null;
        this.boxElement.appendChild(this.canvas);
        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(10);
        this.stage.cursor = "pointer";
        createjs.Touch.enable(this.stage);
        createjs.Ticker.on("tick",this.stage);
        //动画
        this.AnimateObj = null;
	};
	var p = Sector.prototype;
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
    	this._layout();
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
    	//总容器
    	nodeMap.containers = new createjs.Container();
    	var cur = this;
    }
    //显示对象布局
    p._layout = function(){
    	var cur = this;
    }
    //事件
    p._events = function(){
    	var cur = this;
    	var argObj = {
			tips:e.target.tips,
			x:e.stageX,
			y:e.stageY
		}
		cur.EventDispatcher.trigger("WIDGET_OVER",argObj);
		cur.EventDispatcher.trigger("WIDGET_OUT");
    }
    //动画
    p._Animate = function(){
    	var cur = this;
    	TweenMax.to(null,1,{
			alpha:1,
			delay:0.1,
			ease:"linear",
			onStartParams:[obj],//开始动画传的参数
			onStart:function(obj){},//开始动画的回调函数，可以接受参数
			onUpdateScope:this,//更新动画的时候作用域
			onUpdateParams:[],//动画更新中
			onUpdate:function(){},
			onCompleteParams:[],//动画结束
			onComplete:function(){}
		});
    }
	this.Widget.template = template;
})();
