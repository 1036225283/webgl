/**
 * Created by root on 2018/5/5.
 */


var matrix = new Matrix();

//对图形进行变换
window.xws = {};
gl.util = {};

xws.data = {};

//获取值，如果内存中找不到，就到缓存里面去找
xws.get = function (key) {

    if (xws.data[key] != null) {
        return xws.data[key];
    }

    var cache = localStorage.getItem(key);
    if (cache != null) {
        return JSON.parse(cache)[key];
    }

    return null;
};

//设置值，给内存里面设置，同时更新到缓存里面去
xws.set = function (key, value) {
    xws.data[key] = value;
    var map = {};
    map[key] = value;
    localStorage.setItem(key, JSON.stringify(map));
};

//删除一个值
xws.del = function (key) {
    xws.data[key] = null;
    var map = {};
    map[key] = null;
    localStorage.setItem(key, JSON.stringify(map));
};

//给定一个原始坐标点，然后进行位移等操作，变成多个点
xws.initPoint = function (key) {
    xws.set(key, [0.0, 0.0, 0.0])
};


//选定一个对象
xws.selected = function (key) {
    if (key == null) {
        return xws.get(xws.get("selected"));
    }
    xws.set("selected", key);
};

//选择一个操作对象
xws.operation = function (key) {
    if (key == null) {
        return xws.get(xws.get("operation"))
    }
    xws.set("operation", key);
};

//拷贝操作对象
xws.copy = function () {
    var selected = xws.get("selected");
    var arr = xws.get(selected);
    var newArray = [];
    for (var i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
    }
    return newArray;
};

//x方向平移1个单位，并放到临时对象里面
xws.translateX = function (step) {
    var unit = 1;
    if (step) {
        unit = step;
    }

    matrix.identity();
    matrix.translateX(unit);
    var operation = xws.get("operation");
    var o_operation = xws.get(operation);

    matrix.vmul(o_operation);
    xws.set(operation, o_operation);

    return xws;

};

//y方向平移1个单位，并放到临时对象里面
xws.translateY = function (step) {
    var unit = 1;
    if (step) {
        unit = step;
    }

    matrix.identity();
    matrix.translateY(unit);
    var operation = xws.get("operation");
    var o_operation = xws.get(operation);

    matrix.vmul(o_operation);
    xws.set(operation, o_operation);

    return xws;

};

//z方向平移1个单位，并放到临时对象里面
xws.translateZ = function (step) {
    var unit = 1;
    if (step) {
        unit = step;
    }

    matrix.identity();
    matrix.translateZ(unit);
    var operation = xws.get("operation");
    var o_operation = xws.get(operation);

    matrix.vmul(o_operation);
    xws.set(operation, o_operation);

    return xws;

};

//x方向旋转1度，并放到临时对象里面
xws.rotateX = function (step) {
    var unit = 1;
    if (step) {
        unit = step;
    }

    matrix.identity();
    matrix.rotateX(unit);
    var operation = xws.get("operation");
    var o_operation = xws.get(operation);

    matrix.vmul(o_operation);
    xws.set(operation, o_operation);

    return xws;

};

//y方向旋转1度，并放到临时对象里面
xws.rotateY = function (step) {
    var unit = 10;
    if (step) {
        unit = step;
    }

    matrix.identity();
    matrix.rotateY(unit);
    var operation = xws.get("operation");
    var o_operation = xws.get(operation);

    matrix.vmul(o_operation);
    xws.set(operation, o_operation);

    return xws;

};

//z方向旋转1度，并放到临时对象里面
xws.rotateZ = function (step) {
    var unit = 1;
    if (step) {
        unit = step;
    }

    matrix.identity();
    matrix.rotateZ(unit);
    var operation = xws.get("operation");
    var o_operation = xws.get(operation);

    matrix.vmul(o_operation);
    xws.set(operation, o_operation);

    return xws;

};

//把临时对象追加到选中对象
xws.append = function () {
    var operation = xws.get("operation");
    var o_operation = xws.get(operation);

    var selected = xws.get("selected");
    var o_selected = xws.get(selected);

    if (o_operation.length > 0) {
        if (o_selected == null) {
            o_selected = [];
            xws.set(selected, o_selected);
        }

        for (var i = 0; i < o_operation.length; i++) {
            o_selected.push(o_operation[i]);
        }

    }

    xws.set(selected, o_selected);
    return xws;
};

//全局缩放
xws.uniformScale = function (step) {
    var unit = 0.5;
    if (step) {
        unit = step;
    }

    matrix.identity();
    matrix.uniformScale(unit);
    var selected = xws.get("selected");
    matrix.vmul(xws.get(selected));
};


