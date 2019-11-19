window.onload=function(){
	var num1=document.getElementById('cont_num');
	var pre=document.getElementById('a3');
	var next=document.getElementById('a4');
	var desc=document.getElementById('cont_desc');
	var cont1=document.getElementById('cont');
	//因为图片地址是直接给标签加的，所以相对的是整个页面，不需要加../
	var arrurl=['imgs/1.jpg','imgs/2.jpg','imgs/3.jpg','imgs/4.jpg','imgs/5.jpg'];
	var arrnam=['申成禄','yangyang','lkds','bjkdl','njoidfnkjnjd'];
	var num=0;
	next.onclick=function(){
		num++;//第几张图片
		if(num > arrurl.length-1){
			//如果num和图片数组的长度一样，那么就是最后一张继续往后了，那么就要变成0，回到第一张
			num = 0;
		}
		num1.innerHTML=num+1+'/'+arrurl.length;
		cont1.style.backgroundImage="url("+arrurl[num]+")";
		desc.innerHTML=arrnam[num];
	};
	pre.onclick=function(){
		num--;//第几张图片
		if(num < 0){
			//如果num小于0，那么就是第一张继续往前了，那么就要变成最后一张，然而数组长度和下标的计算方式不一样，所以要-1
			num = arrurl.length-1;
		}
		num1.innerHTML=num+1+'/'+arrurl.length;
		cont1.style.backgroundImage="url("+arrurl[num]+")";
		desc.innerHTML=arrnam[num];
	};

};