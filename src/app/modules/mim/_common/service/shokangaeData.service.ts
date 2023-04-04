import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject({});

export const shokangaeDataService = {
  setShokangaeData: data => {
    return subject.next(data)
  },
  getShokangaeData: () => subject.asObservable(),
};