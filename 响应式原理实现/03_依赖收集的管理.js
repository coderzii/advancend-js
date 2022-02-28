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

/* weakmap */

const targetMap = new WeakMap();

function getDepend(target, key) {
    let map = targetMap.get(target);

    if (!map) {
        map = new Map();
        targetMap.set(target, map);
    }

    let depend = map.get(key);

    if (!depend) {
        depend = new Depend();
        map.set(key, depend);
    }

    return depend;
}

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

d.addDepend(function reactiveFn1() {
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
        const depend = getDepend(target, key);
        depend.notify();
        console.log("dependdepend=>", depend);
        Reflect.set(target, key, newValue, receiver);
    },
});

/* 一个对象对应一个map key为属性 value为对应的depend */
/* 对象之间用WeakMap保存 */

objProxy.name = "ziii";
