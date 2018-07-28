/**
 * web socket
 * Created by xws on 2018/3/3.
 */

WSocket = function (strUrl) {
    this.ws = null;
    this.url = strUrl;
};

//初始化
WSocket.prototype.init = function (open, message, type) {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = function () {
        if (open != null) {
            open();
        }
    };

    this.ws.onmessage = function (evt) {
        if (message != null) {
            message(evt);
        }

    };

    if (type) {
        alert(type)
        this.ws.binaryType = 'arraybuffer'
    }


};

WSocket.prototype.send = function (strData) {
    this.ws.send(strData);
};

