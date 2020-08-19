/** {Defer} Promise-like объект, способный резолвиться извне @class
  *
  */
  export default class Deferred {
  /** Создание отложенного обещания {Deferred} @constructor
    */
    constructor() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject  = reject;
      });
      this.then  = this.promise.then .bind(this.promise);
      this.catch = this.promise.catch.bind(this.promise);
      this[Symbol.toStringTag] = 'Promise';
    }
  }
