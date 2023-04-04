export{}
declare global {
  interface Array<T>  {
    removeLast(): T[];
    getLast(): T;
  }
}

if (!Array.prototype.removeLast) {
  //eslint-disable-next-line no-extend-native
  Array.prototype.removeLast = function () {
    this.pop();

    return this;
  }
}

if (!Array.prototype.getLast) {
  //eslint-disable-next-line no-extend-native
  Array.prototype.getLast = function () {
    return this[this.length - 1];
  }
}
