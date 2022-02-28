/*
 * @Date: 2022-01-21
 * @Description:
 */

//TODO:  多次调用then 应该把executor依次执行

const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class HPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING;
        this.vlaue = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                console.log("=>", "resolve");
                //delay call
                queueMicrotask(() => {
                    this.status = PROMISE_STATUS_FULFILLED;
                    this.value = value;
                    //this.onFulfilled(value);
                    this.onFulfilledCallbacks.forEach((fn) => fn(value));
                });
            }
        };
        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                console.log("=>", "reject");

                //add func to the micro task quene
                queueMicrotask(() => {
                    this.status = PROMISE_STATUS_REJECTED;
                    this.reason = reason;
                    //this.onRejcted(reason);
                    this.onRejectedCallbacks.forEach((fn) => fn(reason));
                });
            }
        };

        executor(resolve, reject);
    }

    then(onFulfilled, onRejcted) {
        //this.onFulfilled = onFulfilled;

        //if when called , the status has been confirmed , call it now
        if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
            onFulfilled(this.value);
        }

        if (this.status === PROMISE_STATUS_REJECTED && onRejcted) {
            onRejcted(this.reason);
        }

        if (this.status === PROMISE_STATUS_PENDING) {
            onFulfilled && this.onFulfilledCallbacks.push(onFulfilled);
            onRejcted && this.onRejectedCallbacks.push(onRejcted);
        }
    }
}

const p = new HPromise((resolve, reject) => {
    resolve("123");

    //pending status already end , call reject is invalid
    //reject("it's an error");
});

p.then(
    (res) => {
        console.log("then fulfilled= res>", res);
    },
    (err) => {
        console.log("then rejected err=>", err);
    }
);

p.then(
    (res) => {
        console.log("then fulfilled= res2>", res);
    },
    (err) => {
        console.log("then rejected err2=>", err);
    }
);

setTimeout(() => {
    p.then((res) => {
        console.log("=> then res 3", res);
    });
}, 1000);
