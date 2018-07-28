/**
 * 所有的全局变量都放在这里
 * Created by root on 2018/5/6.
 */


gl.global={};

//全局的web gl 对象
var webgl = null;

//全局的单位矩阵
var mat4GlobalIdentity = new Matrix().identity();

//全局的视图矩阵
var mat4GlobalViewMatrix = new Matrix().identity();

//全局的投影矩阵

//全局的更新视图func
var updateView = function () {

};

//全局画点对象
var oGlobalPoint = null;

//全局x的绝对值，从 -x 到 x 创建y的相应值，并以x，y中最大值进行归一化
var nGlobalFuncX = 500;

//鼠标移动事件所获得的x,y坐标
var nGlobalX = 0;
var nGlobalY = 0;