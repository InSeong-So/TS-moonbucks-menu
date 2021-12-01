export default class BasicObserver {
  observers: (() => void)[];
  constructor() {
    this.observers = [];
  }

  subscribe(listener: () => void) {
    this.observers.push(listener);

    return () => {
      this.observers = this.observers.filter(observer => observer !== listener);
    };
  }

  notifyAll() {
    this.observers.forEach(observer => {
      observer();
    });
  }
}
