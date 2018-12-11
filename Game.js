(function (window) {
  //所有关于游戏逻辑的代码都写在这里.
  var that = null; //声明一个全局变量that.

  //1.创建游戏控制器对象的构造函数.
  function Game(map){
    //游戏控制器对象,有一条蛇
    this.snake = new Snake();
    //游戏控制器对象,有一个食物
    this.food = new Food();
    //游戏控制器对象,有一个地图.
    this.map = map ;

    //给that赋值.
    that = this;
  }



  //2.调用游戏控制器对象的开始游戏方法,游戏就开始了
  Game.prototype.startGame = function () {
    //显示蛇和食物
    this.snake.render(this.map);

    this.food.render(this.map);

    //让蛇动起来
    // this.snake.move(); //调用蛇的move方法就让蛇动一下.
    // this.snake.render(this.map);//把新坐标蛇给重新渲染一下
    autoSnakeMove();

    //让蛇跟随键盘按键改变方向.
    bindKey();
  }


  //5.写一个方法,让蛇跟着键盘按键来改变方向.
  function bindKey(){
    //给页面添加一个键盘按下的事件.
    document.onkeydown = function (e) {
      e = e || window.event;
      //console.log(e.keyCode); //左37  上38  右39  下40
      switch (e.keyCode){
        case 37:
          if(this.snake.direction != 'right'){
            this.snake.direction = 'left';
          }
          break;
        case 38:
          if(this.snake.direction != 'bottom'){
            this.snake.direction = 'top';
          }
          break;
        case 39:
          if(this.snake.direction != 'left'){
            this.snake.direction = 'right';
          }
          break;
        case 40:
          if(this.snake.direction != 'top'){
            this.snake.direction = 'bottom';
          }
          break;
      }
    }.bind(that);
  }


  //4.让蛇不停的动
  function autoSnakeMove(){
    //写一个计时器,不停的调用蛇的move方法和render方法.
  var timerId =  setInterval(function () {
      //console.log(this);//window
      //console.log(this.snake);//undefined
      // this.snake.move(); //调用蛇的move方法就让蛇动一下.
      // this.snake.render(this.map);//把新坐标蛇给重新渲染一下

      //----------------------------------------------
      //我们要的是让这里的this指向 游戏控制器对象,而不是window对象.
      this.snake.move(this.food,this.map); //调用蛇的move方法就让蛇动一下.


      //判断蛇是否出界.判断蛇是否出界判断的是蛇头的坐标.
      var snakeHeadX = this.snake.body[0].x * this.snake.width; //蛇头的x坐标
      var snakeHeadY = this.snake.body[0].y * this.snake.height; //蛇头的y坐标
      if(snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX >= this.map.offsetWidth  || snakeHeadY >= this.map.offsetHeight){
        //出界了. 清空计时器
        alert('Game Over!');
        clearInterval(timerId);
        return;//如果算出来的新坐标已经出界了,就return,就不要执行后面的渲染方法.
      }
      //如果没有出界,就显示这个新坐标的蛇
      this.snake.render(this.map);//把新坐标蛇给重新渲染一下

    }.bind(that),300);
  }


  //3.把Game暴露出去
  window.Game = Game;

}(window));
