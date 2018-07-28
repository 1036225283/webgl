/**
 * Matrix
 * Created by root on 2018/7/5.
 */

Matrix = function (matrix) {
    this.matrix = new Float32Array(16);
    if (matrix) {
        var a = this.matrix;
        var b = matrix;
        a[0] = b[0];
        a[1] = b[1];
        a[2] = b[2];
        a[3] = b[3];
        a[4] = b[4];
        a[5] = b[5];
        a[6] = b[6];
        a[7] = b[7];
        a[8] = b[8];
        a[9] = b[9];
        a[10] = b[10];
        a[11] = b[11];
        a[12] = b[12];
        a[13] = b[13];
        a[14] = b[14];
        a[15] = b[15];
    }
    return this;
};
/**
 * Matrix设置值
 */
Matrix.prototype.set = function (matrix) {
    var a = this.matrix;
    var b = matrix;
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];
    a[4] = b[4];
    a[5] = b[5];
    a[6] = b[6];
    a[7] = b[7];
    a[8] = b[8];
    a[9] = b[9];
    a[10] = b[10];
    a[11] = b[11];
    a[12] = b[12];
    a[13] = b[13];
    a[14] = b[14];
    a[15] = b[15];
    return this;
};
/**
 * Matrix乘以向量数组，每个点3个分量
 */
Matrix.prototype.vmul = function (vec) {
    var x = null, y = null, z = null, w = 1;
    var m = this.matrix;
    for (var i = 0; i < vec.length; i++) {
        x = vec[i];
        y = vec[i + 1];
        z = vec[i + 2];
        vec[i] = x * m[0] + y * m[4] + z * m[8] + m[12];
        vec[i + 1] = x * m[1] + y * m[5] + z * m[9] + m[13];
        vec[i + 2] = x * m[2] + y * m[6] + z * m[10] + m[14];
        i = i + 2;
    }
    return this;
};
/**
 * Matrix乘以矩阵
 */
