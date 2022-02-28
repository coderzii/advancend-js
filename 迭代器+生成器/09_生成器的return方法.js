/*
 * @Date: 2022-02-09
 * @Description:
 */
function* sum(num) {
    console.log("=>", "函数开始执行");

    const value1 = 100 * num;
    console.log("111=>", value1);
    const n = yield value1;

    //return "123";

    const value2 = 200 * n;
    console.log("222=>", value2);
    const m = yield value2;
    const value3 = 300 * m;
    console.log("333=>", value3);
    yield 3;

    console.log("=>", "函数执行结束");
}

const generator = sum(5);

generator.next();

console.log("=>", generator.return("123")); //第二段代码不会执行 直接done true,
