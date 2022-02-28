/*
 * @Date: 2022-02-09
 * @Description:
 * 1. 它和迭代器是一个不同概念
 * 2. 当一个对象实现了iterable protocol协议时,他就是一个可迭代对象
 * 3. 要求必须实现 @@iteraotor方法,在代码中我们可以使用Symbol.itetaor 访问该属性
 */

const itetrableObj = {
    names: ["abc", "cba", "nba"],
    [Symbol.iterator]: function () {
        let index = 0;
        return {
            next: () => {
                if (index < this.names.length) {
                    return {
                        done: false,
                        value: this.names[index++],
                    };
                } else {
                    return {
                        done: true,
                        value: undefined,
                    };
                }
            },
        };
    },
};

const iterator = itetrableObj[Symbol.iterator]();
//console.log("=>", iterator.next());
//console.log("=>", iterator.next());
//console.log("=>", iterator.next());
//console.log("=>", iterator.next());

for (let i of itetrableObj) {
    console.log("=>", i);
}
