/*
 * @Date: 2022-02-09
 * @Description:
 */
class ClassRoom {
    constructor(address, name, students) {
        this.address = address;
        this.name = name;
        this.students = students;
    }

    push(newStu) {
        this.students.push(newStu);
    }

    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.students.length) {
                    return {
                        done: false,
                        value: this.students[index++],
                    };
                } else {
                    return {
                        done: true,
                        value: undefined,
                    };
                }
            },
            return() {
                console.log("=>", "迭代器提前停止");
                //也需要返回一个对象
                return {
                    done: true,
                    value: undefined,
                };
            },
        };
    }
}

const room = new ClassRoom("shanghai", "room1", ["小明", "小红"]);

for (const stu of room) {
    console.log("stu=>", stu);
    //如何监听迭代器停止
    if (stu === "小明") break;
}

export {};
