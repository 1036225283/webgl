/**
 * Created by root on 2018/7/20.
 */

gl.useful = {};

//球体相关
gl.useful.Sphere = function (map) {
    this.radius = 5;
    this.poingCount = 19;
    this.edgeCount = 37;

    if (map) {
        if (map.radius) {
            this.radius = map.radius;
        }
    }

};


//圆柱相关
gl.useful.Cylinder = function (map) {

    this.high = 5;
    this.radius = 3;
    this.edgeCount = 37;

    if (map) {
        if (map.high) {
            this.high = map.high;
        }
        if (map.radius) {
            this.radius = map.radius;
        }
    }

};

//矩形相关
gl.useful.Rectangle = function (map) {

    this.height = 5;
    this.width = 5;

    if (map) {
        if (map.height) {
            this.height = map.height;
        }
        if (map.width) {
            this.width = map.width;
        }
    }

};

//圆盘相关
gl.useful.Disk = function (map) {

    this.poingCount = 6;
    this.edgeCount = 37;

    if (map) {
        if (map.poingCount) {
            this.poingCount = map.poingCount;
        }
        if (map.edgeCount) {
            this.edgeCount = map.edgeCount;
        }
    }
};

//圆球-创建点阵
gl.useful.Sphere.prototype.create = function () {

    xws.del("test");
    xws.del("need");
    xws.initPoint("xws");

    //设xws为被操作的对象
    xws.operation("xws");

    //操作结果追加到test中去
    xws.selected("test");

    xws.translateX(this.radius);
    for (var i = 0; i < this.poingCount; i++) {
        xws.append();
        xws.rotateZ(10);
    }

    xws.operation("test");
    xws.selected("need");

    for (var i = 0; i < this.edgeCount; i++) {
        xws.append();
        xws.rotateX(10);

    }

    this.array = xws.selected();
    console.info(xws.selected().length);

    return this;
};

//圆球-展示点阵
gl.useful.Sphere.prototype.showPoint = function () {
    webgl.setColorAndTexture(0);
    p.draw(this.array);
    return this;
};

//圆球-展示线框
gl.useful.Sphere.prototype.showLine = function () {

    if (this.indexLine == null) {
        this.indexLine = gl.util.createIndexByStepAndColumnLine(this.poingCount, this.edgeCount, true);

    }

    if (this.color) {
        l.setColor(this.color);
        webgl.setColorAndTexture(1);
    } else {
        webgl.setColorAndTexture(0);
    }
    l.drawLINE_STRIP(this.array, this.indexLine);
    return this;

};

//圆球-展示面体
gl.useful.Sphere.prototype.showTriangle = function () {

    if (this.index == null) {
        this.index = gl.util.createIndexByStepAndColumn(this.poingCount, this.edgeCount, true);
    }

    if (this.textureId) {
        t.setTextureById(this.textureId, gl.util.createTextureCoordinates(this.poingCount, this.edgeCount));
        webgl.setColorAndTexture(2);
    } else if (this.color) {
        t.setColor(this.color);
        webgl.setColorAndTexture(1);
    } else {
        webgl.setColorAndTexture(0);
    }

    t.drawTRIANGLES(this.array, this.index);
    return this;
};

gl.useful.Sphere.prototype.setColor = function (color) {
    if (color) {
        this.color = color;
    } else {
        this.color = gl.util.createRandomColor(this.poingCount * this.edgeCount);
    }
    return this;
};

gl.useful.Sphere.prototype.setTexture = function (textureId) {
    if (textureId) {
        this.textureId = textureId;
    }
    return this;
};

//圆柱-创建点阵
gl.useful.Cylinder.prototype.create = function () {
    xws.del("test");
    xws.del("need");
    xws.del("rou");
    xws.initPoint("xws");

    //设xws为被操作的对象
    xws.operation("xws");

    //操作结果追加到test中去
    xws.selected("test");

    for (var i = 0; i < this.high; i++) {
        xws.translateX();
        xws.append();
    }

    xws.operation("test");
    xws.selected("need");

    xws.translateZ(this.radius);
    for (var i = 0; i < this.edgeCount; i++) {
        xws.append();
        xws.rotateX(10);
    }

    this.array = xws.selected();
    return this;

};


//圆柱-展示点阵
gl.useful.Cylinder.prototype.showPoint = function () {
    webgl.setColorAndTexture(0);
    p.draw(this.array);
    return this;
};

//圆柱-展示线框
gl.useful.Cylinder.prototype.showLine = function () {
    if (this.indexLine == null) {
        this.indexLine = gl.util.createIndexByStepAndColumnLine(this.high, this.edgeCount, true);
    }

    if (this.color) {
        l.setColor(this.color);
        webgl.setColorAndTexture(1);
    } else {
        webgl.setColorAndTexture(0);
    }

    l.drawLINE_STRIP(this.array, this.indexLine);
    return this;
};

