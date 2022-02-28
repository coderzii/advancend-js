/*
 * @Date: 2022-02-09
 * @Description:
 */

//function createIterator(arr) {
//    let index = 0;
//    return {
//        next() {
//            if (index < arr.length) {
//                return {
//                    done: false,
//                    value: arr[index++],
//                };
//            } else {
//                return {
//                    done: true,
//                    value: undefined,
//                };
//            }
//        },
//    };
//}

function* createIterator1(arr) {
    let index = 0;
    while (index < arr.length) {
        yield arr[index++];
    }
}
function* createIterator2(arr) {
    yield* arr;
}
const names = ["abc", "cba", "nba"];
//const iterator1 = createIterator1(names);

//console.log("=>", iterator1.next());
//console.log("=>", iterator1.next());
//console.log("=>", iterator1.next());
//console.log("=>", iterator1.next());

const iterator2 = createIterator2(names);

console.log("=>", iterator2.next());
console.log("=>", iterator2.next());
console.log("=>", iterator2.next());
console.log("=>", iterator2.next());

class ClassRoom {
    constructor(address, name, students) {
        this.address = address;
        this.name = name;
        this.students = students;
    }

    push(newStu) {
        this.students.push(newStu);
    }

    [Symbol.iterator] = function* () {
        yield* this.students;
    };

    //*[Symbol.iterator]() {
    //    yield* this.students;
    //}
}
const room = new ClassRoom("shanghai", "room1", ["小明", "小红"]);

for (const stu of room) {
    console.log("stu=>", stu);
}
