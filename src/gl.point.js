/**
 * 绘制点的对象
 * Created by root on 2018/5/5.
 */



//画线
Point = function (webgl) {
    this.gl = webgl.get();

    this.coordTextureBuffer = this.gl.createBuffer();
    this.vertexBuffer = this.gl.createBuffer();
    this.indexBuffer = this.gl.createBuffer();
    this.colorBuffer = this.gl.createBuffer();
    this.texture = this.gl.createTexture();

    this.vertex = null;// 顶点数据
    this.vertexSize = null;// 顶点数量
    this.index = null;// 索引数据
    this.indexSize = null;// 索引数量
    this.textureCoord = null;// 纹理数据
    this.textureCoordSize = null;// 纹理数量
    this.color = null;// 颜色数据

    this.ambientLightColor = [1, 1, 1];// 环境光
};

Point.prototype.setTextureCoord = function (textureCoord) {
    if (textureCoord != null) {
        this.textureCoord = textureCoord;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordTextureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoord), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(webgl.attrTextureCoordinates);
    }
    return this;
};
/**
 * 设置纹理坐标
 *
 * @param textureCoord
 * @returns {Point}
 */

Point.prototype.getTextureCoord = function () {
    return this.textureCoord;
};
Point.prototype.setTextureCoordSize = function (size) {
    this.textureCoordSize = size;
    return this;
};
Point.prototype.getTextureCoordSize = function () {
    return this.textureCoordSize;
};

Point.prototype.setColor = function (color) {
    if (this.color != null) {
        this.color = color;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.color), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(webgl.attrVertexColor, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(webgl.attrVertexColor);
    }
    return this;
};
Point.prototype.getColor = function () {
    return this.color;
};


//设置纹理对象
Point.prototype.setTexture = function (i) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA,
        this.gl.RGBA, this.gl.UNSIGNED_BYTE, i);

    this.gl.texParameteri(this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    // this.gl.texParameteri(this.gl.TEXTURE_2D,
    // this.gl.TEXTURE_WRAP_S,
    // this.gl.CLAMP_TO_EDGE);
    // this.gl.texParameteri(this.gl.TEXTURE_2D,
    // this.gl.TEXTURE_WRAP_T,
    // this.gl.CLAMP_TO_EDGE);

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.uniform1i(webgl.uSampler, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordTextureBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoord), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(webgl.attrTextureCoordinates, 2, this.gl.FLOAT, false, 0, 0);
    return this;
};
//绘制单个顶点
Point.prototype.draw = function (vertex) {
    this.vertex = vertex;
    this.vertexSize = this.vertex.length / 3;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertex), this.gl.STATIC_DRAW);

    this.gl.vertexAttribPointer(webgl.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(webgl.aVertexPosition);

    this.gl.drawArrays(this.gl.POINTS, 0, this.vertexSize);

    webgl.disableVertexAttr();

    return this;
};


/**
 * Point 清屏
 */
Point.prototype.clear = function () {
    this.gl.clearColor(0.6, 1.0, 0.2, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
    return this;
};
/**
 * 清楚顶点缓存
 */
Point.prototype.clearVertexBuffer = function () {
    this.gl.deleteBuffer(this.vertexBuffer);
};
/**
 * 获取顶点缓存
 */
Point.prototype.getVertextBuffer = function () {
    return this.gl.readBuffer();
};
/**
 * 设置环境光
 */
Point.prototype.setAmbientLightColor = function (color) {
    this.ambientLightColor = color;
    this.gl.uniform3fv(webgl.uAmbientLightColor, this.ambientLightColor);
    return this;
};

