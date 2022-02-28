/*
 * @Date: 2022-02-09
 * @Description:
 */

function requestData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url);
        }, 1000);
    });
}

function* getData() {
    const a = yield requestData("aaa");

    console.log("await=>", a);

    const b = yield requestData(a + "bbb");

    console.log("await=>", b);

    const c = yield requestData(b + "ccc");

    console.log("await=>", c);
}

//const generator = getData();

//generator.next().value.then((res) => {
//    generator.next(res).value.then((res) => {
//        generator.next(res).value.then((res) => {
//            generator.next(res);
//        });
//    });
//});

//auto exec
function execGenerator(fn) {
    const generator = fn();

    function exec(res) {
        const result = generator.next(res);

        if (result.done) {
            return result.value;
        } else {
            result.value.then((res) => {
                exec(res);
            });
        }
    }

    exec();
}

execGenerator(getData);
