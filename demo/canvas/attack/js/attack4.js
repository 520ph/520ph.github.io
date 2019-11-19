let canvas = document.querySelector('#canvas');
let stage = new createjs.Stage(canvas);
createjs.Ticker.on('tick',stage);
resize();
function randNum(minnum , maxnum){
    return Math.floor(minnum + Math.random() * (maxnum - minnum));
}
function data(){
    stage.update();
    var newArr = [];
    var keys = Object.keys(geoCoordMap);
    for (let i = 0; i < 10; i++) {
        newArr.push([keys[randNum(0,keys.length)],keys[randNum(0,keys.length)]]);
    }
    return newArr;
}

const  datas = (n = 30) =>{
  const result = [];
  const source = ['北京','美国','法国','南非','瑞典','土耳其','泰国']
  const target = ['西班牙','德国','巴西','墨西哥','上海','日本']
  const getRandom = (arr) => {
    let index = Math.floor((Math.random()*arr.length));
    return arr[index];
  }
  for(let i = n ;i >= 0 ;i-- ){
    let s = getRandom(source);
    let t = getRandom(target);
    result.push({
      sourceName :s,
      sourcePoint:[...coordSys.dataToPoint(geoCoordMap[s])],
      targetName :t ,
      targetPoint:[...coordSys.dataToPoint(geoCoordMap[t])]
    })
  }
  return result
}


let timer = setInterval(() => {
    start(data());
    index++;
},3000);
start(data());
//
/**
 * [start description]
 * @param  {[type]} arr [二维数组，[起始点，目的地,起始点x,y坐标，目标点x,y坐标]]
 */
function start (arr,
    {
        long = 3,sourceRadius = 50,
        targetRadius = 50,
        sourceBroderWdith = 3,
        targetBroderWdith = 3,
        lineWidth = 2
    } = {}) {
    //循环数据创建圆圈和线
    var colors = ["red","yellow","blue","green","#a201f4"];
    for (let i = 0,len = arr.length; i < len; i++) {
        let item = arr[i];
        //圈和线条的颜色
        let color = `hsl(${Math.round((i * 360) / len)}, 100%, 50%`;
        //let color = colors[i % colors.length];
        //起始点和目的地坐标
        //let coord = [item.sourcePoint,item.targetPoint];
        let coord = [
                        [...coordSys.dataToPoint(geoCoordMap[item[0]])],
                        [...coordSys.dataToPoint(geoCoordMap[item[1]])]
                    ];
        let container = new createjs.Container();
        stage.addChild(container);
        //创建起始点圆圈
        let sourceCircle = new createjs.Shape();
        //起始点坐标定位
        sourceCircle.x = coord[0][0];
        sourceCircle.y = coord[0][1];
        // sourceCircle.graphics.beginStroke('red').setStrokeStyle(sourceBroderWdith).rect(-sourceRadius/2,-sourceRadius/2,sourceRadius,sourceRadius);

        sourceCircle.graphics.beginStroke('red').setStrokeStyle(sourceBroderWdith).arc(0,0,sourceRadius,0,Math.PI * 2);

        container.addChild(sourceCircle);
        let line = new createjs.Shape();
        //线条x,y差值,分成long份就是线条长度的x,y坐标
        line.pox = (coord[1][0] - coord[0][0])/long;
        line.poy = (coord[1][1] - coord[0][1])/long;
        //线的x,y坐标就是起始点减去线条的长度
        line.x = coord[0][0];
        line.y = coord[0][1];
        //画线
        line.graphics.beginLinearGradientStroke (["#fff",color,"rgba(255, 255, 255, 0)"],[0,0.2,0.9,1],0,0, -line.pox,-line.poy).setStrokeStyle(lineWidth).moveTo(0,0).lineTo(-line.pox,-line.poy);
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
        line.mask = rect;

        let point = new createjs.Shape();
        point.fillCommand = point.graphics.beginFill(color).command;
        point.graphics.arc(0, 0,5,0,Math.PI * 2);
        point.x = coord[0][0];
        point.y = coord[0][1];
        let shadpwColor = `hsl(${Math.round((i * 360) / len)}, 50%, 90%`;
        point.shadow = new createjs.Shadow(shadpwColor, 0, 0, 50);
        container.addChild(point);
        container.addChild(line);
        //目的点圆圈
        let targetCircle = new createjs.Shape();
        targetCircle.x = coord[1][0];
        targetCircle.y = coord[1][1];
        targetCircle.graphics.beginStroke(color).setStrokeStyle(targetBroderWdith).arc(0,0,targetRadius,0,Math.PI * 2);
        container.addChild(targetCircle);
        sourceCircle.scaleX = sourceCircle.scaleY = 0;
        targetCircle.scaleX = targetCircle.scaleY = 0;
        stage.update();
        //起始点动画
        TweenMax.to(sourceCircle,1,{
            scaleX:1,
            scaleY:1,
            alpha:0,
            delay:0.1*i,
            ease: Circ.easeOut,
            onUpdate:() => stage.update(),
            onStart:() => {
                TweenMax.to([line,point],1,{
                    x:coord[1][0],
                    y:coord[1][1],
                    onUpdate:() => stage.update(),
                    ease: Circ.easeOut,
                    onComplete:() => {
                        point.fillCommand.style = '#fff';
                        TweenMax.to(point,0.5,{
                            alpha:0,
                            onUpdate:() => stage.update()
                        });
                        TweenMax.to(line,0.5,{
                            x:coord[1][0]+line.pox,
                            y:coord[1][1]+line.poy,
                            ease: Circ.easeOut,
                            onUpdate:() => stage.update(),
                            onComplete:() => {
                                //目的点动画
                                TweenMax.to(targetCircle,2,{
                                    scaleX:1.5,
                                    scaleY:1.5,
                                    ease: Circ.easeOut,
                                    alpha:0,
                                    onUpdate:() => stage.update(),
                                    onComplete:() => {
                                        stage.update();
                                        stage.removeChild(container);
                                        stage.update();
                                    }
                                })
                            }
                        })
                    }
                });
            }
        });
    }
}
window.onfocus = function(){
    clearInterval(timer);
    timer = setInterval(() => {
        start(data());
    },3000);
    resize();
    start(data());
}
window.onblur = function(){
    if(timer){
        clearInterval(timer);
        TweenMax.killAll(true);
    }
}
function resize () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    myChart.resize();
    //resize的时候，seriesModel,coordSys要重新获取
    seriesModel = myChart.getModel().getSeriesByIndex(0);
    coordSys = seriesModel.coordinateSystem;
    if(stage.children.length>0){
        stage.removeAllChildren();
        start(data());
    }
}
window.addEventListener('resize',resize,false);
