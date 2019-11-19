this.Widget = this.Widget||{};
(function(){
	/**
	 * 初始化滚动组件
	 * @param {Object组件容器选择符，同css选择符} boxElement
	 */
	function roll(boxElement){
		//组件容器
		this.boxElement = document.querySelector(boxElement);
		this.warp = null;
        this.flag = "down";
        //组件配置参数，参数up是从上往下，down是从下往上
        this.config = {
        	"dir":"down"
        };
        this.time = 10;
        return this;
	};
	var p = roll.prototype;
	//配置参数
	p.setConfig = function(config){
		//Object.assign(this.config,config);
		for(var key in config){
			this.config[key] = config[key];
		}
		this.flag = this.config.dir;
		this.warp = document.querySelector(config.warp);
		return this;
	}
	//初始化
	p.init = function(){
		if(!this.config.time || this.config.time==0 || !this.config.warp){
			console.error("请传入时间或者warp参数");
			return false;
		}
		//添加事件
		this._events();
		this.start();
		return this;
	}
	//开始
	p.start = function(){
		//开始之前，先要判断是否满足条件，如果可视区比内容区域小，就自动滚动(size如果存在就加上size的判断条件)
		if((this.warp.clientHeight < this.boxElement.offsetHeight) && (this.config.size ? (this.boxElement.children.length >= this.config.size ? true : false) : true)){
			//定时器任务
			this._timing();
		}
		return this;
	}
    //暂停
    p.stop = function(){
    	//暂停的时候动画清除
    	this.boxElement.style.transition = "none";
		this.boxElement.style.marginTop = 0;
		//清除定时器
		clearInterval(this.boxElement.timer);
		//为了防止新数据来，清除事件
    	return this;
    }
    //事件
    p._events = function(){
    	//因为子级影响父级的BUG，所以使用onmouseenter,mouseleave事件
    	this.boxElement.addEventListener("mouseenter",this.stop.bind(this),false);
		this.boxElement.addEventListener("mouseleave",this._timing.bind(this),false);
		//this.boxElement.addEventListener("transitionend",this._Animate.bind(this),false);
		return this;
    }
    //定时器
    p._timing = function(){
    	clearInterval(this.boxElement.timer);
    	this.boxElement.timer = setInterval(this._task.bind(this),this.config.time);
    }
    //任务
    p._task = function(){
		if(this.flag=="up"){
			//如果是从上往下移动，就是把最后一个元素移动到第一个
			this.boxElement.insertBefore(this.boxElement.children[this.boxElement.children.length-1],this.boxElement.children[0]);
			//因为从上往下移动，所以要先把元素往上移动，并且这个过程是瞬间的，所以去掉过渡
			this.boxElement.style.transition = "none";
			this.time = 10;
	    	//marginTop负数移动上去(元素的内容+padding+border+margin上下边距)，然后执行动画
			//this.boxElement.style.marginTop = -(this.boxElement.children[0].offsetHeight + parseInt(getComputedStyle(this.boxElement.children[0]).marginBottom) + parseInt(getComputedStyle(this.boxElement.children[0]).marginTop)) + "px";
		}else{
			//从下往上移动，是需要一个过渡状态的
			this.boxElement.style.transition = "margin-top 0.5s";
			this.time = 500;
		}	    	
		//marginTop负数移动上去(元素的内容+padding+border+margin上下边距)，然后执行动画
		this.boxElement.style.marginTop = -(this.boxElement.children[0].offsetHeight + parseInt(getComputedStyle(this.boxElement.children[0]).marginBottom) + parseInt(getComputedStyle(this.boxElement.children[0]).marginTop)) + "px";
		setTimeout(this._Animate.bind(this),this.time);
    }
    //动画
    p._Animate = function(){
    	console.log("动画")
    	//从上往下移动是需要过渡的
    	if(this.flag=="up"){
			this.boxElement.style.transition = "margin-top 0.5s";
		}else{
			//从下往上移动之后是瞬间回来，所以清除动画，并且，把多余的那个移动到后面去
			this.boxElement.appendChild(this.boxElement.children[0]);
			this.boxElement.style.transition = "none";
		}
		this.boxElement.style.marginTop = 0;
		//为了防止中途更改参数，用flag做判断，等到这次滚动结束再从config里面读取配置
    	this.flag = this.config.dir;
    	return this;
    }
	this.Widget.roll = roll;
})();