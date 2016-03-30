/**
 * Created by Administrator on 2016/3/28.
 */
var aneObj = function () {
    this.rootx = [];//每个海葵在x轴位置
    this.headx = [];//每个海葵的高度
    this.heady = [];
    this.amp = [];
    this.alpha = 0;
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    for(var i=0;i<this.num;i++){
        this.rootx[i] = i*16+Math.random()*20//每个海葵相隔距离
        this.headx[i] = this.rootx[i];
        this.heady[i] = canvasHeight-250+Math.random()*50//每个海葵的高度
        this.amp = Math.random()*50+50;
    }
}
aneObj.prototype.draw = function () {
    this.alpha += detaTime*0.0008;
    var l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = 'round';
    ctx2.strokeStyle = '#3b154e';
    for(var i=0;i<this.num;i++){
        //brginPath,moveTo,lineTo,stroke,sytokeStyle,lineWidth,lineCap,globalAlpha
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canvasHeight);
        this.headx[i] = this.rootx[i]+l*this.amp;
        ctx2.quadraticCurveTo(this.rootx[i],canvasHeight-100,this.headx[i],this.heady[i]);
        ctx2.stroke()
    }
    ctx2.restore()
}