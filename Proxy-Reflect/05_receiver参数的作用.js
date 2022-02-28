/*
 * @Date: 2022-01-20
 * @Description:
 */

const obj = {
    _name: "why",
    get name() {
        return this._name;
    },
    set name(v) {
        this._name = v;
    },
};

//obj.name = "kobe";

//console.log("=>", obj.name);

const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        console.log("=>", "访问get");
        /* receiver 代理对象 */
        console.log("=>", "receiver", receiver);
        // 改变get/set this指向
        return Reflect.get(target, key, receiver);
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue);
    },
});

objProxy.name = "kobe";

console.log(objProxy.name);
