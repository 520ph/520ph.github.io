this.benz=this.benz||{};
(function(){
    var Cover=function()
    {
        this.init();
    };

    var p=Cover.prototype;
    p.fixH = 960;
    p.minW = 567;
    p.maxW = 760;
    p.hwS = p.fixH/ p.maxW;
    p.canvasScale = 1;
    //选择车手面板打开状态
    p.isDriverState = false;
    p.canUpdate = true;
    p.resourcesUrl = [
        {id:"txt1", src:"images/coverPage/txt1.png"},
        {id:"txt2", src:"images/coverPage/txt2.png"},
        {id:"txt3", src:"images/coverPage/txt3.png"},
        {id:"txt4", src:"images/coverPage/txt4.png"},
        {id:"cloud1", src:"images/coverPage/cloud1.png"},
        {id:"cloud2", src:"images/coverPage/cloud2.png"},
        {id:"coverBg", src:"images/coverPage/coverBg.jpg"},
        {id:"flag", src:"images/coverPage/flag.png"},
        {id:"coverPerson", src:"images/coverPage/coverPerson.png"},
        {id:"coverCar", src:"images/coverPage/coverCar.png"},
        {id:"logo", src:"images/logo.png"},
        {id:"startIn", src:"images/coverPage/startIn.png"},
        {id:"startOut", src:"images/coverPage/startOut.png"},
        {id:"star", src:"images/coverPage/star.png"},
        {id:"driverBg", src:"images/coverPage/driver.jpg"},
        {id:"pauseIcon", src:"images/pauseIcon.png"},
        {id:"playIcon", src:"images/playIcon.png"},
        {id:"introOpen", src:"images/coverPage/introOpen.png"},
        {id:"introBg", src:"images/dealPage/introBg.png"},
        {id:"introBtn", src:"images/dealPage/introBtn.png"}];
    p.resourcesMap = {};
    p.displayObjectList =[
        {"key":"bg","type":"Bitmap","imageKey":"coverBg"},
        {"key":"cloud1","type":"Bitmap","imageKey":"cloud1","x":300,"y":0},
        {"key":"cloud2","type":"Bitmap","imageKey":"cloud2","x":0,"y":0},
        {"key":"person","type":"Bitmap","imageKey":"coverPerson","x":230,"y":370},
        {"key":"car","type":"Bitmap","imageKey":"coverCar","x":0,"y":410},
        {"key":"logo","type":"Bitmap","imageKey":"logo","y":885},
        {"key":"starContainer","type":"Container","x":0,"y":960},
        {"key":"startOut", "type":"Bitmap", imageKey:"startOut","x":391,"y":778,"regX":182/2,"regY":182/2},
        {"key":"startIn","type":"Bitmap",imageKey:"startIn","x":300,"y":685},
        {"key":"flag","type":"Bitmap","imageKey":"flag","x":-270,"y":-20},
        {"key":"txt1","type":"Bitmap",imageKey:"txt1"},
        {"key":"txt2","type":"Bitmap",imageKey:"txt2"},
        {"key":"txt3","type":"Bitmap",imageKey:"txt3"},
        {"key":"txt4","type":"Bitmap",imageKey:"txt4","x":150,"y":210},
        {"key":"driverPanel","type":"Container","x":760,
            "sub":[
                {"key":"driverBg", "type":"Bitmap", "imageKey":"driverBg"},
                {"key":"btn1", "type":"Shape","x":165,"y":770,/*"skewX":20,*/"alpha":0.01},
                {"key":"btn2", "type":"Shape","x":400,"y":770,/*"skewX":20,*/"alpha":0.01},
                {"key":"introOpen", "type":"Bitmap", "imageKey":"introOpen","x":550,"y":260},
                {"key":"introOpenBtn", "type":"Shape", "x":550,"y":255,"alpha":0.01}
            ]
        },
        {"key":"introScreen","type":"Container",
            "sub":[
                {"key":"introBgColor", "type":"Shape","alpha":0.9},
                {"key":"introBg", "type":"Bitmap", "imageKey":"introBg"},
                {"key":"introBtn", "type":"Bitmap", "imageKey":"introBtn","x":295,"y":760}
            ]
        },
        {"key":"soundPanel","type":"Container","y":900,
            "sub":[
                {"key":"soundTxt","type":"Text","font":"bold 18px Arial","color":"#FFFFFF","text":"MUSIC","y":2},
                {"key":"pauseIcon", "type":"Bitmap","x":60,"imageKey":"pauseIcon"},
                {"key":"playIcon", "type":"Bitmap","x":60,"imageKey":"playIcon"},
                {"key":"soundBtn", "type":"Shape","alpha":0.01}
            ]
        }
    ];
    p.mcMap = {};

    p.init = function()
    {
        this.initDom();
        this.initResize();
        this.initStage();
        this.initLoading();
        this.startTick();
        this.initLoader();
        this.initShare();
        //
    };

    p.initDom = function()
    {
        this.$coverCanvas = $("#coverCanvas");
        this.coverCanvas = this.$coverCanvas[0];
    };

    p.initStage = function()
    {
        this.stage = new createjs.Stage("coverCanvas");
        createjs.Touch.enable(this.stage);
    };


    //================================loader=======================================//
    p.initLoader = function()
    {
        var cur = this;
        this.loader = new createjs.LoadQueue(false);
        this.loader.setMaxConnections(15);
        this.loader.addEventListener("fileload", function(e){
            var id = e.item.id;
            var item = e.item;
            var type = e.item.type;
            cur.resourcesMap[id] = item;
        });
        this.loader.addEventListener("progress", function(e) {
            //console.log("Progress:", cur.loader.progress, e.progress);
            cur.mcMap["loadingTxt"].text =  Math.round(e.progress*100)+"%";
            cur.mcMap["loadingBar"].scaleX = e.progress;
        });
        this.loader.addEventListener("complete", function(){
            cur.loadComplete();
        });
        this.loader.loadManifest(this.resourcesUrl);
        this.loader.load();
    };

    p.loadComplete = function()
    {
        this.initDisPlayObject();
        $(window).resize();
    };

    //================================resize=======================================//
    p.initResize = function()
    {
        var cur = this;
        $(window).resize(function(){
            var screenW = $(window).innerWidth();
            var screenH = $(window).innerHeight();
            var w = screenH/cur.hwS;
            cur.canvasScale = screenH/cur.fixH;
            cur.scaleCanvas(screenW,screenH);
        });
        $(window).resize();
    };

    p.scaleCanvas = function(screenW,screenH)
    {
        var h = screenH;
        var w = screenH/this.hwS;
        var left = (screenW-w)/2;
        this.$coverCanvas.css({"width":w,"height":h,"left":left});
    };

    //================================stage=======================================//
    p.initDisPlayObject = function()
    {
        var cur = this;
        this.createDisplayObject(this.stage,this.displayObjectList);
       
    };

    p.createDisplayObject = function(container,ary)
    {
        for(var i in ary)
        {
            var obj = ary[i];
            var key = obj["key"];
            var type = obj["type"];
            var mc = new createjs[type]();

            if(obj["addToList"] == undefined || obj["addToList"] == true)
            {
                container.addChild(mc);
            }
            if(type == "Bitmap")
            {
                mc.image = this.resourcesMap[obj["imageKey"]].tag;
            }

            for(var k in obj)
            {
                if(!(k == "key" || k == "type" || k=="imageKey" || k=="sub" || k=="addToList"))
                {
                    mc[k] = obj[k];
                }
            }
            //
            var sub = obj["sub"];
            if(sub)
            {
                this.createDisplayObject(mc,sub);
            }
            this.mcMap[key] = mc;
        }
    };

   

   

    p.tickHandler = function()
    {
        this.stage.update();
    };

    benz.Cover=Cover;
})();