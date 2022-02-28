/*
 * @Date: 2022-02-11
 * @Description:
 */

require.config({
    paths: {
        foo: "./lib/foo",
        main: "./lib/main",
    },
});

require(["foo"], function (foo) {
    console.log("main.js=>", foo);
});
