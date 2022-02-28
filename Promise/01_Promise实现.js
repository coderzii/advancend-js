/*
 * @Date: 2022-01-21
 * @Description:
 */

const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class HPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING;
        this.vlaue = undefined;
        this.reason = undefined;

        const resolve = (value) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                console.log("=>", "resolve");
                this.status = PROMISE_STATUS_FULFILLED;

                //delay call
                queueMicrotask(() => {
                    this.value = value;
                    this.onFulfilled(value);
                });
            }
        };
        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                console.log("=>", "reject");
                this.status = PROMISE_STATUS_REJECTED;

                //add func to the micro task quene
                queueMicrotask(() => {
                    this.reason = reason;
                    this.onRejcted(reason);
                });
            }
        };

        executor(resolve, reject);
    }

    then(onFulfilled, onRejcted) {
        this.onFulfilled = onFulfilled;
        this.onRejcted = onRejcted;
    }
}

const p = new HPromise((resolve, reject) => {
    //resolve("123");

    //pending status already end , call reject is invalid
    reject("it's an error");
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
