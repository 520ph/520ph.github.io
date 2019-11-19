function $(s){
	return document.querySelectorAll(s);
}

//定义AJAX
var xhr = new XMLHttpRequest();
//定义AudioContext
try {
    var ac = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext)();
} catch (e) {
    alert('你的浏览器不支持AudioContext对象');
}
var gainNode = ac[ac.createGain?"createGain":"creatGainNode"]();
gainNode.connect(ac.destination);
var source = null;
var s_count = 0;
var analyser = ac.createAnalyser();//音频的分析对象
var size = 128;
analyser.fftSize = size * 2;
analyser.connect(gainNode);

//获得canvas的容易并改变大小
var box = $("#box")[0];
var height,width;
var canvas = document.createElement("canvas");
canvas.id = "canvas";
var ctx = canvas.getContext("2d");
box.appendChild(canvas);
function resize(){
	height = box.clientHeight;
	width = box.clientWidth;
	canvas.height = height;
	canvas.width = width;
	var line = ctx.createLinearGradient(0,0,0,height);
	line.addColorStop(0,"#F500FF");
	line.addColorStop(0.5,"#A200FF");
	line.addColorStop(1,"#FF001E");
	ctx.fillStyle = line;
}
resize();
window.onresize = resize;

//绘制频谱
function draw(arr){
	ctx.clearRect(0,0,width,height);
	var w = width/size*1.5;
	for (var i = 0; i < size; i++) {
		var h = arr[i] / 256 * height;
		ctx.fillRect(w*i,height-h,w*0.6,h);
	}
}


function load(url){
	var n = ++s_count;
	source && source[source.stop?"stop":"noteOff"]();
	xhr.abort();
	xhr.open("GET",url);
	xhr.responseType = "arraybuffer";
	xhr.onload = function(){
		if(n!=s_count)return;
		//用ac对象解码数据
		ac.decodeAudioData(xhr.response,function(buffer){//解码成功则调用此函数，参数buffer为解码后得到的结果
			if(n!=s_count)return;
			var bufferSouce = ac.createBufferSource();//创建bufferSouce对象
			bufferSouce.buffer = buffer;//把结果赋值给创建bufferSouce对象的buffer属性(此为音频数据)
			bufferSouce.connect(analyser);
			//bufferSouce.connect(gainNode);
			//bufferSouce.connect(ac.destination);//用bufferSouce对象连接到AudioContext对象的destination节点,必须连接
			bufferSouce[bufferSouce.start?"start":"noteOn"](0);
			source = bufferSouce;
		},function(err){
			//这个是解码失败会调用的函数
			console.log("!哎玛，文件解码失败:"+err);
		})
	}
	xhr.send();
}
//获取音乐信息
function visualizer(){
	var arr = new Uint8Array(analyser.frequencyBinCount);
	requestAnimationFrame = window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame;
	function v(){
		analyser.getByteFrequencyData(arr);
		requestAnimationFrame(v);
		draw(arr);
	}
	requestAnimationFrame(v);
}
visualizer();
//获取音乐
var audiolist = $(".getms");
for (var i = 0; i < audiolist.length; i++) {
	audiolist[i].onclick = function(){
	ctx.clearRect(0,0,width,height);
	console.log($("#canvas"));
		load("mp3/"+this.title);
	}
}
//设置音量
$("#Volume")[0].oninput = function(){
	var value = this.value/this.max;
	gainNode.gain.value = value*value;
	
}
