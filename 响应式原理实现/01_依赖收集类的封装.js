/*
 * @Date: 2022-01-20
 * @Description:
 */

const obj = {
    name: "zii",
};

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

function fn1() {
    console.log("=>", "fn1", "name change");
}

obj.name = "ziii";

d.addDepend(fn1);

d.notify();
