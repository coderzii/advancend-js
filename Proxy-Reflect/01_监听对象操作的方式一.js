/*
 * @Date: 2022-01-20
 * @Description: Proxy-Reflect
 */

const obj = {
    name: "why",
    age: 18,
};

Object.defineProperty(obj, "name", {
    get() {
        console.log("=>访问");
    },
    set(v) {
        console.log("=>设置", v);
    },
});

const a = obj.name;
obj.name = "aaa";
