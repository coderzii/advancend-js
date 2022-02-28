/*
 * @Date: 2022-02-09
 * @Description:
 */
 
const names = ["abc", "cba", "nba"];

function createIterator(arr) {
    let index = 0;
    return {
        next() {
            if (index < arr.length) {
                return {
                    done: false,
                    value: arr[index++],
                };
            } else {
                return {
                    done: true,
                    value: undefined,
                };
            }
        },
    };
}

const namesIterator = createIterator(names);
console.log("=>", namesIterator.next());
console.log("=>", namesIterator.next());
console.log("=>", namesIterator.next());
console.log("=>", namesIterator.next());
