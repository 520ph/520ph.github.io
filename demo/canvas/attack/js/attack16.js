class Attack {
    constructor({
        // canvas对象，element对象
        canvas,
        // 线长几分之几
        long = 3,
        // 线条线宽
        lineWidth = 3,
        // 圆环半径
        circleRadius = 50,
        // 圆环线宽
        circleBroderWdith = 3,
        // 光圈半径
        pointRadius = 40,
        // 颜色
        color,
        // 数据(初始化时，可有可无)
        data
    }) {
        if (!canvas) {
            console.error('请传参canvas');
            return;
        }
        this.canvas = canvas;
        // 光圈对象
        this.defImg = new Image();
        this.defImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIA\
        AAAlC+aJAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH1wQUCC4h\
        oGmo9QAACvlJREFUaN69mltz00gQhS3NSCMlNjEmBYTi//8zCipUsIMd6zKytA/fctKMDITArh5ctqxL\
        X06fvsxkiz84sizLsizPc74sFotpmvSZHPO/fnLxb8j\
        wbNH1yZc8z8dx1HedT+Q7nU6LxWIcxz+U+zkKIC7CSYEsy7z3CDoMQ5ZlRVFwXiJO0zRNE7eM4zgMA2d\
        Q5g+dkD0dKlKA9xVFYZVJjouLixhj13V5nnvvh2GY+wQd+MQnz9DE/VL0PM/zPHfOIX2e50VROOecc4KKv\
        b4sS+yti8uyxPZnH44m2OUZCmS/tDqPFmZkeL1MQBrH0XtPMKAGpkXz0+mUZRkQUgzIe1w8DIN89UcKIJN\
        zTqIvFgvvPX7QgWeKorBBoovHcYwxEiGCO0eMcRxHzlur931v1X4+hJDMGl74wd15npdl6b333kt67/00TUA\
        LbhXSsL2FYlEU6GZlBYFzhX/PA5bap2mSlJiKoIRqnHOWSefPEdNbqPDX6XSKMSqK2raVJlmWxRjx0i+j4o\
        wC2Iy3OudkJ8wplsTMNishMZ/EQIzxLEdxPfIh9ziOfd8TJ1xAtPR9/3sQEjMgeoIQ+IS/rI1FsvoSQkCZo\
        iiUB6wfEj/zk8gRjKXJb3gAmPIsvQ/E6xpodB7x0oFIEOSIVM7IzHNcgZk8z2V4PN80zU90cHMFMLa40jl\
        nDQ+QEo+BK8WuTDtnYfTUeRsVymXOObETj/pJTLs5eybIqetaNrbJSxgTz6iekwm4KymfcC/PgUx1XhcTcs\
        itQutsQPsfxYDgpACw4chfmNM+V8WFrlceSCg//3ZYpuJpMcayLJXRkJ53zV2RJqayLCV0CIHXz6Uvy9JSE\
        JaG2rEu71NgiLJsoSqWm+d1xYmA9KPy1idCCPryss4Iu1YfQUtqKxPrU9UEcaxqIqlw9QruGoahqqrj8Si\
        rJT5MPUDVJb+HEJS2FJGYWXGpUkKxS8QrPEIINmSVW9Q8JCWjJVwZmzhB86QMe1SAHC5PIRPS2/hDQ8mEr\
        Dr4qfDI87yqKhUROkRuSQ/knKNVSDokgkG1WRLNLmFPHq0vFvpoKCvK8IjOT8tIhNA4jqfTyZZGArfVR\
        5/iJesf6anM/Z0CiC6BhAFRSpKVrfRiUoku26OwrTgQRbaUDkIOr7CZDu9Rn8r51gl+Xn5KepuA8Ill\
        cVQVxpCbJM2VIYSiKIhCTsYYZWZyH84pikJZDKfJD+ouuq6TAN9BiFOErGgbR8sDokUuQAEMz/U8Acyg\
        Q1EUIQRbWsuHCKca21JnUucpEriYnluN6KMCtimR35VWLQywq3DPi8uyBHVlWVZVdXFxgSZ84UZ5RnD\
        ni3NO9lbehZGtmcdvh0j5OwiJsM5WyDYY8LtKbs5776uqEk29evWqLMvT6XR5eVkUxeFw2O12VMvg2z\
        nXtq0tGdCnKAphjDmArfnAcIwR9WKM/3pAQoj15QEZWHAkdv23Q967vLy8uLgoy3Kz2SyXy7quh2EI\
        IVRVdTgc8jxfr9dVVbVty4tVCGF7Acb6wfbNakgEHingbZmu65I2yprfVhaQj/c+xrharW5ubrquy7\
        JstVqFENbrtXOO4KOQXi6XwzB0XSfixvzee25E+qR5SHp/Tcf+ZReroi13bXE2r91VYClkKb+ur6+d\
        c5vNBlagrQkhfPjwIcZYVdV6vd7v93QFIYSu6wAVwYCNLc/YQQY6E5aPtZCClackxYbQb2shEZS4CA\
        pqmubq6ur9+/dXV1ebzQaVNpvNp0+fQghv377tuq7ruhhj27bOORCvx1oRbfjKUaqg7GU+qW9t6WcL\
        dFsO2WYf2rm+vq7rOoRQ1/Visbi5uXn37h2RsN1uMeput/v48WPf90lGR435oJeEYMeSSJhkYn8WbbpH\
        YWS7MGUJuJnhwjRNq9Xq9evXb968Wa/XL1++xDlwy+Fw2O/3x+NRhY1NzDKnJVBbF3HX2dHdY5Kn57DMxe\
        RD/47msNNZWtjj8fj169emaZxzNHFgtyxL6Gi1Wq3Xa6omSNOWusloUVRh7Xh+hGWjk0OZQonWjmPtpEAFR\
        QhhuVyu1+sXL16IzsWV2IJ8V9c1OtgGRaKLQ+2AI/F8OgK0aUu4tJaw/Y0tnsmyIQQywHK5jDFut1tO1nVd\
        1/XpdNrtdnd3dw8PD1++fNlut23bQqxaLpgPXZK/ZLL5LPlMTwxCxJ5iBpXKKsoV1k3T3N7eAp6+76uq+vz\
        5M5VFjJHYZcLVdd0wDIfDwU61kh5F1Z7QO4eQvdhLVwmq3Mw0BfNohA9tM4gdx/H+/h6VLi8vYTpofhgGVG\
        rbFg+M41jXddu2h8NhGAZCjrfbUicZYdi0o6Hvd9Uor6/rGolV9CsYLOWrU9PYEMAg+tXV1TRN+/3ee9/3/d3\
        d3f39fdd1+/1+t9vt9/tpmo7HY9/3TdMQ+sgkZVQLqRGzIYfaWFP/OiUjiif1E+ggiSU3L8NdVKZnkYACb\
        dviE+S7vb09HA4xRtYBGMUJLZzRSpSdoEBo8LUI81EB8aYaK+KdVCVq0joKdZH3XpYAVE3TnE4nPImZeU3b\
        tg8PD/v9/uHhoe/7vu9ZfZKftfInFAmxMpDeJSM+BjExoKrV8kDbtmJrbhOx4ge7bkda3W63fd8z4lwsFoR\
        E0zQxRhKLTM6N3GtNru/yhu0NVcM+lhJaehnHkWU51UVIbFMbGb5pGgJGRE711jRNURS4247cEJ1QAUKiBM\
        wHvm3SFIw5T7mq9PLYkYEKNXusc4mUxM12aqnq1RZOmj0JD8Qo0iAxtbTY3brCsr7tGLV6qwYATz52ZCoK\
        kvWvZJBvl+JoyWkDtAKgZS+WNmwxoyqSF2N7WJi320Gdxbc1h1ydzOecxdZ8iijkAPF5eaeBuCKShb1pms\
        C90II+ElEYw1GS2C7JKBhY/MOHybKaS4Z7Wp5IloEBlbykqU5ShijvyNH2EJmIxe13lYl2wUpxP78mnY3aV\
        VQ7N7fBZLt+HqSpt6UO7K0tBQAMw1s40Y5ZrrScI/yIPW20pAokwADlyGGjmSdqIJ4sVkuNLMsge5toVTh\
        oTduuzUjDJBKQQaxgG+LUA8liMNdpWde+TIW0TSvJqpEFhq0oiYpkxAm4bXeulAz6bUgkhV26xKSaW3lRD\
        Cv8KJhsF6JKi4QvhsG0IEosJJRj16TsUVHTtq3sTdCf2XCR/C6KQrshtEY2jiNlT9LvayBpuxPbIp4tg20\
        LZXsDhTVSIr3Cw5LVz1YpbQrTdIl4UAqz5SrWFaLsrDyZLFmEWCa1a/fyUtd1mnlZMnjSQrcoT/NX2VXtT\
        mJjMECVYafCtqwSThTcyaIY+lAXC0WqWH+00no++wrrdpJhk4Dd6mNlVadi14UksY1CywpIzLs0SVBo/Xz\
        zSvaj3SrIJ+gDJHKFXKk1qGT9Yr7fw2puvye9mLZ8UGsklcVvbzlDPrvJgCi33ki2HSSCzsPANuzCJ+gCZ\
        vKJ8saf7pmr69qKqMlFCEGTYPU9lr4SFrLVmBRQTrCuG4ZB8/e/sOlPyx/ahjOvPuZbl4TDZAsZqGCI2zT\
        NHG/EwNM3nj112yUdpkZdli5ZTTrLcfNhjga6yW4i9TR/Z8/cL73BpC0ZoWm+WZalYpEmTpSf5AdVfr9km\
        7+z8dWOr9XKnN18OUf/Wf+oyn9KvD5n3+icXpTUYIwkDc+rhiRR2KbEVqzP3rz7zL3TZ+s/NRJ2LR4IKSUl\
        Lc7/unf6iQfZw3pARLn4D46/4IEklOfZ92xN+rd2r/8DebSckAm1i/EAAAAASUVORK5CYII=';
        // 舞台
        this.stage = new createjs.Stage(this.canvas);
        this.long = long;
        this.lineWidth = lineWidth;
        this.circleRadius = circleRadius;
        this.circleBroderWdith = circleBroderWdith;
        this.pointRadius = pointRadius;
        this.defaultColor = [
            {
                color: '#ffcc00',
                gradColor: ['#ffcc00', 'rgba(255, 255, 255, 0)']
            },
            {
                color: '#52acdb',
                gradColor: ['#52acdb', 'rgba(255, 255, 255, 0)']
            },
            {
                color: '#5276db',
                gradColor: ['#5276db', 'rgba(255, 255, 255, 0)']
            },
            {
                color: '#9952db',
                gradColor: ['#9952db', 'rgba(255, 255, 255, 0)']
            },
            {
                color: '#db52d3',
                gradColor: ['#db52d3', 'rgba(255, 255, 255, 0)']
            },
            {
                color: '#52dbcc',
                gradColor: ['#52dbcc', 'rgba(255, 255, 255, 0)']
            },
            {
                color: '#5652db',
                gradColor: ['#5652db', 'rgba(255, 255, 255, 0)']
            },
            {
                color: '#db9952',
                gradColor: ['#db9952', 'rgba(255, 255, 255, 0)']
            }
        ];
        this.colors = Object.assign({}, this.defaultColor, color);
        // canvas渲染的监听器
        this.listener = null;
        this.defImg.onload = () => {
            for (let key in this.colors) {
                // 判断是否是自有属性
                if (this.colors.hasOwnProperty(key)) {
                    let rgb = this._colorRgb(this.colors[key].color);
                    console.log(`%c${rgb}`, `color:rgb(${rgb.join(',')})`);
                    let r = rgb[0];
                    let g = rgb[1];
                    let b = rgb[2];
                    let a = 0.7;
                    this.colors[key].pointColor = this._tranColor(r, g, b, a);
                }
            }
            if (data) {
                this.update(data);
            }
        }
    }
    /**
     * [清除全部舞台对象]
     */
    clear() {
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
    update(data) {
        let dataArr = data.concat();
        let colorlength = Object.keys(this.colors).length;
        // 运动对象
        let runMap = {
            sArr: [],
            lArr: [],
            pArr: []
        };
        dataArr.forEach((item, index) => {
            let color = this.colors[index % colorlength];
            let coord = [item.sourcePoint, item.targetPoint];
            let circle = this.initCircle(coord, color.color);
            let line = this.initLine(coord, color.gradColor);
            let point = this.initPoint(coord, color.pointColor);
            this.stage.addChild(circle, line, point);
            runMap.sArr.push(circle);
            runMap.lArr.push(line);
            runMap.pArr.push(point);
        });
        if (!this.listener) {
            this.listener = createjs.Ticker.on('tick', this.stage);
        }
        var tl = new TimelineMax({
            onComplete:() => {
                console.log('动画结束');
                // 动画结束,删除舞台元素，防止元素过多卡顿
                this.stage.removeChild(...runMap.sArr, ...runMap.lArr, ...runMap.pArr);
            }
        });

        tl.add(['circleStart','pointStart','lineStart','lineScale'],0);
        tl.add(['circle2Start'],0.7);

        tl.staggerTo(runMap.sArr,1,{
            ease:Circ.easeOut,
            scaleX: 1,
            scaleY: 1,
            alpha: 0
        },0.1,'circleStart');

        tl.staggerTo(runMap.lArr,0.5,{
            scaleX: 1,
            scaleY: 1
        },0.1,'lineScale')
        
        tl.staggerTo(runMap.lArr,1,{
            ease:Circ.easeOut,
            x:(value,treget) => {
                return treget.endX;
            },
            y:(value,treget) => {
                return treget.endY;
            }
        },0.1,'lineStart');

        tl.staggerTo(runMap.pArr,1,{
            ease:Circ.easeOut,
            x:(value,treget) => {
                return treget.endX;
            },
            y:(value,treget) => {
                return treget.endY;
            }
        },0.1,'pointStart');

        tl.staggerTo(runMap.sArr,0.1,{
            scaleX: 0,
            scaleY: 0,
            alpha: 1,
            x:(value,treget) => {
                return treget.endX;
            },
            y:(value,treget) => {
                return treget.endY;
            }
        },0,'circle2Start');

        tl.staggerTo(runMap.sArr,1,{
            ease:Circ.easeOut,
            scaleX: 2,
            scaleY: 2,
            alpha: 0
        },0.1,'circle2Start+=0.1');

        tl.staggerTo(runMap.pArr,1,{
            alpha: 0
        },0.1,'circle2Start+=0.1');

        tl.staggerTo(runMap.lArr,1,{
            scaleX: 0,
            scaleY: 0
        },0.1,'circle2Start+=0.1');

        //this.run(runMap);
    }
    /**
     * [开始动画]
     * @param  {Array} sArr [圆环数组]
     * @param  {Array} lArr [线条数组]
     * @param  {Array} pArr [光晕数组]
     */
    run({ sArr, lArr, pArr }) {
        let basicTimeline = anime.timeline();
        basicTimeline
            // 起始点圈圈动画在0秒开始,放大到1倍并改变透明度,运动时间是1000毫秒,每个延迟100毫秒
            .add({
                targets: sArr,
                scaleX: 1,
                scaleY: 1,
                alpha: 0,
                easing: 'easeInOutCirc',
                offset: 0,
                duration: 1000,
                delay: (el, i) => {
                    return i * 100;
                }
            })
            // 点的动画在0毫秒开始,移动x,y位置到目的点,运动时间是1500毫秒,每个延迟100毫秒
            .add({
                targets: pArr,
                x: el => el.endX,
                y: el => el.endY,
                easing: 'linear',
                offset: 0,
                duration: 1500,
                delay: (el, i) => {
                    return i * 100;
                }
            })
            // 线的动画在0毫秒开始,放大到1倍，运动时间是500毫秒,每个延迟100毫秒
            .add({
                targets: lArr,
                scaleX: 1,
                scaleY: 1,
                easing: 'linear',
                offset: 0,
                duration: 500,
                delay: (el, i) => {
                    return i * 100;
                }
            })
            // 线的动画在0毫秒开始,移动x,y位置到目的点,运动时间是1500毫秒,每个延迟100毫秒
            .add({
                targets: lArr,
                x: el => el.endX,
                y: el => el.endY,
                easing: 'linear',
                offset: 0,
                duration: 1500,
                delay: (el, i) => {
                    return i * 100;
                }
            })
            // 点的动画在1500毫秒开始,改变透明度,运动时间是500毫秒,每个延迟100毫秒
            .add({
                targets: pArr,
                alpha: 0,
                easing: 'easeInQuad',
                offset: 1500,
                duration: 500,
                delay: (el, i) => {
                    return i * 100;
                }
            })
            // 线的动画在1300毫秒开始,缩小到0倍,运动时间是500毫秒,每个延迟100毫秒
            .add({
                targets: lArr,
                scaleX: 0,
                scaleY: 0,
                easing: 'easeInQuad',
                offset: 1300,
                duration: 500,
                delay: (el, i) => {
                    return i * 100;
                }
            })
            // 圆环复用动画在1300毫秒开始,缩小到0倍并改变x,y位置到目的点,运动时间是1毫秒
            .add({
                targets: sArr,
                scaleX: 0,
                scaleY: 0,
                x: el => el.endX,
                y: el => el.endY,
                alpha: 1,
                easing: 'easeInQuad',
                offset: 1300,
                duration: 1
            })
            // 目的点的动画在1500毫秒开始,放大到2倍并改变透明度,运动时间是2000毫秒,每个延迟100毫秒
            .add({
                targets: sArr,
                scaleX: 2,
                scaleY: 2,
                alpha: 0,
                easing: 'easeOutQuart',
                offset: 1500,
                duration: 2000,
                delay: (el, i) => {
                    return i * 100;
                },
                complete: () => {
                    // 动画结束,删除舞台元素，防止元素过多卡顿
                    this.stage.removeChild(...sArr, ...lArr, ...pArr);
                }
            });
    }
    /**
     * [销毁方法，停止渲染]
     */
    destory() {
        this.clear();
        this.stage.update();
        createjs.Ticker.off('tick', this.listener);
        this.listener = null;
    }

    /**
     * [创建圆环]
     * @param  {[二维数组]} coord [起始点和目的点坐标]
     * @param  {[string]} color [颜色]
     * @return {[Object]}       [createjs Shape对象]
     */
    initCircle(coord, color) {
        let circle = new createjs.Shape();
        // 设置起始点和目的点坐标
        circle.set({
            x: coord[0][0],
            y: coord[0][1],
            endX: coord[1][0],
            endY: coord[1][1],
            scaleX: 0,
            scaleY: 0
        });
        // 画圆
        circle.graphics.setStrokeStyle(this.circleBroderWdith).beginStroke(color).drawCircle(0, 0, this.circleRadius);
        return circle;
    }

    initLine(coord, color) {
        let line = new createjs.Shape();
        line.set({
            x: coord[0][0],
            y: coord[0][1],
            endX: coord[1][0],
            endY: coord[1][1],
            pox: (coord[1][0] - coord[0][0]) / this.long,
            poy: (coord[1][1] - coord[0][1]) / this.long,
            scaleX: 0,
            scaleY: 0
        });
        // 画线
        line.graphics
        .beginLinearGradientStroke(color, [0.7, 1], 0, 0, -line.pox, -line.poy)
        .setStrokeStyle(this.lineWidth).moveTo(0, 0).lineTo(-line.pox, -line.poy);
        return line;
    }

    initPoint(coord, color) {
        let point = new createjs.Bitmap(color);
        point.set({
            x: coord[0][0],
            y: coord[0][1],
            endX: coord[1][0],
            endY: coord[1][1],
            regX: this.pointRadius,
            regY: this.pointRadius
        });
        return point;
    }
    // 光圈颜色：利用canvas反转图片颜色
    _tranColor(r, g, b, a) {
        let imgCanvas = document.createElement('canvas');
        imgCanvas.width = this.pointRadius * 2;
        imgCanvas.height = this.pointRadius * 2;
        let imgCtx = imgCanvas.getContext('2d');
        imgCtx.drawImage(this.defImg, 0, 0, imgCanvas.width, imgCanvas.height);
        let imgData = imgCtx.getImageData(0, 0, imgCanvas.width, imgCanvas.height);
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
    _colorRgb(color) {
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        let sColor = color.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = '#';
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(
                        sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            // 处理六位的颜色值
            let sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                // 0x开头要用16进制转换
                sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16));
            }
            return sColorChange;
        }
        return sColor;
    }
}
