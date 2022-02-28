/*
 * @Date: 2022-01-20
 * @Description:Proxy
 */

const obj = {
    name: "why",
};

const pProxy = new Proxy(obj, {
    get(target, key) {
        console.log("=>", "get", target, key, target[key]);
    },

    set(target, key, newValue) {
        console.log("=>", "set", newValue);
        target[key] = newValue;
    },
    has(target, key) {
        console.log("=>", "in 操作符", key);
        return key in target;
    },
    deleteProperty(target, key) {
        console.log("=>", "delete 操作符", key);
        delete target[key];
    },
});

pProxy.name;
pProxy.name = "hello";

//in
console.log("end =>", obj.name, "name" in pProxy);
//delete
delete pProxy.name;
