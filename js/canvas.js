/**
 * 定义WEBGL对象
 */
Webgl = function (webgl) {
    /**
     * 定义WEBGL环境
     */
    this.webgl = webgl;
    /**
     * 定义着色器LIST
     */
    this.shaderList = new List();
    /**
     * 定义程序对象PROGRAM
     */
    this.program = webgl.createProgram();
    /**
     * 定义BUFFER LIST
     */
    this.bufferList = new List();
    /**
     * 定义着色器资源存放
     */
    this.vertexShaderSource = null;
    this.fragmentShaderSource = null;
    /**
     * 定义着色器属性存放
     */
    this.aVertexPosition = null;
    this.uPMatrix = null;
    this.uMVMatrix = null;
    this.uSampler = null;
    this.aTexture = null;
}

/**
 * 设置顶点着色器源码
 */
Webgl.prototype.setVertexShaderSource = function (source) {
    this.vertexShaderSource = source;
    return this;
}
/**
 * 设置片段着色器源码
 */
Webgl.prototype.setFragmentShaderSource = function (source) {
    this.fragmentShaderSource = source;
    return this;
}
/**
 * 获取webgl渲染环境
 */
Webgl.prototype.get = function () {
    return this.webgl;
}

/**
 * WEBGL对象加载着色器
 */
Webgl.prototype.loadShader = function () {
    var vertexShader = this.webgl.createShader(this.webgl.VERTEX_SHADER);
    var fragmentShader = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);

    this.webgl.shaderSource(vertexShader, this.vertexShaderSource);
    this.webgl.shaderSource(fragmentShader, this.fragmentShaderSource);

    var list = new List();
    list.add(vertexShader);
    list.add(fragmentShader);
    for (var i = 0; i < list.size(); i++) {
        var shader = list.get(i);
        this.webgl.compileShader(shader);
        if (!this.webgl.getShaderParameter(shader, this.webgl.COMPILE_STATUS)) {
            alert('Webgl.prototype.loadShader is Error complling shader ' +
                this.webgl.getShaderInfoLog(shader));
            this.webgl.deleteShader(shader);
        } else {
            this.shaderList.add(shader);
        }
    }
    return this;
}
/**
 * WEBGL对象链接着色器
 */
Webgl.prototype.linkShader = function () {
    for (var i = 0; i < this.shaderList.size(); i++) {
        var shader = this.shaderList.get(i);
        this.webgl.attachShader(this.program, shader);
    }

    this.webgl.linkProgram(this.program);

    if (!this.webgl.getProgramParameter(this.program, this.webgl.LINK_STATUS)) {
        alert('Webgl.prototype.linkShader Error init shader ');
    }
    this.webgl.useProgram(this.program);


    this.aVertexPosition = this.webgl.getAttribLocation(this.program, 'aVertexPosition');
    this.aTexture = this.webgl.getAttribLocation(this.program, 'aTexture');

    //this.uPMatrix = this.webgl.getUniformLocation(this.program, 'uPMatrix');
    this.uMVMatrix = this.webgl.getUniformLocation(this.program, 'uMVMatrix');
    this.uSampler = this.webgl.getUniformLocation(this.program, 'uSampler');

    return this
}
/**
 * Webgl 清屏
 */
Webgl.prototype.clear = function () {
    this.webgl.clearColor(0.2, 0.3, 0.3, 0.0);
    this.webgl.clear(this.webgl.COLOR_BUFFER_BIT | this.webgl.DEPTH_BUFFER_BIT);
    this.webgl.enable(this.webgl.DEPTH_TEST);
    return this;
}

/*************************************************************************************************************************************/
/**
 * 创建WebglObject
 */
WebglObject = function (webgl) {
    this.webgl = webgl.get();

    this.aVertexPosition = webgl.aVertexPosition;
    this.uPMatrix = webgl.uPMatrix;
    this.uMVMatrix = webgl.uMVMatrix;
    this.uSampler = webgl.uSampler;
    this.aTexture = webgl.aTexture;

    this.vertexBuffer = this.webgl.createBuffer();
    this.texture = this.webgl.createTexture();
    this.coordTextureBuffer = this.webgl.createBuffer();

    this.vertexObject;
    this.textureObject;

    this.mvMatrix;
    this.drawType = this.webgl.TRIANGLE_FAN;
    this.pMatrix = mat4.create();

}
/**
 * WebglObject 设置顶点对象
 */
WebglObject.prototype.setVertexObject = function (vertexObject) {
    this.vertexObject = vertexObject;
    this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.vertexBuffer);
    this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array(this.vertexObject.vertex), this.webgl.STATIC_DRAW);
    this.webgl.enableVertexAttribArray(this.aVertexPosition);
    return this;
}
/**
 * WebglObject 设置纹理对象
 */
WebglObject.prototype.setTextureObject = function (textureObject) {
    this.textureObject = textureObject;
    return this;
}
/**
 * WebglObject 设置纹理对象
 */
