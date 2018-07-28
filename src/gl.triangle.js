/**
 * 绘制三角形的对象
 * Created by root on 2018/5/5.
 */


// 创建Triangle,首先是创建数据,其次是初始工作,再次是渲染工作
Triangle = function (webgl) {
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

    this.drawType = this.gl.TRIANGLES;

    this.ambientLightColor = [1, 1, 1];// 环境光
};


//设置顶点数据
Triangle.prototype.setVertex = function (vertex) {
    if (vertex != null) {
        this.vertex = vertex;
        this.vertexSize = vertex.length / 3;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertex), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(webgl.aVertexPosition);
    }
    return this;
};
Triangle.prototype.getVertex = function () {
    return this.vertex;
};

Triangle.prototype.setVertexSize = function (size) {
    this.vertexSize = size;
    return this;
};
Triangle.prototype.getVertexSize = function () {
    return this.vertexSize;
};

Triangle.prototype.setIndex = function (index) {
    if (index != null) {
        this.index = index;
        this.indexSize = this.index.length;
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index), this.gl.STATIC_DRAW);
    }
    return this;
};
Triangle.prototype.getIndex = function () {
    return this.index;
};

Triangle.prototype.setIndexSize = function (size) {
    this.indexSize = size;
    return this;
};

Triangle.prototype.getIndexSize = function () {
    return this.indexSize;
};

//设置纹理坐标
Triangle.prototype.setTextureCoord = function (textureCoord) {
    if (textureCoord != null) {
        this.textureCoord = textureCoord;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordTextureBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoord), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(webgl.attrTextureCoordinates);
    }
    return this;
};

Triangle.prototype.getTextureCoord = function () {
    return this.textureCoord;
};


Triangle.prototype.setColor = function (color) {
    if (color != null) {
        this.color = color;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.color), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(webgl.attrVertexColor, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(webgl.attrVertexColor);
    }
    return this;
};
Triangle.prototype.getColor = function () {
    return this.color;
};


//设置纹理对象
Triangle.prototype.setTexture = function (i) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, i);

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
    this.gl.enableVertexAttribArray(webgl.attrTextureCoordinates);

    return this;
};

//设置纹理对象
Triangle.prototype.setTextureById = function (id, textureCoord) {

    //设置纹理对象
    var img = document.getElementById(id);
    this.textureCoord = textureCoord;

    //绑定纹理对象
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    //将纹理对象上传到gpu
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);

    //定义纹理参数
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    // this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE);
    // this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE);

    this.gl.activeTexture(this.gl.TEXTURE0);
    //清理工作
    // this.gl.bindTexture(this.gl.TEXTURE_2D, null);


    //设置纹理坐标
    this.gl.uniform1i(webgl.uSampler, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordTextureBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoord), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(webgl.attrTextureCoordinates, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(webgl.attrTextureCoordinates);

    return this;
};

//加载图片
Triangle.prototype.loadImage = function (url) {
    var image = new Image();
    var self = this;
    image.onload = function () {
        self.setTexture(image);
        self.draw();
    };
    image.src = url;
    return this;
};


//绘画
Triangle.prototype.draw = function () {

    if (this.color != null) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.vertexAttribPointer(webgl.attrVertexColor, 4, this.gl.FLOAT,
            false, 0, 0);
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.vertexAttribPointer(webgl.aVertexPosition, 3, this.gl.FLOAT,
        false, 0, 0);
    if (this.index == null) {
        this.gl.drawArrays(this.drawType, 0, this.vertexSize);
    } else {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.drawElements(this.drawType, this.indexSize, this.gl.UNSIGNED_SHORT, 0);
    }

    return this;
};


//使用drawArrays绘画三角形
Triangle.prototype.draw0 = function (vertex) {
    this.vertex = vertex;
    this.vertexSize = vertex.length / 3;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertex), this.gl.STATIC_DRAW);
    this.gl.enableVertexAttribArray(webgl.aVertexPosition);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.vertexAttribPointer(webgl.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexSize);
    return this;
};

//使用ddrawElementsrawElements和gl.TRIANGLE_STRIP
Triangle.prototype.drawTRIANGLES = function (vertex, index) {
    this.vertex = vertex;
    this.index = index;


    //设置顶点数据
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertex), this.gl.STATIC_DRAW);
    //

    //设置索引数据
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index), this.gl.STATIC_DRAW);


    //绘画
    this.gl.vertexAttribPointer(webgl.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(webgl.aVertexPosition);

    this.gl.drawElements(this.gl.TRIANGLES, this.index.length, this.gl.UNSIGNED_SHORT, 0);

    webgl.disableVertexAttr();
    return this;
};

//测试顶点属性没有disable时上一次enable是否生效
Triangle.prototype.drawTRIANGLES2 = function (index) {
    this.index = index;

    //设置索引数据
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.index), this.gl.STATIC_DRAW);

    this.gl.disableVertexAttribArray(webgl.aVertexPosition);

    this.gl.drawElements(this.gl.TRIANGLES, this.index.length, this.gl.UNSIGNED_SHORT, 0);
    return this;
};


/**
 * Triangle 清屏
 */
//
Triangle.prototype.clear = function () {
    this.gl.clearColor(0.6, 1.0, 0.2, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
    return this;
};
/**
 * 清楚顶点缓存
 */
Triangle.prototype.clearVertexBuffer = function () {
    this.gl.deleteBuffer(this.vertexBuffer);
};
/**
 * 获取顶点缓存
 */
Triangle.prototype.getVertextBuffer = function () {
    return this.gl.readBuffer();
};
/**
 * Triangle 设置图元类型
 */
Triangle.prototype.setDrawType = function (type) {
    if (type == 'triangles' || type == 1) {
        this.drawType = this.gl.TRIANGLES;
    } else if (type == 'triangle_strip' || type == 2) {
        this.drawType = this.gl.TRIANGLE_STRIP;
    } else if (type == 'triangle_fan' || type == 3) {
        this.drawType = this.gl.TRIANGLE_FAN;
    } else {
        throw alert('Triangle.prototype.setDrawType Error');
    }
    return this;
};

/**
 * 设置环境光
 */
Triangle.prototype.setAmbientLightColor = function (color) {
    this.ambientLightColor = color;
    this.gl.uniform3fv(webgl.uAmbientLightColor, this.ambientLightColor);
    return this;
};
/**
 * Triangle 数据展示
 */
Triangle.prototype.show = function () {
    this.vertex;// 顶点数据
    this.vertexSize;// 顶点数量
    this.index;// 索引数据
    this.indexSize;// 索引数量
    this.textureCoord;// 纹理数据
    this.color;// 颜色数据
    return this;
};