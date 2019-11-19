window.onload = function(){
	function $(dom){
		return document.querySelector(dom);
	}
	//设置特殊拐点
	var zxy_ul = $(".zxy_ul");//ul
	var zxy_lis = null;//ul下所有的li
	var sizeGird = Math.floor((window.innerHeight-18)/8);//格子大小
	var size = Math.floor((window.innerHeight-18)/sizeGird);//格子数
	var row = 0;//行
	var col = 0;//列
	var min = 0;
	var max = size - 1;
	function init(){
		creatGrid();
	}
	init();
	function creatGrid(){
		zxy_ul.style.width = size * (sizeGird + 1) + 'px';
		var len = Math.pow(size,2);
		for (var i = 0; i < len; i++) {
			var zxy_li = document.createElement("li");
			zxy_li.style.width = sizeGird + 'px';
			zxy_li.style.height = sizeGird + 'px';
			zxy_li.style.lineHeight = sizeGird + 'px';
			zxy_ul.appendChild(zxy_li);
		}
		zxy_lis = zxy_ul.querySelectorAll("li");
		someNum();
	}
	function someNum(){
		for (var i = 0; i < zxy_lis.length; i++) {
			zxy_lis[row*size+col].innerHTML = i;
			//从左上角开始往右走，行是最小的，列小于最大的列
			if(row == min && col < max){
				col = col + 1; 
			//从右上角开始往下走，行小于最大的行，列是最大的
			}else if(col == max && row < max){
				row = row + 1;
			//从右下角开始往左走，行是最大的行，列大于最小的列
			}else if(row == max && col > min){
				col = col - 1;
			}else if(row > min && col == min){
				row = row - 1;
			};
			//如果行-1是最小的行和列是最小的列，说明到了拐点了。
			//那么，最小的范围就要+1，最大的范围就要-1，就是缩一圈
			if(row - 1 == min && col == min){
				min = min + 1;
				max = max - 1;
			}
			
		}
	}
};
