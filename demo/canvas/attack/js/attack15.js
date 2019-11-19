class attack {
    constructor({
        canvas,     //canvas对象，element对象
        long = 3,   //线长几分之几
        lineWidth = 3,  //线条线宽
        circleRadius = 50,  //圆环半径
        circleBroderWdith = 3,  //圆环线宽
        pointRadius = 40,   //光圈半径
        color, //颜色
        defImg, //光圈对象
        data
    }){
        if(!canvas){
            console.error('请传参canvas');
            return;
        }
        this.canvas = canvas;
        //光圈对象
        this.defImg = defImg;
        //舞台
        this.stage = new createjs.Stage(this.canvas);
        this.long = long;
        this.lineWidth = lineWidth;
        this.circleRadius = circleRadius;
        this.circleBroderWdith = circleBroderWdith;
        this.pointRadius = pointRadius;
        this.defaultColor = [
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
        this.colors = Object.assign({},this.defaultColor,color);
        for (let key in this.colors) {
            let rgb = this.colorRgb(this.colors[key].color),
                r = rgb[0],
                g = rgb[1],
                b = rgb[2],
                a = 0.7;
            this.colors[key].pointColor = this.tranColor(r,g,b,a);
        }
        //canvas渲染的监听器
        this.listener = createjs.Ticker.on('tick',this.stage);
        if(data){
            this.update(data);
        }
    }
    /**
     * [清除全部舞台对象]
     */
    clear(){
        this.stage.removeAllChildren();
    }

    /**
     * [渲染方法]
     * @param  {数组} dataArr
     * 起始点x,y坐标,目标点x,y坐标
     * [
     *      {
     *          sourcePoint:[100,200],
     *          targetPoint:[100,200]
     *      }
     * ]
     */
    update(data){
        let dataArr = data.concat();
        let colorlength = Object.keys(this.colors).length;
        //运动对象
        let runMap = {
            sArr:[],
            lArr:[],
            pArr:[]
        };
        dataArr.forEach((item,index) => {
            let color = this.colors[index % colorlength];
            let coord = [item.sourcePoint,item.targetPoint];
            let circle = this.initCircle(coord,color.color);
            let line = this.initLine(coord,color.gradColor);
            let point = this.initPoint(coord,color.pointColor);
            this.stage.addChild(circle);
            this.stage.addChild(line);
            this.stage.addChild(point);
            runMap.sArr.push(circle);
            runMap.lArr.push(line);
            runMap.pArr.push(point);
        });
        if(!this.listener){
            this.listener = createjs.Ticker.on('tick',this.stage);
        }
        this.run(runMap);
    }
    /**
     * [开始动画]
     * @param  {Array} sArr [圆环数组]
     * @param  {Array} lArr [线条数组]
     * @param  {Array} pArr [光晕数组]
     */
    run({sArr,lArr,pArr}){
        let basicTimeline = anime.timeline();
        basicTimeline
        //起始点圈圈动画在0秒开始,放大到1倍并改变透明度,运动时间是1000毫秒,每个延迟100毫秒
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
        //点的动画在0毫秒开始,移动x,y位置到目的点,运动时间是1500毫秒,每个延迟100毫秒
        .add({
            targets:pArr,
            x:el => el.endX,
            y:el => el.endY,
            easing:'easeOutExpo',
            offset:0,
            duration:1500,
            delay:function(el, i, l) {
                return i * 100;
            }
        })
        //线的动画在0毫秒开始,放大到1倍，运动时间是500毫秒,每个延迟100毫秒
        .add({
            targets:lArr,
            scaleX:1,
            scaleY:1,
            easing:'easeOutExpo',
            offset:0,
            duration:500,
            delay:function(el, i, l) {
                return i * 100;
            }
        })
        //线的动画在0毫秒开始,移动x,y位置到目的点,运动时间是1500毫秒,每个延迟100毫秒
        .add({
            targets:lArr,
            x:el => el.endX,
            y:el => el.endY,
            easing:'easeOutExpo',
            offset:0,
            duration:1500,
            delay:function(el, i, l) {
                return i * 100;
            }
        })
        //点的动画在1500毫秒开始,改变透明度,运动时间是500毫秒,每个延迟100毫秒
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
        //线的动画在1300毫秒开始,缩小到0倍,运动时间是500毫秒,每个延迟100毫秒
        .add({
            targets:lArr,
            scaleX:0,
            scaleY:0,
            easing:'linear',
            offset:700,
            duration:500,
            delay:function(el, i, l) {
                return i * 100;
            }
        })
        //圆环复用动画在1300毫秒开始,缩小到0倍并改变x,y位置到目的点,运动时间是1毫秒
        .add({
            targets:sArr,
            scaleX:0,
            scaleY:0,
            x:el => el.endX,
            y:el => el.endY,
            alpha:1,
            easing:'easeInQuad',
            offset:1300,
            duration:1
        })
        //目的点的动画在1500毫秒开始,放大到2倍并改变透明度,运动时间是2000毫秒,每个延迟100毫秒
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
                //动画结束,删除舞台元素，防止元素过多卡顿
                this.stage.removeChild(...sArr,...lArr,...pArr);
            }
        });
    }
    /**
     * [销毁方法，停止渲染]
     */
    destory(){
        this.clear();
        this.stage.update();
        createjs.Ticker.off('tick',this.listener);
        this.listener = null;
    }

    /**
     * [创建圆环]
     * @param  {[二维数组]} coord [起始点和目的点坐标]
     * @param  {[string]} color [颜色]
     * @return {[Object]}       [createjs Shape对象]
     */
    initCircle(coord,color){
        let circle = new createjs.Shape();
        //设置起始点和目的点坐标
        circle.set({
            x:coord[0][0],
            y:coord[0][1],
            endX:coord[1][0],
            endY:coord[1][1],
            scaleX:0,
            scaleY:0
        });
        //画圆
        circle.graphics.setStrokeStyle(this.circleBroderWdith).beginStroke(color).drawCircle(0,0,this.circleRadius);
        return circle;
    }

    initLine(coord,color){
        let line = new createjs.Shape();
        line.set({
            x:coord[0][0],
            y:coord[0][1],
            endX:coord[1][0],
            endY:coord[1][1],
            pox:(coord[1][0] - coord[0][0])/this.long,
            poy:(coord[1][1] - coord[0][1])/this.long,
            scaleX:0,
            scaleY:0
        });
        //画线
        line.graphics.beginLinearGradientStroke (color,[0.7,1],0,0, -line.pox,-line.poy).setStrokeStyle(this.lineWidth).moveTo(0,0).lineTo(-line.pox,-line.poy);
        return line;
    }

    initPoint(coord,color){
        let point = new createjs.Bitmap(color);
        point.set({
            x:coord[0][0],
            y:coord[0][1],
            endX:coord[1][0],
            endY:coord[1][1],
            regX:this.pointRadius,
            regY:this.pointRadius,
        });
        return point;
    }
    //光圈颜色：利用canvas反转图片颜色
    tranColor(r,g,b,a){
        let imgCanvas = document.createElement("canvas");
        imgCanvas.width = this.pointRadius * 2;
        imgCanvas.height = this.pointRadius * 2;
        let imgCtx = imgCanvas.getContext('2d');
        imgCtx.drawImage(this.defImg, 0, 0,imgCanvas.width,imgCanvas.height);
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


    /**
     * [颜色转换方法,16进制转换成rgb颜色值]
     * @param  {[type]} color [颜色值]
     * @return {[type]}       [rgb格式的颜色值]
     */
    colorRgb(color) {
    	let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    	let sColor = color.toLowerCase();
    	if (sColor && reg.test(sColor)) {
    		if (sColor.length === 4) {
    			let sColorNew = "#";
    			for ( let i = 1; i < 4; i += 1) {
    				sColorNew += sColor.slice(i, i + 1).concat(
    						sColor.slice(i, i + 1));
    			}
    			sColor = sColorNew;
    		}
    		// 处理六位的颜色值
    		let sColorChange = [];
    		for ( let i = 1; i < 7; i += 2) {
    			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    		}
    		return sColorChange;
    	} else {
    		return sColor;
    	}
    }
}
