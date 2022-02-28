/*
 * @Date: 2022-02-09
 * @Description:
 */

/** generator是一个特殊的迭代器
 * 1. next方法 一个无参数或者一个参数的函数,返回一个拥有done value两个属性的对象
 * 2. done 如果可以产生下一个值,则为false
 *         如果已经迭代完毕,则为true,这种情况下value是可选的,如它依然存在,即为迭代结束后的默认返回值
 * 3. value 返回值 (done为true时可省略)
 */

const iterator = {
    next() {
        return {
            done: true,
            value: 123,
        };
    },
};

const names = ["abc", "cba", "nba"];

const namesIterator = {
    times: 0,
    next() {
        this.times++;
        if (this.times === names.length) {
            return {
                done: true,
            };
        } else {
            return {
                done: false,
                value: names[this.times - 1],
            };
        }
    },
};

console.log("=>", namesIterator.next());
console.log("=>", namesIterator.next());
console.log("=>", namesIterator.next());

export {};
