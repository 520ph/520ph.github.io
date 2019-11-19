let canvas = document.querySelector('#canvas');
let stage = new createjs.Stage(canvas);
let input = document.querySelector('.count');
let count = 10;
let btn = document.querySelector('.btn');
btn.onclick = () =>　{
     count = Number(input.value);
}
let listener = createjs.Ticker.on('tick',stage);
resize();
function randNum(minnum , maxnum){
    return Math.floor(minnum + Math.random() * (maxnum - minnum));
}
function data(n = count ? count : 15){
    let newArr = [];
    let keys = Object.keys(geoCoordMap);
    for (let i = 0; i < n; i++) {
        let source = trans(keys[randNum(0,keys.length)]);
        let target = trans(keys[randNum(0,keys.length)]);
        // let source = trans(keys[90]);
        // let target = trans(keys[210]);
        newArr.push([source,target]);
    }
    return newArr;
}

function trans(e1){
    if(e1[0] < -30){
        e1[0] += 160
    }else{
        e1[0] -= 200
    }
    return e1;
}


let timer = setInterval(() => {
    start(data());
},3000);

let defImg = new Image();
defImg.src = "data:image/png;base64,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";
function colorRgb(color) {
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	var sColor = color.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = "#";
			for ( var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(
						sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		// 处理六位的颜色值
		var sColorChange = [];
		for ( var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		return sColorChange;
	} else {
		return sColor;
	}
}
//循环数据创建圆圈和线
let colors = [
    {
        color:'#ffcc00',
        gradColor:['#ffcc00','rgba(255, 255, 255, 0)']
    },
    {
        color:'#52acdb',
        gradColor:['#52acdb','rgba(255, 255, 255, 0)']
    },
    {
        color:'#5276db',
        gradColor:['#5276db','rgba(255, 255, 255, 0)']
    },
    {
        color:'#9952db',
        gradColor:['#9952db','rgba(255, 255, 255, 0)']
    },
    {
        color:'#db52d3',
        gradColor:['#db52d3','rgba(255, 255, 255, 0)']
    },
    {
        color:'#52dbcc',
        gradColor:['#52dbcc','rgba(255, 255, 255, 0)']
    },
    {
        color:'#5652db',
        gradColor:['#5652db','rgba(255, 255, 255, 0)']
    },
    {
        color:'#db9952',
        gradColor:['#db9952','rgba(255, 255, 255, 0)']
    }
];
colors.map(function(item){
    let rgb = colorRgb(item.color),
        r = rgb[0],
        g = rgb[1],
        b = rgb[2],
        a = 0.7;
    return Object.assign(item,{
        point:tranColor(r,g,b,a)
    });
});

function tranColor(r,g,b,a){
    let imgCanvas = document.createElement("canvas");
    imgCanvas.width = 80;
    imgCanvas.height = 80;
    let imgCtx = imgCanvas.getContext('2d');
    imgCtx.drawImage(defImg, 0, 0,imgCanvas.width,imgCanvas.height);
    let imgData = imgCtx.getImageData(0, 0,imgCanvas.width, imgCanvas.height);
    let i = imgData.data.length;
    while ((i -= 4) > -1) {
    imgData.data[i + 3] = imgData.data[i] * a;
        if (imgData.data[i + 3]) {
            imgData.data[i] = r;
            imgData.data[i + 1] = g;
            imgData.data[i + 2] = b;
        }
    }
    imgCtx.putImageData(imgData, 0, 0);
    return imgCanvas;
}
//
/**
 * [start description]
 * @param  {[type]} arr [二维数组,[起始点,目的地,起始点x,y坐标,目标点x,y坐标]]
 */
function start (arr,
    {
        long = 3,sourceRadius = 50,
        targetRadius = 50,
        sourceBroderWdith = 3,
        targetBroderWdith = 3,
        lineWidth = 3,
        pointRadius = 0
    } = {}) {
    //运动对象
    let runMap = {
        sArr:[],
        lArr:[],
        tArr:[],
        pArr:[]
    };
    for (let i = 0,len = arr.length; i < len; i++) {
        let item = arr[i];
        //圈和线条的颜色
        //let color = `hsl(${Math.round((i * 360) / len)}, 100%, 50%`;
        let color = colors[i % colors.length];
        //起始点和目的地坐标
        //let coord = [item.sourcePoint,item.targetPoint];
        let coord = [
                        [...coordSys.dataToPoint(geoCoordMap[item[0]])],
                        [...coordSys.dataToPoint(geoCoordMap[item[1]])]
                    ];
        //创建起始点圆圈
        let sourceCircle = new createjs.Shape();
        //起始点坐标定位
        sourceCircle.x = coord[0][0];
        sourceCircle.y = coord[0][1];
        // sourceCircle.graphics.beginStroke('red').setStrokeStyle(sourceBroderWdith).rect(-sourceRadius/2,-sourceRadius/2,sourceRadius,sourceRadius);
        sourceCircle.fillCommand = sourceCircle.graphics.beginStroke(color.color).command;
        sourceCircle.graphics.setStrokeStyle(sourceBroderWdith).arc(0,0,sourceRadius,0,Math.PI * 2);
        stage.addChild(sourceCircle);
        let line = new createjs.Shape();
        //线条x,y差值,分成long份就是线条长度的x,y坐标
        line.pox = (coord[1][0] - coord[0][0])/long;
        line.poy = (coord[1][1] - coord[0][1])/long;
        //线的x,y坐标就是起始点减去线条的长度
        line.x = coord[0][0];
        line.y = coord[0][1];
        //画线
        line.graphics.beginLinearGradientStroke (color.gradColor,[0.7,1],0,0, -line.pox,-line.poy).setStrokeStyle(lineWidth).moveTo(0,0).lineTo(-line.pox,-line.poy);
        let point = new createjs.Bitmap(color.point);
        point.regX = color.point.width/2;
        point.regY = color.point.height/2;
        point.x = coord[0][0];
        point.y = coord[0][1];
        point.globalCompositeOperation = "lighter";
        let shadpwColor = `hsl(${Math.round((i * 360) / len)}, 50%, 90%`;

        stage.addChild(line);
        stage.addChild(point);
        line.enX = point.enX = sourceCircle.enX = coord[1][0];
        line.enY = point.enY = sourceCircle.enY = coord[1][1];
        //缩放为0
        sourceCircle.scaleX = sourceCircle.scaleY = 0;
        line.scaleX = line.scaleY = 0
        runMap.sArr.push(sourceCircle);
        runMap.lArr.push(line);
        runMap.pArr.push(point);
    }
    console.log(runMap,arr);
    run(runMap);
}
function run({sArr,lArr,pArr}){
    let basicTimeline = anime.timeline();
    basicTimeline
    //起始点圈圈动画在0秒开始,放大到2倍并改变透明度,运动时间是1000毫秒,每个延迟100毫秒
    .add({
        targets:sArr,
        scaleX:1,
        scaleY:1,
        alpha:0,
        easing:'easeInOutCirc',
        offset:0,
        duration:1000,
        delay:function(el, i, l) {
            return i * 100;
        }
        //update:() => stage.update()
    })
    //点的动画在1000毫秒开始,移动x,y位置,运动时间是1000毫秒,每个延迟100毫秒
    .add({
        targets:pArr,
        x:el => el.enX,
        y:el => el.enY,
        easing:'linear',
        offset:0,
        duration:1500,
        delay:function(el, i, l) {
            return i * 100;
        }
        //update:() => stage.update()
    })
    //线的动画在1000毫秒开始,移动x,y位置并改变透明度,放大到1倍，运动时间是500毫秒,每个延迟100毫秒
    .add({
        targets:lArr,
        scaleX:1,
        scaleY:1,
        easing:'linear',
        offset:0,
        duration:500,
        delay:function(el, i, l) {
            return i * 100;
        }
    })
    //线的动画在1000毫秒开始,移动x,y位置,运动时间是2000毫秒,每个延迟100毫秒
    .add({
        targets:lArr,
        x:el => el.enX,
        y:el => el.enY,
        easing:'linear',
        offset:0,
        duration:1500,
        delay:function(el, i, l) {
            return i * 100;
        }
        //update:() => stage.update()
    })
    //点的动画在2000毫秒开始,改变透明度,在运动开始改变颜色为白色,运动时间是500毫秒,每个延迟100毫秒
    .add({
        targets:pArr,
        alpha:0,
        easing:'easeInQuad',
        offset:1500,
        duration:500,
        delay:function(el, i, l) {
            return i * 100;
        }
    })
    //线的动画在2500毫秒开始,移动x,y位置并改变透明度,运动时间是500毫秒,每个延迟100毫秒
    .add({
        targets:lArr,
        scaleX:0,
        scaleY:0,
        easing:'easeInQuad',
        offset:1300,
        duration:500,
        delay:function(el, i, l) {
            return i * 100;
        }
    })
    .add({
        targets:sArr,
        scaleX:0,
        scaleY:0,
        x:el => el.enX,
        y:el => el.enY,
        alpha:1,
        easing:'easeInQuad',
        offset:1300,
        duration:1
    })
    //目的点的动画在2500毫秒开始,放大到2倍并改变透明度,运动时间是1000毫秒,每个延迟100毫秒
    .add({
        targets:sArr,
        scaleX:2,
        scaleY:2,
        alpha:0,
        easing:'easeOutQuart',
        offset:1500,
        duration:2000,
        delay:function(el, i, l) {
            return i * 100;
        },
        complete:() => {
            stage.removeChild(...sArr,...lArr,...pArr);
        }
    });
    //stage.update();
}
window.onfocus = () => {
    if(stage.children.length>0){
        stage.removeAllChildren();
    }
    clearInterval(timer);
    listener = createjs.Ticker.on('tick',stage);
    timer = setInterval(() => {
        start(data());
    },3000);
    start(data());
}
window.onblur = () => {
    if(timer){
        createjs.Ticker.off('tick',listener);
        clearInterval(timer);
    }
}
document.addEventListener('dblclick',() => {
    stage.removeAllChildren();
    start(data());
},false);
function resize () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    myChart.resize();
    //resize的时候,seriesModel,coordSys要重新获取
    seriesModel = myChart.getModel().getSeriesByIndex(0);
    coordSys = seriesModel.coordinateSystem;
    if(stage.children.length>0){
        stage.removeAllChildren();
        start(data());
    }
}
start(data());
window.addEventListener('resize',resize,false);
