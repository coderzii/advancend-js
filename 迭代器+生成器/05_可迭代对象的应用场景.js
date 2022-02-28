/*
 * @Date: 2022-02-09
 * @Description:
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

// 1. for of
// 2. spread 展开运算符

const newnames = [...itetrableObj];
console.log("=>", newnames);

/**
 * const obj = {...obj} es9(es2018)新增特性 不是迭代器实现
 */

// 3. 解构赋值

// es9(es2018)新增特性
const [name1, name2] = itetrableObj;
console.log("name1 name2=>", name1, name2);

//4.创建一些其他对象时

const set = new Set(itetrableObj);
console.log("=>", set);

//5 .Array.from
const arr1 = Array.from(itetrableObj);
console.log("=> arr1", arr1);


//6. Promise.all
Promise.all()