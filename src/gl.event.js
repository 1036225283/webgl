//对鼠标移动事件的处理
mouseMove = function (evt) {
    var nStep = 30;

    var x = evt.offsetX;
    var y = evt.offsetY;

    if (nGlobalX == 0) {
        nGlobalX = x;
        nGlobalY = y;
        return;
    }

    var tmpX = nGlobalX - x;
    var tmpY = nGlobalY - y;


    if (tmpX >= 10 || tmpX <= -10) {
        nGlobalX = x;
        mat4GlobalViewMatrix.rotateY(tmpX / 3);

    }

    if (tmpY >= 10 || tmpY <= -10) {
        nGlobalY = y;
        mat4GlobalViewMatrix.rotateX(tmpY / 3);

    }

    webgl.updateViewMatrix(mat4GlobalViewMatrix.get());
    updateView();

};