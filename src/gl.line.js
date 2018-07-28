/**
 * 绘制线的对象
 * Created by root on 2018/5/5.
 */


//画线
Line = function (webgl) {
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

Line.prototype.setTextureCoord = function (textureCoord) {
    if (textureCoord != null) {
        this.textureCoord = textureCoord;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordTextureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(
            this.textureCoord), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(webgl.attrTextureCoordinates);
    }
    return this;
};
/**
 * 设置纹理坐标
 *
 * @param textureCoord
 * @returns {Line}
 */

Line.prototype.getTextureCoord = function () {
    return this.textureCoord;
};
Line.prototype.setTextureCoordSize = function (size) {
    this.textureCoordSize = size;
    return this;
};
Line.prototype.getTextureCoordSize = function () {
    return this.textureCoordSize;
};

Line.prototype.setColor = function (color) {
    if (color != null) {
        this.color = color;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.color), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(webgl.attrVertexColor, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(webgl.attrVertexColor);
    }
    return this;
};
Line.prototype.getColor = function () {
    return this.color;
};


//设置纹理对象
Line.prototype.setTexture = function (i) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA,
        this.gl.RGBA, this.gl.UNSIGNED_BYTE, i);

    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
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
//给定两个点，画线
Line.prototype.draw0 = function (start, end) {


    this.vertex = [];
    this.vertex[0] = start[0];
    this.vertex[1] = start[1];
    this.vertex[2] = start[2];

    this.vertex[3] = end[0];
    this.vertex[4] = end[1];
    this.vertex[5] = end[2];

    this.vertexSize = this.vertex.length / 3;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertex), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(webgl.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(webgl.aVertexPosition);
    this.gl.drawArrays(this.gl.LINES, 0, this.vertexSize);

    return this;
};

//给定多个点，画线
// Line.prototype.draw1 = function () {
//
//     // if (this.color != null) {
//     //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
//     //     this.gl.vertexAttribPointer(webgl.attrVertexColor, 4, this.gl.FLOAT, false, 0, 0);
//     // }
//     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
//     this.gl.vertexAttribPointer(webgl.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
//
//     this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
//     this.gl.drawElements(this.gl.LINE_STRIP, this.indexSize, this.gl.UNSIGNED_SHORT, 0);
//     return this;
// };


//使用drawElementsrawElements和gl.LINES
Line.prototype.drawLINES = function (vertex, index) {
    this.vertex = vertex;
    this.index = index;


    //设置顶点数据
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertex), this.gl.STATIC_DRAW);


    //设置索引数据
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index), this.gl.STATIC_DRAW);


    //绘画
    this.gl.vertexAttribPointer(webgl.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(webgl.aVertexPosition);

    this.gl.drawElements(this.gl.LINES, this.index.length, this.gl.UNSIGNED_SHORT, 0);

    webgl.disableVertexAttr();
    return this;
};

//使用drawElementsrawElements和gl.LINE_STRIP
Line.prototype.drawLINE_STRIP = function (vertex, index) {
    this.vertex = vertex;
    this.index = index;


    //设置顶点数据
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertex), this.gl.STATIC_DRAW);


    //设置索引数据
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index), this.gl.STATIC_DRAW);


    //绘画
    this.gl.vertexAttribPointer(webgl.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(webgl.aVertexPosition);

    this.gl.drawElements(this.gl.LINE_STRIP, this.index.length, this.gl.UNSIGNED_SHORT, 0);
    return this;
};

//给定多个点，画线，首尾相接
Line.prototype.draw2 = function () {

    if (this.color != null) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.vertexAttribPointer(webgl.attrVertexColor, 4, this.gl.FLOAT, false, 0, 0);
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.vertexAttribPointer(webgl.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
    if (this.index == null) {
        this.gl.drawArrays(this.gl.LINE_LOOP, 0, this.vertexSize);
    } else {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.drawElements(this.gl.LINE_LOOP, this.indexSize, this.gl.UNSIGNED_SHORT, 0);
    }

    return this;
};


/**
 * Line 清屏
 */
Line.prototype.clear = function () {
    this.gl.clearColor(0.6, 1.0, 0.2, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
    return this;
};
/**
 * 清楚顶点缓存
 */
Line.prototype.clearVertexBuffer = function () {
    this.gl.deleteBuffer(this.vertexBuffer);
};
/**
 * 获取顶点缓存
 */
Line.prototype.getVertextBuffer = function () {
    return this.gl.readBuffer();
};


/**
 * 设置环境光
 */
Line.prototype.setAmbientLightColor = function (color) {
    this.ambientLightColor = color;
    this.gl.uniform3fv(webgl.uAmbientLightColor, this.ambientLightColor);
    return this;
};
/**
 * Line 数据展示
 */
Line.prototype.show = function () {
    this.vertex;// 顶点数据
    this.vertexSize;// 顶点数量
    this.index;// 索引数据
    this.indexSize;// 索引数量
    this.textureCoord;// 纹理数据
    this.textureCoordSize;// 纹理数量
    this.color;// 颜色数据
    return this;
};

