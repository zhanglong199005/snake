(function (window) {
  //所有关于蛇的代码都写在这个js文件中.
  //随机产生一个十六进制的颜色的函数.
  function getColorForRandom(){
    var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];  //下标0-15
    var str = "#";
    //循环产生 6个 0-15的数.
    for(var i = 0 ; i < 6; i++){
      var num = Math.floor(Math.random()*16);
      //根据这个随机数,在arr数组中去取值.
      str += arr[num];
    }
    return str;   //"#985700"
  }

  //声明一个数组list,用来保存显示蛇的div.
  var list = [];

  //1.分析,蛇也是有宽高,背景色,定位信息,还有移动方向的,所以蛇应该也是一个对象.
  function Snake(width,height,direction){
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || "right";
    //蛇的每一节的xy坐标不一样,颜色也不一样.
    this.body = [
      {x:3,y:1,bgColor:'red'},
      {x:2,y:1,bgColor:'green'},
      {x:1,y:1,bgColor:'pink'}
    ];
  }


  //2.把蛇显示在地图上. 像食物一样把蛇的每一节都显示出来,每一节都显示了整条蛇不就显示了吗?
  Snake.prototype.render = function (map) {
    //渲染新蛇之前调用移除老蛇的方法.
    remove(map);

    //遍历出蛇的每一节身体,显示.
    for(var i = 0 ; i < this.body.length; i++){
      //新建一个div,让div拥有蛇身体的显示信息.
      var div1 = document.createElement('div');
      div1.style.position = 'absolute';
      div1.style.left = this.body[i].x * this.width +"px";
      div1.style.top = this.body[i].y * this.height +"px";
      div1.style.width = this.width + "px";
      div1.style.height = this.height +"px";
      div1.style.backgroundColor = this.body[i].bgColor;
      //把div添加到map中.
      map.appendChild(div1);
      //把这个div给存进list数组中.
      list.push(div1);
    }
  }


  //3.蛇移动的代码写在原型中.
  Snake.prototype.move = function (food,map) {
    //3.1 除了蛇头之外的蛇身体 坐标的改变
    for(var i = this.body.length -1 ; i > 0 ; i--){
      //他移动之后的坐标,等于他的上一节移动之前的坐标.
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }

    //3.2 蛇头的坐标改变.
    switch (this.direction){
      case 'left':
        this.body[0].x--;
        break;
      case 'right':
        this.body[0].x++;
        break;
      case 'top':
        this.body[0].y--;
        break;
      case 'bottom':
        this.body[0].y++;
        break;
    }


    //判断蛇有没有吃到食物(判断蛇头的坐标是否和食物的坐标重叠);
    var snakeHeadX = this.body[0].x * this.width; //蛇头的x坐标
    var snakeHeadY = this.body[0].y * this.height;//蛇头的y坐标
    var foodX = food.x; //食物x坐标
    var foodY = food.y; //食物y坐标

    //先获取到蛇尾巴
    var lastSnakeUnit = this.body[this.body.length-1];

    //判断
    if(snakeHeadX == foodX && snakeHeadY == foodY){
      //吃到了食物.长身体.
      this.body.push({
        x:lastSnakeUnit.x,
        y:lastSnakeUnit.y,
        bgColor:getColorForRandom()
      });
      //产生一个新的食物.
      food.render(map);
    }


  }


  //4.写一个方法,删除老坐标蛇的div.  div在list数组中.
  function remove(map){
    //这里是从map中移除老坐标蛇的div
    for(var i = 0 ; i < list.length; i++){
    	map.removeChild(list[i]);
    }
    //清空list数组.
    list.length = 0;
  }



  //把Snake构造函数给暴露给window
  window.Snake = Snake;
}(window));
