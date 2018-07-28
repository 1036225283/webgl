/**
 * Created by root on 2018/5/5.
 */


/**
 * 摄像机
 */
Camera = function (webgl) {
    this.gl = webgl.get();
    this.uCamera = webgl.uCamera;
    this.uPerspective = webgl.uPerspective;
    this.camera = new Util.Matrix().identity();
    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 0;
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
};

/**
 * 设置摄像机
 */
Camera.prototype.setCamera = function (camera) {
    if (camera != null) {
        this.camera = camera;
    }
    return this;
};
/**
 * 设置透视矩阵
 */
Camera.prototype.setPerspective = function (mat) {
    if (mat != null) {
        this.gl.uniformMatrix4fv(this.uPerspective, false, mat);
    }
    return this;
};
/**
 * 更新摄像机到着色器
 */
Camera.prototype.updateCamera = function () {
    this.camera.identity().translate(
        [this.translateX, this.translateY, this.translateZ]).rotateX(
        this.angleX).rotateY(this.angleY).rotateZ(this.angleZ);
    this.gl.uniformMatrix4fv(this.uCamera, false, this.camera.get());
    return this;
};
/**
 * 摄像机向前移动
 */
Camera.prototype.moveToBefore = function (z) {
    this.translateZ = z;
    return this;
};
/**
 * 摄像机向后移动
 */
Camera.prototype.moveToAfter = function (z) {
    this.translateZ = -z;
    return this;
};
/**
 * 摄像机向左移动
 */
Camera.prototype.moveToLeft = function (x) {
    this.translateX = x;
    return this;
};
/**
 * 摄像机向右移动
 */
Camera.prototype.moveToRight = function (x) {
    this.translateX = -x;
    return this;
};
/**
 * 摄像机向上移动
 */
Camera.prototype.moveToUp = function (y) {
    this.translateY = y;
    return this;
};
/**
 * 摄像机向下移动
 */
Camera.prototype.moveToDown = function (y) {
    this.translateY = -y;
    return this;
};
/**
 * 摄像机向左旋转
 */
Camera.prototype.rotateLeft = function (angle) {
    this.angleY = angle;
    return this;
};
/**
 * 摄像机向右旋转
 */
Camera.prototype.rotateRight = function (angle) {
    this.angleY = -angle;
    return this;
};
/**
 * 摄像机向上旋转
 */
Camera.prototype.rotateUp = function (angle) {
    this.angleX = angle;
    return this;
};
/**
 * 摄像机向下旋转
 */
Camera.prototype.rotateDown = function (angle) {
    this.angleX = -angle;
    return this;
};