WebglObject.prototype.setTexture = function (i) {
    this.webgl.bindTexture(this.webgl.TEXTURE_2D, this.texture);

    //this.webgl.pixelStorei(this.webgl.UNPACK_FLIP_Y_WEBGL,true);
    this.webgl.texImage2D(this.webgl.TEXTURE_2D, 0, this.webgl.RGBA, this.webgl.RGBA, this.webgl.UNSIGNED_BYTE, i);

    this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MAG_FILTER, this.webgl.NEAREST);
    this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_MIN_FILTER, this.webgl.NEAREST);
    this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_WRAP_S, this.webgl.CLAMP_TO_EDGE);
    this.webgl.texParameteri(this.webgl.TEXTURE_2D, this.webgl.TEXTURE_WRAP_T, this.webgl.CLAMP_TO_EDGE);

    this.webgl.activeTexture(this.webgl.TEXTURE0);
    this.webgl.bindTexture(this.webgl.TEXTURE_2D, this.texture);
    this.webgl.uniform1i(this.uSampler, 0);

    this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.coordTextureBuffer);
    this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array(this.textureObject.vertex), this.webgl.STATIC_DRAW);
    this.webgl.vertexAttribPointer(this.aTexture, 2, this.webgl.FLOAT, false, 0, 0);
    this.webgl.enableVertexAttribArray(this.aTexture);

    //this.webgl.bindTexture(this.webgl.TEXTURE_2D,null);
    return this;
}
/**
 * WebglObject 加载图片
 */
WebglObject.prototype.loadImage = function (url) {
    var image = new Image();
    var me = this;
    image.onload = function () {
        me.setTexture(image);
    }
    image.src = url;
    return this;
}
/**
 * WebglObject 绘画
 */
WebglObject.prototype.draw = function () {
    mat4.identity(this.pMatrix)
    mat4.perspective(45, this.webgl.viewportWidth / this.webgl.viewportHeight, 0.1, 100.0, this.pMatrix);
    this.webgl.uniformMatrix4fv(this.uPMatrix, false, this.pMatrix);
    this.webgl.uniformMatrix4fv(this.uMVMatrix, false, this.mvMatrix);
    this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.vertexBuffer);
    this.webgl.vertexAttribPointer(this.aVertexPosition, 3, this.webgl.FLOAT, false, 0, 0);
    this.webgl.drawArrays(this.drawType, 0, this.vertexObject.numberOfItems);
    return this;
}
/**
 * WebglObject 设置视图模型矩阵
 */
WebglObject.prototype.setModelViewMatrix = function (mat) {
    this.mvMatrix = mat;
    return this;
}
/**
 * WebglObject 设置投影矩阵
 */
WebglObject.prototype.setProjectionMatrix = function (mat) {
    this.pMatrix = mat;
    return this;
}
/**
 * WebglObject 清屏
 */
WebglObject.prototype.clear = function () {
    this.webgl.clearColor(0.6, 1.0, 0.2, 1.0);
    this.webgl.clear(this.webgl.COLOR_BUFFER_BIT | this.webgl.DEPTH_BUFFER_BIT);
    this.webgl.enable(this.webgl.DEPTH_TEST);
    return this;
}
/**
 * WebglObject 设置图元类型
 */
WebglObject.prototype.setDrawType = function (type) {
    if (type == 'triangles' || type == 1) {
        this.drawType = this.webgl.TRIANGLES;
    } else if (type == 'triangle_strip' || type == 2) {
        this.drawType = this.webgl.TRIANGLE_STRIP;
    } else if (type == 'triangle_fan' || type == 3) {
        this.drawType = this.webgl.TRIANGLE_FAN;
    } else if (type == 'lines' || type == 4) {
        this.drawType = this.webgl.LINES;
    } else if (type == 'line_strip' || type == 5) {
        this.drawType = this.webgl.LINE_STRIP;
    } else if (type == 'line_loop' || type == 6) {
        this.drawType = this.webgl.LINE_LOOP;
    } else if (type == 'points' || type == 7) {
        this.drawType = this.webgl.POINTS;
    } else {
        throw alert('WebglObject.prototype.setDrawType Error')
    }
    return this;
}
/**
 * WebglObject 数据展示
 */
WebglObject.prototype.show = function () {
    alert(this.drawType)
    return this;
}
/*************************************************************************************************************************************/
/**
 * 创建Vertex对象
 */
Vertex = function (vertex, numberOfItems) {
    this.vertex = vertex;
    this.numberOfItems = numberOfItems;
}

Vertex.prototype.setVertex = function (vertex) {
    this.vertex = vertex;
    return this;
}

Vertex.prototype.setNumberOfItems = function (numberOfItems) {
    this.numberOfItems = numberOfItems;
    return this;
}

Vertex.prototype.getVertex = function () {
    return this.vertex;
}

Vertex.prototype.show = function () {
    alert(this.vertex.join('  ,  '));
    return this;
}

/*************************************************************************************************************************************/
/**
 * 辅助函数:getShaderSourceByScript() requestAnimFrame()
 */
/**
 * 通过JAVASCRIPT标签获取shader源码
 */
function getShaderSourceByScript(scriptId) {
    var shaderScript = document.getElementById(scriptId);
    if (shaderScript == null) return "";

    var sourceCode = "";
    var child = shaderScript.firstChild;
    while (child) {
        if (child.nodeType == child.TEXT_NODE) sourceCode += child.textContent;
        child = child.nextSibling;
    }

    return sourceCode;
}

$load = function (id) {
    try {
        var canvas = document.getElementById(id);
        var context = canvas.getContext('webgl');

        if (context == null) {
            throw '$(id) Error webgl is not found';
        } else {
            context.viewportWidth = canvas.width;
            context.viewportHeight = canvas.height;
            return new Webgl(context);
        }

    } catch (e) {
        alert(e);
    }
}

/**
 * 动画函数
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
