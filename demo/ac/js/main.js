window.AudioContext = window.AudioContext || 
						window.webkitAudioContext || 
						window.mozAudioContext;
window.onload = function() {
    var audio = document.getElementById('audio');
    var ctx = new AudioContext();
    var analyser = ctx.createAnalyser();
    var audioSrc = ctx.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    var canvas = document.getElementById('canvas'),
        cwidth = canvas.width,
        cheight = canvas.height - 2,
        meterWidth = 1, //能量柱的宽度
        gap = 1, //能量柱的间隙
        capHeight = 2,
        capStyle = '#00FFD5',//帽子颜色
        meterNum = 1000, //多少个能量柱
        capYPositionArray = []; //能量柱的帽子
    ctx = canvas.getContext('2d'),
    gradient = ctx.createLinearGradient(0, 0, 0,350);
    gradient.addColorStop(0, '#F500FF');
    gradient.addColorStop(0.5, '#A200FF');
    gradient.addColorStop(0.8, '#FF001E');    gradient.addColorStop(0.99, '#000');
    // loop
    function renderFrame() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var step = Math.round(array.length / meterNum); //一个计算能量柱高度的公式第一步
        ctx.clearRect(0, 0, cwidth, cheight);
        for (var i = 0; i < array.length; i++) {
            var value = array[i * step];//一个计算能量柱高度的公式第二步
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);//往帽子数组里面添加值，长度不能大于能量柱的个数
            };
            ctx.fillStyle = capStyle;//设置画笔颜色，要开始画了啊
            //能量柱过渡效果
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 2, cheight - (--capYPositionArray[i]), meterWidth, capHeight);//能量柱帽子递减往下落
            } else {
                ctx.fillRect(i * 2, cheight - value, meterWidth, capHeight);
                capYPositionArray[i] = value;
            };
            ctx.fillStyle = gradient; //设置画笔颜色，要开始画了啊
            ctx.fillRect(i * 2, cheight - value + capHeight, meterWidth, cheight);//能量柱
        }
        requestAnimationFrame(renderFrame);//无限循环动画
    }
    renderFrame();//开始调用以后，就会自动无限调用了
    audio.play();
};