/**
 * Created by Administrator on 2016/3/28.
 */
//画板1
var can1;
var can2;
//画板2
var ctx1;
var ctx2;
//画板的宽高
var canvasWidth;
var canvasHeight;
//时间间隔
var lastTime;
var detaTime;
//绘制背景图
var bgPic = new Image();
//定义海葵
var ane;
//定义果实
var fruit;
//定义鱼妈妈
var mom;
//定义小鱼
var baby;
//定义鼠标的位置
var mx;
var my;
//小鱼尾巴的数组
var babyTail = [];
//小鱼眨眼睛
var babyEye = [];
//小鱼身体
var babyBody = [];
//大鱼尾巴的数组
var momTail = [];
//大鱼眨眼睛
var momEye = [];
//大鱼身体
var momBodyOra = [];
var momBodyBlue = [];
//记录分数
var data;
//特效
var wave;
var halo;
var dust;
var dustPic = [];
//加载游戏
document.body.onload = game;
function game(){
    init();
    lastTime = Date.now();
    detaTime = 0;
    gameloop();
}
function init(){
    //获得canvas context;
    can1 = document.getElementById('canvas1');//fishes,dust,UI,circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById('canvas2');//background,ane,fruits
    ctx2 = can2.getContext('2d');
    //监视鼠标位置
    can1.addEventListener('mousemove',onMouseMove,false);
    //绘制背景图片
    bgPic.src = 'img/background.jpg'
    //获取canvas宽高
    canvasWidth = can1.width;
    canvasHeight = can1.height;
    //创建和初始化海葵
    ane = new aneObj();
    ane.init();
    //创建和初始化果实
    fruit = new fruitObj();
    fruit.init()
    //创建和初始化鱼妈妈
    mom = new momObj();
    mom.init();
    //创建和初始化小鱼
    baby = new babyObj();
    baby.init();
    //初始化鼠标位置
    mx = canvasWidth*0.5;
    my = canvasHeight*0.5;

    for(var i=0;i<8;i++){
        babyTail[i] = new Image();
        babyTail[i].src = 'img/babyTail'+i+'.png'
    }
    for(var i=0;i<2;i++){
        babyEye[i] = new Image();
        babyEye[i].src = 'img/babyEye'+i+'.png';
    }
    for(var i=0;i<20;i++){
        babyBody[i] = new Image();
        babyBody[i].src = 'img/babyFade'+i+'.png';
    }
    for(var i=0;i<8;i++){
        momTail[i] = new Image();
        momTail[i].src = 'img/bigTail'+i+'.png'
    }
    for(var i=0;i<2;i++){
        momEye[i] = new Image();
        momEye[i].src = 'img/bigEye'+i+'.png';
    }
    data = new dataObj();
    for(var i=0;i<8;i++){
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image()
        momBodyOra[i].src = 'img/bigSwim'+i+'.png';
        momBodyBlue[i].src = 'img/bigSwimBlue'+i+'.png';
    }
    ctx1.font = '30px Verdana';
    ctx1.textAlign = 'center';

    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();

    for(var i=0;i<7;i++){
        dustPic[i] = new Image();
        dustPic[i].src = 'img/dust'+i+'.png';
    }
    dust = new dustObj();
    dust.init();

}
function gameloop(){
    window.requestAnimFrame(gameloop);//setInterval , setTimeout
    var now = Date.now();
    detaTime = now - lastTime;
    lastTime = now;
    //优化切换出现的效果
    if(detaTime<40){detaTime = 40}
    //加载背景图片
    drawBackground();
    //绘制海葵
    ane.draw();
    //对果实的生命值进行判断
    fruitMonitor();
    //绘制果实
    fruit.draw();
    //清除前一帧的内容
    ctx1.clearRect(0,0,canvasWidth,canvasHeight)
    //绘制大鱼
    mom.draw();
    //绘制小鱼
    baby.draw();
    //调用大鱼吃果实的方法
    momFriutsCollision();
    //大鱼喂小鱼的方法
    momBabyCollision();
    //分数的绘制
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}
function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX|| e.layerX){
            mx = e.offsetX == undefined? e.layerX: e.offsetX;
            my = e.offsetY == undefined? e.layerY: e.offsetY;
        }
    }
}