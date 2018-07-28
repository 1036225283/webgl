/**
 * Created with JetBrains WebStorm.
 * User: 1036225283
 * Date: 15-5-11
 * Time: 下午9:42
 * To change this template use File | Settings | File Templates.
 */
/**
 * 将字符串数组转换为整型数组
 * @param stringArray
 * @return {Int8Array}
 */
function stringArrayToIntArray(stringArray){
    var intArray = new Array();
    for(var i=0;i<stringArray.length;i++){
        intArray[i]=parseInt(stringArray[i]);
    }
    return intArray;
}

UtilArray = {"stringArrayToIntArray":stringArrayToIntArray};