//圆柱-展示面体
gl.useful.Cylinder.prototype.showTriangle = function () {

    if (this.index == null) {
        this.index = gl.util.createIndexByStepAndColumn(this.high, this.edgeCount, true);
    }

    if (this.textureId) {
        t.setTextureById(this.textureId, gl.util.createTextureCoordinates(this.high, this.edgeCount));
        webgl.setColorAndTexture(2);
    } else if (this.color) {
        t.setColor(this.color);
        webgl.setColorAndTexture(1);
    } else {
        webgl.setColorAndTexture(0);
    }
    t.drawTRIANGLES(this.array, this.index);
    return this;
};

gl.useful.Cylinder.prototype.setColor = function (color) {
    if (color) {
        this.color = color;
    } else {
        this.color = gl.util.createRandomColor(this.high * this.edgeCount);
    }
    return this;
};

gl.useful.Cylinder.prototype.setTexture = function (textureId) {
    if (textureId) {
        this.textureId = textureId;
    }
    return this;
};


//矩形-创建点阵
gl.useful.Rectangle.prototype.create = function () {
    xws.del("test");
    xws.del("need");
    xws.del("rou");
    xws.initPoint("xws");
    xws.operation("xws");
    xws.selected("test");

    var i;
    for (i = 0; i < this.width; i++) {
        xws.translateX();
        xws.show_operation();
        xws.append();
    }

    xws.operation("test");
    xws.selected("need");

    for (i = 0; i < this.height; i++) {
        xws.translateY();
        xws.show_operation();
        xws.append();
    }


    this.array = xws.selected();
    return this;
};


//矩形-展示点阵
gl.useful.Rectangle.prototype.showPoint = function () {
    webgl.setColorAndTexture(0);
    p.draw(this.array);
    return this;
};

//矩形-展示线框
gl.useful.Rectangle.prototype.showLine = function () {

    if (this.indexLine == null) {
        this.indexLine = gl.util.createIndexByStepAndColumnLine(this.width, this.height, false);
    }

    if (this.color) {
        l.setColor(this.color);
        webgl.setColorAndTexture(1);
    } else {
        webgl.setColorAndTexture(0);
    }

    l.drawLINE_STRIP(this.array, this.indexLine);
    return this;
};

//矩形-展示面体
gl.useful.Rectangle.prototype.showTriangle = function () {

    if (this.index == null) {
        this.index = gl.util.createIndexByStepAndColumn(this.width, this.height, false);
    }

    if (this.textureId) {
        t.setTextureById(this.textureId, gl.util.createTextureCoordinates(this.width, this.height));
        webgl.setColorAndTexture(2);
    } else if (this.color) {
        t.setColor(this.color);
        webgl.setColorAndTexture(1);
    } else {
        webgl.setColorAndTexture(0);
    }

    t.drawTRIANGLES(this.array, this.index);
    return this;
};

gl.useful.Rectangle.prototype.setColor = function (color) {
    if (color) {
        this.color = color;
    } else {
        this.color = gl.util.createRandomColor(this.width * this.height);
    }
    return this;
};


gl.useful.Rectangle.prototype.setTexture = function (textureId) {
    if (textureId) {
        this.textureId = textureId;
    }
    return this;
};

//圆盘-创建点阵
gl.useful.Disk.prototype.create = function () {
    xws.del("test");
    xws.del("need");
    xws.initPoint("xws");

    //设xws为被操作的对象
    xws.operation("xws");

    //操作结果追加到test中去
    xws.selected("test");

    for (var i = 0; i < this.poingCount; i++) {
        xws.append();
        xws.translateX(1);
    }

    xws.operation("test");
    xws.selected("need");

    for (var i = 0; i < this.edgeCount; i++) {
        xws.rotateZ(10);
        xws.append();
    }

    this.array = xws.selected();
    return this;
};


//圆盘-展示点阵
gl.useful.Disk.prototype.showPoint = function () {
    webgl.setColorAndTexture(0);
    p.draw(this.array);
    return this;
};

//圆盘-展示线框
gl.useful.Disk.prototype.showLine = function () {

    if (this.indexLine == null) {
        this.indexLine = gl.util.createIndexByStepAndColumnLine(this.poingCount, this.edgeCount, false);
    }

    if (this.color) {
        l.setColor(this.color);
        webgl.setColorAndTexture(1);
    } else {
        webgl.setColorAndTexture(0);
    }

    l.drawLINE_STRIP(this.array, this.indexLine);
    return this;
};

//圆盘-展示面体
gl.useful.Disk.prototype.showTriangle = function () {
    if (this.index == null) {
        this.index = gl.util.createIndexByStepAndColumn(this.poingCount, this.edgeCount, true);
    }

    if (this.textureId) {
        t.setTextureById(this.textureId, gl.util.createTextureCoordinates(this.poingCount, this.edgeCount));
        webgl.setColorAndTexture(2);
    } else if (this.color) {
        t.setColor(this.color);
        webgl.setColorAndTexture(1);
    } else {
        webgl.setColorAndTexture(0);
    }


    t.drawTRIANGLES(this.array, this.index);
    return this;
};

gl.useful.Disk.prototype.setColor = function (color) {
    if (color) {
        this.color = color;
    } else {
        this.color = gl.util.createRandomColor(this.poingCount * this.edgeCount);
    }

    return this;
};


gl.useful.Disk.prototype.setTexture = function (textureId) {
    if (textureId) {
        this.textureId = textureId;
    }
    return this;
};