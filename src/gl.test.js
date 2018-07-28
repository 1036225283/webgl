/**
 * gl的测试代码都在这
 * Created by root on 2018/7/17.
 */

gl.test = {}
//测试点的绘制和颜色
gl.test.testPoint = function (p) {
    p.setColor(util.createRandomColor(6));
    p.setColorAndTexture(1);
    p.draw([0.2, -0.9, 0.0,
        1.3, -0.9, 0.0,
        2.4, -0.9, 0.0,
        3.5, -0.9, 0.0,
        4.6, -0.9, 0.0,
        5.7, -0.9, 0.0

    ]);
};

//测试一个点的颜色
gl.test.testPointOne = function (p) {
    p.setColor(util.createRandomColor(1));
    p.setColorAndTexture(1);
    p.draw([0.2, -0.9, 0.0]);
};

//测试两个点的颜色
gl.test.testPointTwo = function (p) {
    p.setColor(util.createRandomColor(2));
    p.setColorAndTexture(1);
    p.draw([0.2, -0.9, 0.0,
        1.3, -0.9, 0.0
    ]);
};

//测试两个点构成的线并着色
gl.test.testLineTwo = function (l) {
    l.setColor(util.createRandomColor(2));
    l.setColorAndTexture(1);
    l.draw0([-1.0, 0.0, 0.0], [1.0, 0.0, 0.0]);
};

//测试圆柱的线段图
gl.test.testLineCylinder = function (l) {
    index = createIndexByStepAndColumnLine(10, 36, true);
    l.setColor(util.createRandomColor(360));
    l.setColorAndTexture(2);
    l.drawLINE_STRIP(array, index);
};

//测试圆柱的点阵图
gl.test.testPointCylinder = function (p) {
    p.setColor(util.createRandomColor(360));
    p.setColorAndTexture(2);
    p.draw(array);

};

gl.test.testTriangleTexture = function (t) {

    // var index = createIndexByStepAndColumn(10, 36, true);
    // t.setColor(util.createRandomColor(360));
    t.setTextureById("myTexture", [
        0, 1,
        0, 0,
        1, 0,
        1, 1
    ]);
    webgl.setColorAndTexture(2);
    var a = 3;
    t.drawTRIANGLES([
        -a, a, 0.0,
        -a, -a, 0.0,
        a, -a, 0.0,
        a, a, 0], [0, 1, 2, 0, 2, 3]);

};

//测试顶点的生效
gl.test.testVertexEnable = function (t) {

    webgl.setColorAndTexture(0);
    var a = 3;
    t.drawTRIANGLES([
        -a, a, 0.0,
        -a, -a, 0.0,
        a, -a, 0.0,
        a, a, 0], [0, 1, 2]);

    t.drawTRIANGLES2([0, 1, 3])
};

