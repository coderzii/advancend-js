/*
 * @Date: 2022-02-09
 * @Description:
 */
function* sum(num) {
    console.log("=>", "函数开始执行");

    const value1 = 100 * num;
    console.log("=>", value1);
    const n = yield value1;

    const value2 = 200 * n;
    console.log("=>", value2);
    const m = yield value2;
    const value3 = 300 * m;
    console.log("=>", value3);
    yield 3;

    console.log("=>", "函数执行结束");
}

const generator = sum(5);

console.log("=>", generator.next());
console.log("=>", generator.next(10)); //传入的参数在上一个yield返回接受

//抛出异常 throw
