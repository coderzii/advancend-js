/*
 * @Date: 2022-01-20
 * @Description:
 */

const obj = { name: "why", age: 18 };

const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        /* receiver */
        return Reflect.get(target, key);
    },
    set(target, key, newValue, receiver) {
        /* target[key]=newValue 无法监听赋值的成功/失败 而Reflect可以返回一个布尔值 */
        Reflect.set(target, key, newValue);
    },
});

objProxy.name = "zii";

console.log(objProxy.name);
