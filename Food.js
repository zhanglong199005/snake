(function (window) {
  //所有关于食物的代码都写在这个文件中.

  //用list数组来存放食物div.
  var list = [];
  //1.食物是对象,所以有创建食物对象的构造函数.
  function Food(width,height,bgColor,x,y){
    this.width = width || 20;
    this.height = height || 20;
    this.bgColor = bgColor ||'green';
    this.x = x || 0;
    this.y = y || 0;
  }

  //2.把食物对象显示在地图上.
  Food.prototype.render = function (map) {
    //渲染新食物之前删除老食物div.
    remove(map);

    //2.1 随机食物的xy坐标.
    this.x = Math.floor(Math.random() * map.offsetWidth/this.width) * this.width;
    this.y = Math.floor(Math.random() *map.offsetHeight / this.height)*this.height;
    //2.2 创建一个div.让这个div拥有这个食物对象的所有显示信息.
    var div1 = document.createElement('div');
    div1.style.position = "absolute";
    div1.style.left = this.x + "px";
    div1.style.top = this.y +"px";
    div1.style.width = this.width + "px";
    div1.style.height = this.height + "px";
    div1.style.backgroundColor = this.bgColor;
    //2.3 把这个div添加到map地图中.
    map.appendChild(div1);

    //把显示食物的div存进list数组中
    list.push(div1);
  }


  //3.删除老的食物对象.
  function remove(map){
    for(var i = 0 ; i < list.length; i++){
    	map.removeChild(list[i]);
    }
    //清空list
    list.length = 0;
  }


  //把Food给暴露给window对象
  window.Food = Food;

}(window));

