let canvas = document.querySelector('#canvas');
let stage = new createjs.Stage(canvas);
createjs.Ticker.on('tick',stage);
resize();
let arr1 = [
    ['北京','所罗门群岛'],
    ['北京','索马里'],
    ['北京','叙利亚'],
    ['北京','特立尼达和多巴哥'],
    ['北京','坦桑尼亚联合共和国'],
    ['北京','巴拉圭'],
    ['北京','朝鲜'],
    ['北京','巴布亚新几内亚'],
    ['北京','葡萄牙'],
    ['北京','秘鲁'],
    ['北京','菲律宾'],
    ['北京','阿曼'],
    ['北京','新西兰'],
    ['北京','尼泊尔'],
    ['北京','挪威']
    // ['上海','长沙'],
    // ['重庆','太原'],
    // ['常州','大连'],
    // ['天津','北京'],
    // ['鄂尔多斯','深圳']
];
let arr2 = [
    ['上海','美国'],
    ['上海','越南'],
    ['上海','西岸'],
    ['上海','也门'],
    ['上海','赞比亚'],
    ['上海','津巴布韦']
];
let arr3 = [
    ['北京','乌鲁木齐'],
    ['北京','巴哈马'],
    ['北京','德国'],
    ['北京','刚果共和国'],
    ['北京','埃及'],
    ['北京','芬兰'],
    ['北京','印度'],
    ['北京','意大利']
    // ['新加坡','乌鲁木齐'],
    // ['澳大利亚','巴哈马'],
    // ['不丹','德国'],
    // ['哥伦比亚','刚果共和国'],
    // ['丹麦','埃及'],
    // ['西班牙','芬兰'],
    // ['几内亚比绍','印度'],
    // ['冰岛','意大利']
]
let index = 0;
let arrs = [arr1,arr2,arr3];
setInterval(() => {
    start(arrs[index % arrs.length]);
    index++;
},3000);
start(arr1);
function start (arr) {
    for (let i = 0,len = arr.length; i < len; i++) {
        let item = arr[i];
        let color = `hsl(${Math.round((i * 360) / len)}, 100%, 50%`;
        let coord = [
                        [...coordSys.dataToPoint(geoCoordMap[item[0]])],
                        [...coordSys.dataToPoint(geoCoordMap[item[1]])]
                    ];
        let circle = new createjs.Shape();
        circle.x = coord[0][0];
        circle.y = coord[0][1];
        circle.graphics.beginStroke(color).setStrokeStyle(3).arc(0,0,50,0,Math.PI * 2);
        circle.scaleX = circle.scaleY = 0;
        stage.addChild(circle);

        let rect = new createjs.Shape();
        //遮罩层x,y,width,height
        rect.position = {
            x:Math.min(coord[0][0],coord[1][0]),
            y:Math.min(coord[0][1],coord[1][1]),
            width:Math.abs(coord[0][0] - coord[1][0]),
            height:Math.abs(coord[0][1] - coord[1][1])
        };
        rect.graphics.rect(rect.position.x,rect.position.y,rect.position.width,rect.position.height).closePath();
        let line = new createjs.Shape();
        //线条x,y差值,
        line.pox = (coord[1][0] - coord[0][0])/3 + 2;
        line.poy = (coord[1][1] - coord[0][1])/3 + 2;
        line.x = coord[0][0];
        line.y = coord[0][1];
        //画线
        line.graphics.beginStroke(color).setStrokeStyle(2).moveTo(-line.pox,-line.poy).lineTo(0,0);
        //线的遮罩
        line.mask = rect;
        stage.addChild(line);
        //目的点圆圈
        let circle2 = new createjs.Shape();
        circle2.x = coord[1][0];
        circle2.y = coord[1][1];
        circle2.graphics.beginStroke(color).setStrokeStyle(3).arc(0,0,50,0,Math.PI * 2);
        circle2.scaleX = circle2.scaleY = 0;
        stage.addChild(circle2);
        TweenMax.to(circle,2,{
            scaleX:1.5,
            scaleY:1.5,
            alpha:0,
            delay:i*0.1,
            ease: Circ.easeOut,
            onStartScope:this,
            onStart:function(){
                TweenMax.to(line,1,{
                    x:coord[1][0]+line.pox,
                    y:coord[1][1]+line.poy,
                    ease: Circ.easeOut,
                    onCompleteScope:this,
                    onComplete:function(){
                        TweenMax.to(circle2,2,{
                            scaleX:1.5,
                            scaleY:1.5,
                            ease: Circ.easeOut,
                            alpha:0,
                            onCompleteScope:this,
                            onComplete:function(){
                                stage.removeChild(circle,line,circle2);
                            }
                        })
                    }
                });
            }
        });
    }
}

function resize () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    myChart.resize();
    seriesModel = myChart.getModel().getSeriesByIndex(0);
    coordSys = seriesModel.coordinateSystem;
    if(stage.children.length>0){
        stage.removeAllChildren();
        start(arrs[index % arrs.length]);
    }
}
window.addEventListener('resize',resize,false);
