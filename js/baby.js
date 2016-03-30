/**
 * Created by Administrator on 2016/3/28.
 */
var babyObj = function () {
    this.x;
    this.y;
    this.angle;
    this.babyEye = new Image();
    this.babyBody = new Image();
    this.babyTail = new Image();

    //尾巴计时器
    this.babyTailTimer = 0;
    //记录尾巴每一帧
    this.babyTailCount = 0;
    //眼睛计时器
    this.babyEyeTimer = 0;
    //记录眼睛每一帧
    this.babyEyeCount = 0;
    //眨眼的时间间隔
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.init = function (){
    this.x = canvasWidth*0.5-50;
    this.y = canvasHeight*0.5+50;
    this.angle = 0;
    this.babyBody.src = 'img/babyFade0.png';
}
babyObj.prototype.draw = function () {
    //lerp X , Y
    this.x = lerpDistance(mom.x,this.x,0.99);
    this.y = lerpDistance(mom.y,this.y,0.99);
    //delta angle
    //Math.atan2(y,x);
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX)+Math.PI;
    //lerp angle
    this.angle = lerpAngle(beta,this.angle,0.6);
    //baby tail count
    this.babyTailTimer +=detaTime;
    if(this.babyTailTimer>50){
        this.babyTailCount = (this.babyTailCount+1)%8;
        this.babyTailTimer %= 50;
    }
    //baby eye
    this.babyEyeTimer += detaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount+1)%2;
        this.babyEyeTimer%=this.babyEyeInterval;
        if(this.babyEyeCount==0){
            this.babyEyeInterval = Math.random()*1500+2000;
        }else{
            this.babyEyeInterval = 200;
        }
    }
    //baby Body
    this.babyBodyTimer += detaTime;
    if(this.babyBodyTimer>400){
        this.babyBodyCount = this.babyBodyCount+1;
        this.babyBodyTimer%=400;
        if(this.babyBodyCount>19){
            this.babyBodyCount = 19;
            data.gameOver = true;
        }
    }

    ctx1.save()
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle)

    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+25,-babyTail[babyTailCount].height*0.5)
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5)
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5)
    ctx1.restore()
}