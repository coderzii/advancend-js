/*
 * @Date: 2022-02-09
 * @Description:
 * 特殊的迭代器
 * 控制函数的执行过程
 * 生成器函数 返回值是生成器 (function后面加个 * )
 * 通过yield关键字控制函数进程
 */
//function foo() {
//    const value1 = 100;
//    console.log("=>", value1);

//    const value2 = 200;
//    console.log("=>", value2);

//    const value3 = 300;
//    console.log("=>", value3);
//}

function* foo() {
    console.log("=>", "函数开始执行");

    const value1 = 100;
    console.log("=>", value1);
    yield 1;

    const value2 = 200;
    console.log("=>", value2);
    yield 2;
    const value3 = 300;
    console.log("=>", value3);
    yield 3;

    console.log("=>", "函数执行结束");
}

const generator = foo();

console.log("=>", generator);
console.log("=>", generator.next());
console.log("=>", generator.next());
console.log("=>", generator.next());
console.log("=>", generator.next());
