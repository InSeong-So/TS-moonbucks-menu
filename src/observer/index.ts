// 현재 아무 역할도 하고 있지 않습니다!
export default class Observer {
  subscribers: any[];
  constructor() {
    this.subscribers = [];
  }

  subscribe = (listener: (...args: any[]) => any) => {
    this.subscribers.push(listener);

    return () => {
      this.subscribers = this.subscribers.filter(subscriber => subscriber !== listener);
    };
  };

  notify = () => {
    this.subscribers.forEach(subscriber => subscriber());
  };
}
