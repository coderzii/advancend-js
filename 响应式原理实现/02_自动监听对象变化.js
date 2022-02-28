/*
 * @Date: 2022-01-20
 * @Description:
 */

const obj = {
    name: "zii",
    age: 18,
};

//Object.keys(obj).forEach((key) => {
//    Reflect.defineProperty(obj, key, {
//        get(target, key, receiver) {
//            Reflect.get(obj, target, key, receiver);
//        },
//        set(target, key, newValue, receiver) {
//            Reflect.set(obj, target, key, newValue, receiver);
//        },
//    });
//});
class Depend {
    constructor() {
        this.reactiveFns = [];
    }

    addDepend(fn) {
        this.reactiveFns.push(fn);
    }

    notify() {
        this.reactiveFns.forEach((fn) => fn());
    }
}

const d = new Depend();

d.addDepend(function reactiveFn1 () {
    console.log("=>", "changed .. ");
});

const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        console.log("=>", "访问get");
        /* receiver 代理对象 */
        console.log("=>", "receiver", receiver);
        // 改变get/set this指向
        return Reflect.get(target, key, receiver);
    },
    set(target, key, newValue, receiver) {
        /* actions while the dependency changed */
        d.notify();

        Reflect.set(target, key, newValue, receiver);
    },
});

objProxy.name = "ziii";
