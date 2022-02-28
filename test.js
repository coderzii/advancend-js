/*
 * @Date: 2022-01-29
 * @Description:
 */

const arr = [{ a: 1, b: 2 }, { a: 2, b: 3 }, "ab", null];

const res = arr.map((item) => {
    if (item !== null) {
        return item;
    }
    return true;
});

console.log("=>", res);
