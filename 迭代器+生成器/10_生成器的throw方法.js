/*
 * @Date: 2022-02-09
 * @Description:
 */
function* sum(num) {
    console.log("=>", "函数开始执行");

    const value1 = 100 * num;
    console.log("111=>", value1);

    //return "123";
    //throw new Error("error 123");
    try {
        yield value1;
    } catch (error) {
        console.log("=>", "捕获到异常", error);
        yield "message error";
    }

    const value2 = 200;
    console.log("222=>", value2);
    const m = yield value2;
    const value3 = 300 * m;
    console.log("333=>", value3);
    yield 3;

    console.log("=>", "函数执行结束");
}

const generator = sum(5);

generator.next();
//捕获到异常 继续执行 / 抛出 暂停执行
console.log("=>", generator.throw());
//try {
//    //console.log("=>", generator.throw("error 123"));
//    generator.next();
//} catch (error) {
//    console.log("catch =>", error);
//}