Matrix.prototype.mmul = function (mat) {
    var m = new Float32Array(16);
    var a = this.matrix;
    var b = mat.matrix;
    m[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
    m[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
    m[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
    m[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

    m[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
    m[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
    m[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
    m[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

    m[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
    m[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
    m[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
    m[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

    m[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
    m[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
    m[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
    m[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

    this.matrix = m;
    return this;
};
/**
 * Matrix复制矩阵,return Matrix
 */
Matrix.prototype.copy = function () {
    return new Matrix(this.matrix);
};
/**
 * Matrix获取矩阵,return matrix
 */
Matrix.prototype.get = function () {
    return this.matrix;
};
/**
 * Matrix展示矩阵
 */
Matrix.prototype.show = function () {
    var s = '';
    for (var i = 0; i < this.matrix.length; i++) {
        if (i == 4 || i == 8 || i == 12) {
            s = s + '\n\n';
        }
        s = s + this.matrix[i] + '\t';
    }
    alert(s);
    return this;
};
/**
 * Matrix初始化单位矩阵
 */
Matrix.prototype.identity = function () {
    var m = this.matrix;
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;

    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;

    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return this;
};
/**
 * Matrix缩放[x,y,z]
 */
Matrix.prototype.scale = function (vec) {
    var m = this.matrix;
    var x = vec[0], y = vec[1], z = vec[2];
    m[0] = m[0] * x;
    m[1] = m[1] * y;
    m[2] = m[2] * z;

    m[4] = m[4] * x;
    m[5] = m[5] * y;
    m[6] = m[6] * z;

    m[8] = m[8] * z;
    m[9] = m[9] * y;
    m[10] = m[10] * z;

    m[12] = m[12] * x;
    m[13] = m[13] * y;
    m[14] = m[14] * z;

    return this;
};
/**
 * Matrix等比缩放
 */
Matrix.prototype.uniformScale = function (s) {
    var m = this.matrix;
    m[0] = m[0] * s;
    m[1] = m[1] * s;
    m[2] = m[2] * s;

    m[4] = m[4] * s;
    m[5] = m[5] * s;
    m[6] = m[6] * s;

    m[8] = m[8] * s;
    m[9] = m[9] * s;
    m[10] = m[10] * s;

    m[12] = m[12] * s;
    m[13] = m[13] * s;
    m[14] = m[14] * s;

    return this;
};
/**
 * Matrix平移矩阵
 */
Matrix.prototype.translate = function (vec) {
    var m = this.matrix;
    var x = vec[0], y = vec[1], z = vec[2];

    m[0] = m[0] + m[3] * x;
    m[1] = m[1] + m[3] * y;
    m[2] = m[2] + m[3] * z;

    m[4] = m[4] + m[7] * x;
    m[5] = m[5] + m[7] * y;
    m[6] = m[6] + m[7] * z;

    m[8] = m[8] + m[11] * x;
    m[9] = m[9] + m[11] * y;
    m[10] = m[10] + m[11] * z;

    m[12] = m[12] + m[15] * x;
    m[13] = m[13] + m[15] * y;
    m[14] = m[14] + m[15] * z;

    return this;
};

Matrix.prototype.translateX = function (x) {
    this.translate([x, 0, 0]);
    return this;
};

Matrix.prototype.translateY = function (y) {
    this.translate([0, y, 0]);
    return this;
};

Matrix.prototype.translateZ = function (z) {
    this.translate([0, 0, z]);
    return this;
};

/**
 * Matrix X轴旋转矩阵
 */
Matrix.prototype.rotateX = function (angle) {
    var m = this.matrix;
    angle = angle * Math.PI / 180;
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    var m1 = m[1] * c - m[2] * s,
        m2 = m[1] * s + m[2] * c,
        m5 = m[5] * c - m[6] * s,
        m6 = m[5] * s + m[6] * c,
        m9 = m[9] * c - m[10] * s,
        m10 = m[9] * s + m[10] * c,
        m13 = m[13] * c - m[14] * s,
        m14 = m[13] * s + m[14] * c;

    m[1] = m1;
    m[2] = m2;

    m[5] = m5;
    m[6] = m6;

    m[9] = m9;
    m[10] = m10;

    m[13] = m13;
    m[14] = m14;

    return this;
};
/**
 * Matrix Y轴旋转矩阵
 */
Matrix.prototype.rotateY = function (angle) {
    var m = this.matrix;
    angle = angle * Math.PI / 180;
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    var m0 = m[0] * c + m[2] * s,
        m2 = -m[0] * s + m[2] * c,
        m4 = m[4] * c + m[6] * s,
        m6 = -m[4] * s + m[6] * c,
        m8 = m[8] * c + m[10] * s,
        m10 = -m[8] * s + m[10] * c,
        m12 = m[12] * c + m[14] * s,
        m14 = -m[12] * s + m[14] * c;

    m[0] = m0;
    m[2] = m2;

    m[4] = m4;
    m[6] = m6;

    m[8] = m8;
    m[10] = m10;

    m[12] = m12;
    m[14] = m14;

    return this;
};
/**
 * Matrix Z轴旋转矩阵
 */
Matrix.prototype.rotateZ = function (angle) {
    var m = this.matrix;
    angle = angle * Math.PI / 180;
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    var m0 = m[0] * c - m[1] * s,
        m1 = m[0] * s + m[1] * c,
        m4 = m[4] * c - m[5] * s,
        m5 = m[4] * s + m[5] * c,
        m8 = m[8] * c - m[9] * s,
        m9 = m[8] * s + m[9] * c,
        m12 = m[12] * c - m[13] * s,
        m13 = m[12] * s + m[13] * c;


    m[0] = m0;
    m[1] = m1;

    m[4] = m4;
    m[5] = m5;

    m[8] = m8;
    m[9] = m9;

    m[12] = m12;
    m[13] = m13;

    return this;
};
/**
 * Matrix初始化缩放矩阵
 */
Matrix.prototype.initScale = function (vec) {
    var m = this.matrix;
    m[0] = vec[0];
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;

    m[4] = 0;
    m[5] = vec[1];
    m[6] = 0;
    m[7] = 0;

    m[8] = 0;
    m[9] = 0;
    m[10] = vec[2];
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return this;
};
/**
 * Matrix初始化等比缩放矩阵
 */
Matrix.prototype.initUniformScale = function (s) {
    var m = this.matrix;
    m[0] = s;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;

    m[4] = 0;
    m[5] = s;
    m[6] = 0;
    m[7] = 0;

    m[8] = 0;
    m[9] = 0;
    m[10] = s;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return this;
};
/**
 * Matrix初始化平移矩阵
 */
Matrix.prototype.initTranslate = function (vec) {
    var m = this.matrix;
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;

    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;

    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;

    m[12] = vec[0];
    m[13] = vec[1];
    m[14] = vec[2];
    m[15] = 1;

    return this;
};
/**
 * Matrix初始化X轴旋转矩阵
 */
Matrix.prototype.initRotateX = function (angle) {
    var m = this.matrix;
    angle = angle * Math.PI / 180;
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;

    m[4] = 0;
    m[5] = cos;
    m[6] = sin;
    m[7] = 0;

    m[8] = 0;
    m[9] = -sin;
    m[10] = cos;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return this;
};
/**
 * Matrix初始化Y轴旋转矩阵
 */
Matrix.prototype.initRotateY = function (angle) {
    var m = this.matrix;
    angle = angle * Math.PI / 180;
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    m[0] = cos;
    m[1] = 0;
    m[2] = -sin;
    m[3] = 0;

    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;

    m[8] = sin;
    m[9] = 0;
    m[10] = cos;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return this;
};
/**
 * Matrix初始化Z轴旋转矩阵
 */
Matrix.prototype.initRotateZ = function (angle) {
    var m = this.matrix;
    angle = angle * Math.PI / 180;
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    m[0] = cos;
    m[1] = sin;
    m[2] = 0;
    m[3] = 0;

    m[4] = -sin;
    m[5] = cos;
    m[6] = 0;
    m[7] = 0;

    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;

    return this;
};

/**
 * 透视矩阵
 */
Matrix.prototype.perspective = function (fovy, aspect, near, far) {
    var m = this.matrix;
    var top = near * Math.tan(fovy * Math.PI / 360.0);
    var right = top * aspect;
    var left = -right;
    var bottom = -top;
    var rl = (right - left);
    var tb = (top - bottom);
    var fn = (far - near);
    // alert("left = "+left+" right = "+right+" bottom = "+bottom+" top
    // = "+top+" near = "+near)
    // alert("rl = "+rl+" tb = "+tb+" fn = "+fn)
    m[0] = (near * 2) / rl;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = (near * 2) / tb;
    m[6] = 0;
    m[7] = 0;
    m[8] = (right + left) / rl;
    m[9] = (top + bottom) / tb;
    m[10] = -(far + near) / fn;
    m[11] = -1;
    m[12] = 0;
    m[13] = 0;
    m[14] = -(far * near * 2) / fn;
    m[15] = 0;
    return this;
};
