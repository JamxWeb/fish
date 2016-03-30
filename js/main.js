/**
 * Created by Administrator on 2016/3/28.
 */
//����1
var can1;
var can2;
//����2
var ctx1;
var ctx2;
//����Ŀ��
var canvasWidth;
var canvasHeight;
//ʱ����
var lastTime;
var detaTime;
//���Ʊ���ͼ
var bgPic = new Image();
//���庣��
var ane;
//�����ʵ
var fruit;
//����������
var mom;
//����С��
var baby;
//��������λ��
var mx;
var my;
//С��β�͵�����
var babyTail = [];
//С��գ�۾�
var babyEye = [];
//С������
var babyBody = [];
//����β�͵�����
var momTail = [];
//����գ�۾�
var momEye = [];
//��������
var momBodyOra = [];
var momBodyBlue = [];
//��¼����
var data;
//��Ч
var wave;
var halo;
var dust;
var dustPic = [];
//������Ϸ
document.body.onload = game;
function game(){
    init();
    lastTime = Date.now();
    detaTime = 0;
    gameloop();
}
function init(){
    //���canvas context;
    can1 = document.getElementById('canvas1');//fishes,dust,UI,circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById('canvas2');//background,ane,fruits
    ctx2 = can2.getContext('2d');
    //�������λ��
    can1.addEventListener('mousemove',onMouseMove,false);
    //���Ʊ���ͼƬ
    bgPic.src = 'img/background.jpg'
    //��ȡcanvas���
    canvasWidth = can1.width;
    canvasHeight = can1.height;
    //�����ͳ�ʼ������
    ane = new aneObj();
    ane.init();
    //�����ͳ�ʼ����ʵ
    fruit = new fruitObj();
    fruit.init()
    //�����ͳ�ʼ��������
    mom = new momObj();
    mom.init();
    //�����ͳ�ʼ��С��
    baby = new babyObj();
    baby.init();
    //��ʼ�����λ��
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
    //�Ż��л����ֵ�Ч��
    if(detaTime<40){detaTime = 40}
    //���ر���ͼƬ
    drawBackground();
    //���ƺ���
    ane.draw();
    //�Թ�ʵ������ֵ�����ж�
    fruitMonitor();
    //���ƹ�ʵ
    fruit.draw();
    //���ǰһ֡������
    ctx1.clearRect(0,0,canvasWidth,canvasHeight)
    //���ƴ���
    mom.draw();
    //����С��
    baby.draw();
    //���ô���Թ�ʵ�ķ���
    momFriutsCollision();
    //����ιС��ķ���
    momBabyCollision();
    //�����Ļ���
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