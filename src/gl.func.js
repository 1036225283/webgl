/**
 * 函数都放在这里面
 *
 * 先绘画y = sin(x)
 * 在绘画y = x
 * Created by root on 2018/5/7.
 */

f2xadd3 = function () {
    var nMinX = -nGlobalFuncX;
    var nMaxX = nGlobalFuncX;


    var nMaxY = nMaxX * 2 + 3;
    var nMax = 10000;


    var tmpX = 0;
    var tmpY = 0;
    var vertex = [];

    //创建顶点并绘制
    for (var x = nMinX; x <= nMaxX; x++) {
        tmpX = parseFloat(x / nMax).toFixed(5);
        tmpY = parseFloat((f0(x) + f1(x) + f2(x)) / nMax).toFixed(5);
        vertex.push(tmpX);
        vertex.push(tmpY);
        vertex.push(0.0);
    }
    // console.info("version1.1");
    oGlobalPoint.draw(vertex);
};

docker = function (func) {
    var nMinX = -nGlobalFuncX;
    var nMaxX = nGlobalFuncX;

    var nMax = 400;

    var tmpX = 0;
    var tmpY = 0;
    var vertex = [];

    //创建顶点并绘制
    for (var x = nMinX; x <= nMaxX; x = x + 0.1) {
        tmpX = parseFloat(x / nMax).toFixed(5);
        tmpY = parseFloat(func(x) / nMax).toFixed(5);
        vertex.push(tmpX);
        vertex.push(tmpY);
        vertex.push(0.0);
    }
    //在此进行顶点缩放

    oGlobalPoint.draw(vertex);
};

sinx = function (x) {
    return Math.sin(x);
};

xy = function (x) {
    return x / 2;
};

sinx_xy = function (x) {
    return sinx(x) + xy(x);
};

mb = function (x) {

    //002222
    // var m = 0.11119512525568273 ;
    // var b = 0.848876845955842;

    //002505
    // var m = 0.03562675790269094 ;
    // var b = 1.085965324713486;

//002444
//     var m = 0.1569436116027882 ;
//     var b = 3.4846465339739465;
    //000820
    // var m = 0.11449704090003518 ;
    // var b = -1.1887617924528318;

//600660
    var m = 0.11610592698933568 ;
    var b = -1.0792146226415262;
    // console.info(m*x);
    return (m * x + b)*10;
};

f0 = function (x) {
    return 30;
};

f1 = function (x) {
    return 3 * x;
};

f2 = function (x) {
    return x * x;
};

f3 = function (x) {
    return x * x * x;
};

f4 = function (x) {
    return x * x * x * x;
};

f5 = function (x) {
    return x * x * x * x * x;
};