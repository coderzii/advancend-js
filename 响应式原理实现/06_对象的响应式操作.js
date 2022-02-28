/*
 * @Date: 2022-01-20
 * @Description: Depend perfs
 */

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
let activeReactiveFn = null;

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
        //method 2.  this.reactiveFns = new Set();
        this.reactiveFns = [];
    }

    depend() {
        //avoid add activeReactiveFn repeatedly
        //method 1.

        if (activeReactiveFn && !this.reactiveFns.includes(activeReactiveFn)) {
            console.log("=>", "..tinajia");
            this.reactiveFns.push(activeReactiveFn);
            //method 2.  this.reactiveFns.add(activeReactiveFn);
        }
    }

    notify() {
        this.reactiveFns.forEach((fn) => fn());
    }
}

function watchFn(fn) {
    activeReactiveFn = fn;
    fn();
    activeReactiveFn = null;
}

const d = new Depend();

//const objProxy = new Proxy(obj, {
//    get: function (target, key, receiver) {
//        /* receive dependencies */
//        const depend = getDepend(target, key);
//        depend.depend();
//        // 改变get/set this指向
//        return Reflect.get(target, key, receiver);
//    },
//    set(target, key, newValue, receiver) {
//        /* actions while the dependency changed */
//        const depend = getDepend(target, key);
//        depend.notify();
//        Reflect.set(target, key, newValue, receiver);
//    },
//});

/* 一个对象对应一个map key为属性 value为对应的depend */
/* 对象之间用WeakMap保存 */
//watchFn(function () {
//    console.log("fn1 call 1=>", objProxy.name);
//    console.log("fn1 call 2=>", objProxy.name);
//});

//const info = {
//    address: "广州市",
//    height: 1.88,
//};

function reactive(obj) {
    const objProxy = new Proxy(obj, {
        get: function (target, key, receiver) {
            /* receive dependencies */
            const depend = getDepend(target, key);
            depend.depend();
            // 改变get/set this指向
            return Reflect.get(target, key, receiver);
        },
        set(target, key, newValue, receiver) {
            /* actions while the dependency changed */
            const depend = getDepend(target, key);
            depend.notify();
            Reflect.set(target, key, newValue, receiver);
        },
    });

    return objProxy;
}

const info = reactive({
    address: "广州市",
    height: 1.88,
});

watchFn(function () {
    console.log("=>", "watch", info.address);
});

console.log("=>", "change");

info.address = "长沙市";
