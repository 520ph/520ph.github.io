window.onload = function(){
	function $(dom){
		return document.querySelector(dom);
	}
	var zxy_ul = $(".zxy_ul");//ul
	var zxy_lis = null;//ul下所有的li
	var sizeGird = Math.floor((window.innerHeight-18)/8);//格子大小
	var queens_num = Math.floor((window.innerHeight-18)/sizeGird);//皇后个数
	var posArr = [];//记录皇后位置
	var posArrAll = [];//记录皇后每次的位置
	function init(){
		createGird();
	};
	init();
	function createGird(){
		//要创建多少个li
		var len = Math.pow(queens_num,2);
		//设置ul的width
		zxy_ul.style.width = queens_num * sizeGird + "px";
		//创建li
		for (var i = 0; i < len; i++) {
			var zxy_li = document.createElement("li");
			zxy_li.style.width = sizeGird + "px";
			zxy_li.style.height = sizeGird + "px";
			zxy_li.index = -1;
			zxy_ul.appendChild(zxy_li);
		};
		//ul下所有的li
		zxy_lis = document.querySelectorAll(".zxy_ul li");
		//记录坐标
		for (var i = 0; i < queens_num; i++) {
			for (var j = 0; j < queens_num; j++) {
				zxy_lis[i*queens_num+j].x = j;//x坐标
				zxy_lis[i*queens_num+j].y = i;//y坐标
			};
		};
		//开始找皇后
		setQueen(0);
		//效果开始
		showImg();
	};
	function setQueen(iQueen){
		if(iQueen == queens_num){
			posArrAll.push(posArr.concat());
			return;
		}
		//循环遍历每一个li作比较
		for (var i = 0; i < queens_num; i++) {
			//如果index==-1那就是还没有皇后的li，可以用来放皇后
			if(zxy_lis[iQueen*queens_num+i].index == -1){
				//把当前的li设置为不能放皇后
				zxy_lis[iQueen*queens_num+i].index = iQueen;
				posArr.push(zxy_lis[iQueen*queens_num+i]);
				var x = zxy_lis[iQueen*queens_num+i].x;
				var y = zxy_lis[iQueen*queens_num+i].y;
				for (var j = 0; j < zxy_lis.length; j++) {
					//把与当前li有关的横竖斜的li都做标记
					if(zxy_lis[j].index == -1 && 
						(zxy_lis[j].x == x || 
						zxy_lis[j].y == y ||
						zxy_lis[j].x - zxy_lis[j].y == x - y ||
						zxy_lis[j].x + zxy_lis[j].y == x + y)
					){
						//做标记
						zxy_lis[j].index = iQueen;
					}
				}
				//递归，找下一个皇后
				setQueen(iQueen+1);
				//回溯
				posArr.pop();
				for (var k = 0; k < zxy_lis.length; k++) {
					if(zxy_lis[k].index == iQueen){
						zxy_lis[k].index = -1;
					};
				};
			};
		};
	};
	//定时运行
	function showImg(){
		change();
		setInterval(change,2000);
	}
	//效果函数
	function change(){
		//设为默认，还原样式
		for (var i = 0; i < zxy_lis.length; i++) {
			zxy_lis[i].style.backgroundImage = "";
			zxy_lis[i].className = "";
		}
		//随机去一组八皇后
		var randomLi = posArrAll[Math.floor(posArrAll.length*Math.random())];
		for (var i = 0; i < randomLi.length; i++) {
			randomLi[i].style.backgroundImage = "url(img/"+Math.floor((Math.random()*11+1))+".jpg)";
			randomLi[i].className = "active";
			randomLi[i].style.animationDelay = -Math.random()*2 + "s";
			randomLi[i].style.webkitAnimationDelay = -Math.random()*2 + "s";
		}
	}
};