xws.debug = function (boolean) {
    xws.set("debug", boolean);
};


//打印被选中的对象
xws.show_selected = function () {

    var debug = xws.get("debug");
    if (debug == null || debug == false) {
        return;
    }

    var selected = xws.get("selected");
    var o = xws.get(selected);

    var str = "selected." + selected + " = ";
    if (o != null && o.length > 0) {
        for (var i = 0; i < o.length; i++) {
            str = str + o[i] + ",";
        }
    } else {
        console.info("selected object is null")
    }
    console.info(str);
};

//打印被操作的对象
xws.show_operation = function () {

    var debug = xws.get("debug");
    if (debug == null || debug == false) {
        return;
    }

    var operation = xws.get("operation");
    var o = xws.get(operation);


    var str = "operation." + operation + " = ";
    if (o != null && o.length > 0) {
        for (var i = 0; i < o.length; i++) {
            str = str + o[i] + ",";
        }
    } else {
        console.info("operation object is null")
    }
    console.info(str);
};

//根据步长和列长，产生三角形带的顶点索引
gl.util.createIndexByStepAndColumn = function (step, column, end) {
    column = column - 1;
    var index = [];
    for (var i = column; i > 0; i--) {

        for (var k = 0; k < step - 1; k++) {
            index.push(i * step + k);
            index.push(i * step - step + k);
            index.push(i * step + k + 1);

            index.push(i * step + k + 1);
            index.push(i * step - step + k);
            index.push(i * step - step + k + 1);

        }
    }

    //end==true用于圆柱的分底
    if (end) {
        for (var k = 0; k < step - 1; k++) {
            index.push(k);
            index.push(column * step - step + k);
            index.push(k + 1);

            index.push(k + 1);
            index.push(column * step - step + k);
            index.push(column * step - step + k + 1);

        }
    }

    return index;
}

//根据步长和列长，产生线带的顶点索引,end:exist将最后一列和第一列结合起来
gl.util.createIndexByStepAndColumnLine = function (step, column, end) {
    column = column - 1;
    var index = [];
    for (var i = column; i > 0; i--) {
        for (var k = 0; k < step; k++) {
            index.push(i * step + k);
            index.push(i * step - step + k);
            // l.drawLINE_STRIP(array, index);
        }
        var last = index[index.length - 1];
        index.push(last);
        for (var k = 0; k < step; k++) {
            index.push(last - k);
        }
    }
    //end==true通常用在画圆柱的时候，进行闭合操作
    if (end) {
        index.push(0);
        for (var k = 0; k < step; k++) {
            index.push(k);
            index.push(column * step + k);
        }
    } else {
        index.push(0);
        for (var k = 0; k < step; k++) {
            index.push(step * column + k);
        }
    }
    return index;
};

//创建纹理坐标
gl.util.createTextureCoordinates = function (step, column) {

    var index = [];

    var y = 0;
    for (var i = 0; i < column; i++) {
        var x = 0;
        for (var k = 0; k < step; k++) {
            index.push(x);
            index.push(y);
            x = x + 1 / step;
        }
        y = y + 1 / column;
    }
    // console.info("皮肤index " + index);
    return index;
};


//根据顶点数量随机创建颜色,传入顶点数量
gl.util.createRandomColor = function (count) {
    var index = [];
    for (; count > 0; count--) {
        index.push(this.random_zero_one());
        index.push(this.random_zero_one());
        index.push(this.random_zero_one());
        index.push(1.0)
    }
    return index;
};

//创建0-1的随机数
gl.util.random_zero_one = function () {
    return Math.random().toFixed(3);
};


//获取js标签中的内容
function getShaderSourceByScript(scriptId) {
    var shaderScript = document.getElementById(scriptId);
    if (shaderScript == null)
        return "";

    var sourceCode = "";
    var child = shaderScript.firstChild;
    while (child) {
        if (child.nodeType == child.TEXT_NODE)
            sourceCode += child.textContent;
        child = child.nextSibling;

    }

    return sourceCode;
}

//加载用户id
$load = function (id) {
    try {
        var canvas = document.getElementById(id);
        var context = canvas.getContext('webgl');
        var webgl;

        if (context == null) {
            throw '$(id) Error gl is not found';
        } else {
            context.viewportWidth = canvas.width;
            context.viewportHeight = canvas.height;
            webgl = new Webgl(context);
            webgl.setVertexShaderSource(getShaderSourceByScript('shader-vs'));
            webgl.setFragmentShaderSource(getShaderSourceByScript('shader-fs'));
            webgl.loadShader().linkShader();
            return webgl;
        }

    } catch (e) {
        alert(e);
    }
};

//动画函数
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame || function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();