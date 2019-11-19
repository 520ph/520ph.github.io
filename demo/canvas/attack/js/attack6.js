let canvas = document.querySelector('#canvas');
let stage = new createjs.Stage(canvas);
let input = document.querySelector('.count');
let count = 10;
let btn = document.querySelector('.btn');
btn.onclick = () =>　{
     count = Number(input.value);
}
//createjs.Ticker.on('tick',stage);
resize();
function randNum(minnum , maxnum){
    return Math.floor(minnum + Math.random() * (maxnum - minnum));
}
function data(n = count ? count : 15){
    stage.update();
    let newArr = [];
    let keys = Object.keys(geoCoordMap);
    for (let i = 0; i < n; i++) {
        let source = trans(keys[randNum(0,keys.length)]);
        let target = trans(keys[randNum(0,keys.length)]);
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

setTimeout(() => {
    start(data());
},1000);

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

//
/**
 * [start description]
 * @param  {[type]} arr [二维数组,[起始点,目的地,起始点x,y坐标,目标点x,y坐标]]
 */
function start (arr,
    {
        long = 3,sourceRadius = 50,
        targetRadius = 50,
        sourceBroderWdith = 5,
        targetBroderWdith = 5,
        lineWidth = 5,
        pointRadius = 5
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

        sourceCircle.graphics.beginStroke(color.color).setStrokeStyle(sourceBroderWdith).arc(0,0,sourceRadius,0,Math.PI * 2);

        stage.addChild(sourceCircle);
        let line = new createjs.Shape();
        //线条x,y差值,分成long份就是线条长度的x,y坐标
        line.pox = (coord[1][0] - coord[0][0])/long;
        line.poy = (coord[1][1] - coord[0][1])/long;
        //线的x,y坐标就是起始点减去线条的长度
        line.x = coord[0][0];
        line.y = coord[0][1];
        //画线
        line.graphics.beginLinearGradientStroke (color.gradColor,[0.5,1],0,0, -line.pox,-line.poy).setStrokeStyle(lineWidth).moveTo(0,0).lineTo(-line.pox,-line.poy);
        //线的遮罩
        let rect = new createjs.Shape();
        //遮罩层x,y,width,height
        rect.position = {
            x:Math.min(coord[0][0],coord[1][0]),
            y:Math.min(coord[0][1],coord[1][1]),
            width:Math.abs(coord[0][0] - coord[1][0]),
            height:Math.abs(coord[0][1] - coord[1][1])
        };
        rect.graphics.rect(rect.position.x,rect.position.y,rect.position.width,rect.position.height).closePath();
        //线的遮罩
        //line.mask = rect;

        let point = new createjs.Shape();
        point.fillCommand = point.graphics.beginFill(color.color).command;
        point.graphics.arc(0, 0,pointRadius,0,Math.PI * 2);
        point.x = coord[0][0];
        point.y = coord[0][1];
        let shadpwColor = `hsl(${Math.round((i * 360) / len)}, 50%, 90%`;
        point.shadow = new createjs.Shadow(shadpwColor, 0, 0, 50);
        stage.addChild(point);
        stage.addChild(line);
        line.enX = point.enX = coord[1][0];
        line.enY = point.enY = coord[1][1];
        line.scaleX = line.scaleY = 0;
        //目的点圆圈
        let targetCircle = new createjs.Shape();
        targetCircle.x = coord[1][0];
        targetCircle.y = coord[1][1];
        targetCircle.graphics.beginStroke('#d32c25').setStrokeStyle(targetBroderWdith).arc(0,0,targetRadius,0,Math.PI * 2);
        stage.addChild(targetCircle);
        sourceCircle.scaleX = sourceCircle.scaleY = 0;
        targetCircle.scaleX = targetCircle.scaleY = 0;
        //stage.update();
        runMap.sArr.push(sourceCircle);
        runMap.lArr.push(line);
        runMap.tArr.push(targetCircle);
        runMap.pArr.push(point);
    }
    run(runMap);
}
function run({sArr,lArr,tArr,pArr}){
    let basicTimeline = anime.timeline();
    basicTimeline
    //起始点圈圈动画在0秒开始,放大到2倍并改变透明度,运动时间是1000毫秒,每个延迟100毫秒
    .add({
        targets:sArr,
        scaleX:1,
        scaleY:1,
        alpha:0,
        easing:'easeInOutQuart',
        offset:0,
        duration:1000,
        delay:function(el, i, l) {
            return i * 100;
        },
        update:() => stage.update()
    })
    //点的动画在1000毫秒开始,移动x,y位置,运动时间是1000毫秒,每个延迟100毫秒
    .add({
        targets:pArr,
        x:el => el.enX,
        y:el => el.enY,
        easing:'easeInSine',
        offset:0,
        duration:2000,
        delay:function(el, i, l) {
            return i * 100;
        },
        update:() => stage.update()
    })
    //线的动画在1000毫秒开始,移动x,y位置并改变透明度,放大到1倍，运动时间是500毫秒,每个延迟100毫秒
    .add({
        targets:lArr,
        scaleX:1,
        scaleY:1,
        easing:'easeInSine',
        offset:100,
        duration:1000,
        delay:function(el, i, l) {
            return i * 100;
        },
        update:() => stage.update()
    })
    //线的动画在1000毫秒开始,移动x,y位置,运动时间是2000毫秒,每个延迟100毫秒
    .add({
        targets:lArr,
        x:el => el.enX,
        y:el => el.enY,
        easing:'easeInSine',
        offset:0,
        duration:2000,
        delay:function(el, i, l) {
            return i * 100;
        },
        update:() => stage.update()
    })
    //点的动画在2000毫秒开始,改变透明度,在运动开始改变颜色为白色,运动时间是500毫秒,每个延迟100毫秒
    .add({
        targets:pArr,
        alpha:0,
        /*begin:(anim) => {
            anim.animatables.forEach((item) => {
                item.target.fillCommand.style = '#fff';
            });
        },*/
        easing:'easeInQuad',
        offset:2000,
        duration:500,
        delay:function(el, i, l) {
            return i * 100;
        },
        update:() => stage.update()
    })
    //线的动画在2500毫秒开始,移动x,y位置并改变透明度,运动时间是500毫秒,每个延迟100毫秒
    .add({
        targets:lArr,
        scaleX:0,
        scaleY:0,
        easing:'easeInQuad',
        offset:1800,
        duration:500,
        delay:function(el, i, l) {
            return i * 100;
        },
        update:() => stage.update()
    })
    //目的点的动画在2500毫秒开始,放大到2倍并改变透明度,运动时间是1000毫秒,每个延迟100毫秒
    .add({
        targets:tArr,
        scaleX:2,
        scaleY:2,
        alpha:0,
        easing:'easeOutQuart',
        offset:2000,
        duration:2000,
        delay:function(el, i, l) {
            return i * 100;
        },
        update:() => stage.update(),
        complete:() => {
            //console.log([...sArr]);
            stage.removeChild(...sArr,...lArr,...tArr,...pArr);
            stage.update();
        }
    });
    stage.update();
}
window.onfocus = () => {
    if(stage.children.length>0){
        stage.removeAllChildren();
        stage.update();
    }
    if(timer){
        timer = setInterval(() => {
            start(data());
        },3000);
    }
    start(data());
}
window.onblur = () => {
    if(timer){
        clearInterval(timer);
    }
}
// document.addEventListener('dblclick',() => {
//     // stage.removeAllChildren();
//     // stage.update();
//     start(data());
// },false);
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
window.addEventListener('resize',resize,false);
