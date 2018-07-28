/**
 * 定义List集合
 */
List = function (array) {
    this.array = new Array();
    if (array) {
        for (var i = 0; i < array.length; i++) {
            this.array[this.array.length] = array[i];
        }
    }
    return this;
};
/**
 * 向List集合中添加数据，数据是可以重复的
 */
List.prototype.add = function (a) {
    this.array[this.array.length] = a;
};
/**
 * 向List集合中添加数组 new List().addArray([1,2,3,4,5,6,7,8,9])
 */
List.prototype.addArray = function (array) {
    for (var i = 0; i < array.length; i++) {
        this.array[this.array.length] = array[i];
    }
};
/**
 * 向List中追加List
 */
List.prototype.addList = function (list) {
    var array = list.array;
    for (var i = 0; i < array.length; i++) {
        this.array[this.array.length] = array[i];
    }
};
/**
 * List复制
 */
List.prototype.copy = function () {
    var list = new List();
    list.addList(this);
    return list;
};
/**
 * List的大小
 */
List.prototype.size = function () {
    return this.array.length;
};
/**
 * List数据展示
 */
List.prototype.show = function () {
    alert(this.array.join('  ,  '));
};
/**
 * 获取List集合中的最后一个数据
 */
List.prototype.getLast = function () {
    if (this.array.length > 0) {
        return this.array[this.array.length - 1];
    } else {
        return null;
    }

};
/**
 * 移除List中最后一个元素
 */
List.prototype.removeLast = function () {
    this.array.pop();
    return this;
};
/**
 * 获取某个元素第一次出现的下标
 */
List.prototype.indexOf = function (o) {
    for (var i = 0; i < this.array.length; i++) {
        if (this.array[i] == o) {
            return o;
        }
        return null;
    }
};
/**
 * List获取指定下标的数据
 */
List.prototype.get = function (index) {
    return this.array[index];
};
/**
 * 将List转换为Float32Array
 */
List.prototype.toFloat32Array = function () {
    return new Float32Array(this.array);
};
/**
 * 将List转换为Array
 */
List.prototype.toArray = function () {
    return this.array;
};
/**
 * 获取List中Array
 */
List.prototype.getArray = function () {
    return this.array;
};
/**
 * 定义Set
 */
Set = function () {
    this.set = new Array();
};
/**
 * 向Set里添加数据，数据必须是唯一不可重复的
 */
Set.prototype.add = function (o) {
    for (var i = 0; i < this.set.length; i++) {
        try {
            if (this.set[i] == o) {
                throw 'Set的元素不可以重复';
            }
        } catch (e) {
            alert(e);
            return null;
        }
    }
    this.set[this.set.length] = o;
};
/**
 * 获取指定下标的Set集合的数据，下标从0开始
 */
Set.prototype.get = function (index) {
    return this.set[index];
};
/**
 * 获取Set集合的元素数量
 */
Set.prototype.size = function () {
    return this.set.length;
};
/**
 * 将Set集合转换为javascript数组Array（）
 */
Set.prototype.toArray = function () {
    return this.set;
};
/**
 * 将Set集合的数据打印出来
 */
Set.prototype.toString = function () {
    alert(this.set.join());
};
/**
 * 定义Map key是唯一的，值是任意的
 */
Map = function () {
    this.map = {};
};
/**
 * 向Map集合中压入数据，key必须是唯一的，值可以为空
 */
Map.prototype.put = function (key, value) {
    this.map[key] = value;
};
/**
 * 从Map集合中获取数据
 */
Map.prototype.get = function (key) {
    return this.map[key];
};
/**
 * 判断Map中是否有某个key值
 */
Map.prototype.containsKey = function (key) {
    var map = this.map;
    for (var k in map) {
        if (k == key) {
            return true;
        }
    }
    return false;
};
/**
 * 判断Map中是否有某个value值
 */
Map.prototype.containsValue = function (value) {
    var map = this.map;
    for (var key in map) {
        if (map[key] == value) {
            return true;
        }
    }
    return false;
};
/** ******************************************************************************************************************** */

Util = {List: List};