class loop{
    constructor ({
        dom,
        data,
        margin = 10,
        childSize = [0.5, 0.5],
        titleColor = '#fff',
        titleFontSize = 20,
        numberFontSize = 25,
        colors = [
            ['#3aeabb', '#fdd250'],
            ['#00A7D5', '#F36200'],
            ['#F36200', '#fdd250'],
            ['#F36200', '#fdd250']
        ],
        time = 5,
        lineWidth = 15,
        angles = [Math.PI / 180 * -60, Math.PI / 180 * 330]
    }) {
        if (!dom) {
            console.error('请传参dom');
            return;
        }
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        this.colors = colors;
        this.titleColor = titleColor;
        this.angles = angles;
        this.lineWidth = lineWidth;
        this.childSize = childSize;
        this.titleFontSize = titleFontSize;
        this.numberFontSize = numberFontSize;
        this.margin = margin;
        this.time = time;
        this.layout = [
            {
                x: 0,
                y: 0
            },
            {
                x: 1,
                y: 0
            },
            {
                x: 0,
                y: 1
            },
            {
                x: 1,
                y: 1
            }
        ];
        this.dom = dom;
        this.data = data;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.dom.offsetWidth;
        this.canvas.height = this.dom.offsetHeight;
        this.dom.appendChild(this.canvas);
        this.canvas2 = document.createElement('canvas');
        // 舞台
        this.stage = new createjs.Stage(this.canvas);
        createjs.Ticker.on('tick', this.stage);
        this.nodeMap = {
            containerArr: [],
            loopArr: [],
            titleArr: [],
            numberArr: [],
            rectArr: []
        };
        this.createContent();
        this.resize();
        this.updateLoop();
        this.update(this.data);
        // let rect = new createjs.Shape();
        // rect.graphics.clear().setStrokeStyle(this.lineWidth, 'round').beginBitmapFill(this.canvas2, 'no-repeat').rect(0, 0, 900, 900)
        // this.stage.addChild(rect)
    }

    createContent () {
        for (let index = 0; index < this.data.length; index++) {
            // 容器
            let container = new createjs.Container();
            // 圆环
            let loop = new createjs.Shape();
            loop.name = 'loop';
            // 标题
            let title = new createjs.Text();
            title.name = 'title';
            // 数字
            let number = new createjs.Text();
            number.name = 'number';
            container.addChild(loop, title, number);
            this.stage.addChild(container);
            this.nodeMap.containerArr.push(container);
            this.nodeMap.loopArr.push(loop);
            this.nodeMap.titleArr.push(title);
            this.nodeMap.numberArr.push(number);
            let rect = new createjs.Shape();
            this.stage.addChild(rect);
            this.nodeMap.rectArr.push(rect);
        }
        
    }

    initLayout () {
        let left = this.childSize[0] * this.canvas.width;
        let top = this.childSize[1] * this.canvas.height;
        let flag = true;
        this.data.forEach((d, i) => {
            let container = this.nodeMap.containerArr[i];
            container.x = this.layout[i].x * left;
            container.y = this.layout[i].y * top;
            container.width = left;
            container.height = top;
            container.pointer = [container.width / 2, container.height / 2];
            let rect = this.nodeMap.rectArr[i]
            rect.graphics.clear().beginStroke('red').rect(container.x, container.y, left, top);
            // 圆环
            let loop = this.nodeMap.loopArr[i];
            // 标题
            let title = this.nodeMap.titleArr[i];
            // 数字
            let number = this.nodeMap.numberArr[i];
            title.x = number.x = loop.x = container.pointer[0];
            title.y = number.y = loop.y = container.pointer[1];

            loop.radius = Math.min(...container.pointer) - this.margin - this.lineWidth;
            loop.xyArr = [
                -loop.radius - this.lineWidth,
                0,
                loop.radius + this.lineWidth,
                0
            ];
            this.radius = loop.radius + this.lineWidth / 2;
            if (flag) {
                this.canvas2.width = this.canvas2.height = this.radius * 2;
                this.canvas2.getContext('2d').drawImage(imgs,0,0,this.radius * 2, this.radius * 2);
                this.mtx = new createjs.Matrix2D();
                this.position = this.mtx.appendTransform(-this.radius, -this.radius, 1, 1, 1,1,1);
                flag = false;
            }
            loop.graphics.clear().setStrokeStyle(this.lineWidth, 'round').beginBitmapStroke(this.canvas2, 'no-repeat', this.position).arc(0, 0, loop.radius, this.angles[0], Math.PI / 180 * -60 + this.angles[1])
            title.textAlign = number.textAlign = 'center';
            title.textBaseline = 'top';
            title.font = `${this.titleFontSize}px Arial`;
            title.text = d.name;
            title.color = this.titleColor;
            title.textBaseline = 'bottom';
            number.oldNum = number.oldNum || 0;
            number.text = d.value;
            number.diff = d.value - number.oldNum;
            number.font = `${this.numberFontSize}px Arial`;
            number.color = this.colors[i][0];
            number.scaleNum = loop.scaleNum = 0;
        });
    }

    updateLoop () {
        this.nodeMap.loopArr.forEach((d, i) => {
            d.scaleNum = 0;
            TweenMax.to(d, this.time, {
                scaleNum: 1,
                onUpdateParams: [d, i],
                onUpdate: (d, i) => {
                    d.graphics.clear().setStrokeStyle(this.lineWidth, 'round').beginBitmapStroke(this.canvas2, 'no-repeat', this.position).arc(0, 0, d.radius, this.angles[0], Math.PI / 180 * -60  + this.angles[1] * d.scaleNum)
                }
            });
        })
    }

    update (data) {
        this.data = data;
        this.nodeMap.numberArr.forEach((d, i) => {
            d.scaleNum = 0;
            d.diff = data[i].value - d.oldNum;
            TweenMax.to(d, 2, {
                scaleNum: 1,
                onUpdateParams: [d],
                onUpdate: (d) => {
                    d.text = Math.round(d.oldNum + d.diff * d.scaleNum);
                }
            });
        })
    }

    resize () {
        this.canvas.width = this.dom.offsetWidth;
        this.canvas.height = this.dom.offsetHeight;
        this.initLayout();
    }
}
