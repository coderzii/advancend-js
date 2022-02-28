/*
 * @Date: 2022-02-09
 * @Description:
 */

interface IParams {
    name: string;
    age: number;
}

type Foo = (name: string, age: number) => void;
