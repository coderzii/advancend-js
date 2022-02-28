/*
 * @Date: 2022-01-21
 * @Description:
 */

//TODO:  链式调用

const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class HPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                //delay call
                queueMicrotask(() => {
                    if (this.status !== PROMISE_STATUS_PENDING) return;
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
                    if (this.status !== PROMISE_STATUS_PENDING) return;
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

        return new HPromise((resolve, reject) => {
            if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
                try {
                    const value = onFulfilled(this.value);
                    resolve(value);
                } catch (error) {
                    reject(error);
                }
            }

            if (this.status === PROMISE_STATUS_REJECTED && onRejcted) {
                try {
                    const reason = onRejcted(this.reason);
                    resolve(reason);
                } catch (error) {
                    reject(error);
                }
            }

            if (this.status === PROMISE_STATUS_PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const value = onFulfilled(this.value);
                        resolve(value);
                    } catch (error) {
                        reject(error);
                    }
                });

                this.onRejectedCallbacks.push(() => {
                    try {
                        const reason = onRejcted(this.reason);
                        resolve(reason);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        });
    }
}

const p = new HPromise((resolve, reject) => {
    // these two case will all be added to micro queue (x)

    //
    console.log("=>", "pending ...");

    resolve("123");

    //pending status already end , call reject is invalid
    //reject("it's an error");
});

p.then(
    (res) => {
        console.log("then fulfilled res1 =>", res);
        return "aaa";
    },
    (err) => {
        console.log("then rejected err=>", err);
    }
).then((res) => {
    console.log("then fulfilled res2 => ", res);
});
