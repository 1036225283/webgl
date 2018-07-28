/**
 * WEB GL 应该分几个层次，1.最基本的层次，没有环境光，没有皮肤
 */

window.gl = {};


Webgl = function (webgl) {
    /**
     * 定义WEBGL环境
     */
    this.gl = webgl;
    //着色器列表
    this.shaderList = new List();
    //创建查询对象program
    this.program = webgl.createProgram();
    //buffer列表
    this.bufferList = new List();
    //着色器资源
    this.vertexShaderSource;
    this.fragmentShaderSource = null;
    //顶点属性
    this.aVertexPosition;// 顶点属性
    //顶点颜色属性
    this.attrVertexColor = null;
    //投影矩阵
    this.pMatrix = null;
    //视图矩阵
    this.vMatrix = null;
    this.uSampler = null;
    this.attrTextureCoordinates = null;
    // 颜色和纹理搭配方式
    this.uColorAndTexture = null;
    // 环境光
    this.uAmbientLightColor = null;
    //摄像机
    this.uCamera = null;
    //渲染等级
    this.nRenderLevel = 1;
};


//设置顶点着色器源码
Webgl.prototype.setVertexShaderSource = function (source) {
    this.vertexShaderSource = source;
    return this;
};

//设置片段着色器源码
Webgl.prototype.setFragmentShaderSource = function (source) {
    this.fragmentShaderSource = source;
    return this;
};

//获取webgl渲染环境
Webgl.prototype.get = function () {
    return this.gl;
};

//WEBGL对象加载着色器
Webgl.prototype.loadShader = function () {
    var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    this.gl.shaderSource(vertexShader, this.vertexShaderSource);
    this.gl.shaderSource(fragmentShader, this.fragmentShaderSource);

    var list = new List();
    list.add(vertexShader);
    list.add(fragmentShader);
    for (var i = 0; i < list.size(); i++) {
        var shader = list.get(i);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert('Webgl.prototype.loadShader is Error complling shader '
                + this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
        } else {
            this.shaderList.add(shader);
        }
    }
    return this;
};

//WEBGL对象链接着色器
//在链接着色器的时候，根据渲染等级选择是否有环境光等
Webgl.prototype.linkShader = function () {
    for (var i = 0; i < this.shaderList.size(); i++) {
        var shader = this.shaderList.get(i);
        this.gl.attachShader(this.program, shader);
    }

    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
        alert('Webgl.prototype.linkShader Error init shader ');
    }
    this.gl.useProgram(this.program);

    if (this.nRenderLevel == 0) {
        return this;
    }

    //顶点坐标
    this.aVertexPosition = this.gl.getAttribLocation(this.program, 'aVertexPosition');

    //顶点颜色
    this.attrVertexColor = this.gl.getAttribLocation(this.program, 'attrVertexColor');

    //皮肤坐标
    this.attrTextureCoordinates = this.gl.getAttribLocation(this.program, 'attrTextureCoordinates');

    //投影矩阵
    this.pMatrix = this.gl.getUniformLocation(this.program, 'pMatrix');

    //视图矩阵
    this.vMatrix = this.gl.getUniformLocation(this.program, 'vMatrix');

    //模型矩阵

    this.uSampler = this.gl.getUniformLocation(this.program, 'uSampler');
    this.uColorAndTexture = this.gl.getUniformLocation(this.program, 'uColorAndTexture');
    this.uAmbientLightColor = this.gl.getUniformLocation(this.program, 'uAmbientLightColor');
    return this;
};

//Webgl 清屏
Webgl.prototype.clear = function () {
    this.gl.clearColor(0.2, 0.3, 0.3, 0.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
    return this;
};

//Webgl测试
Webgl.prototype.setZ = function () {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.ALWAYS);
    return this;
};
Webgl.prototype.clearZ = function () {
    this.gl.disable(this.gl.NEVER);
    return this;
};

//更新视图矩阵
Webgl.prototype.updateViewMatrix = function (mat4) {
    this.gl.uniformMatrix4fv(this.vMatrix, false, mat4);
    return this;
};


//更新投影矩阵
Webgl.prototype.updatePerspectiveMatrix = function (mat4) {
    this.gl.uniformMatrix4fv(this.pMatrix, false, mat4);
    return this;
};

//设置颜色,纹理
Webgl.prototype.setColorAndTexture = function (value) {
    this.gl.uniform1i(this.uColorAndTexture, value);
    return this;
};

//遮挡剔除
Webgl.prototype.cullFace = function (flag) {
    if (flag == false) {
        this.gl.disable(this.gl.CULL_FACE);
    } else {
        this.gl.enable(this.gl.CULL_FACE);
    }
    return this;
};

//深度测试
Webgl.prototype.depthTest = function (flag) {
    if (flag == false) {
        this.gl.disable(this.gl.DEPTH_TEST);
    } else {
        this.gl.enable(this.gl.DEPTH_TEST);
    }
    return this;
};

//使各种属性失效:颜色 顶点 纹理
Webgl.prototype.disableVertexAttr = function () {
    this.gl.disableVertexAttribArray(this.attrTextureCoordinates);
    this.gl.disableVertexAttribArray(this.attrVertexColor);
    this.gl.disableVertexAttribArray(this.aVertexPosition);
    return this;
};



