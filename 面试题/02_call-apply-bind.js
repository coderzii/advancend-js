/*
 * @Date: 2021-12-31
 * @Description:
 */

Function.prototype.fnCall = function (thisArg, ...args) {
  const fn = this;

  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  thisArg.fn = fn;

  args = args || [];

  //   隐式绑定
  thisArg.fn(...args);

  delete thisArg.fn;
};

function sum() {
  console.log("=>", "函数被执行了");
  console.log("=>", this);
}

sum.fnCall("abc");
