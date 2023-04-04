type BeforeLeaveCb = () => any | Promise<any>;

/**
 * DO NOT export this variable, it is PRIVATE!!!
 */
let _beforeLeaveListeners: BeforeLeaveCb[] = [];

export function setBeforeLeaveMiddleware(cb: BeforeLeaveCb) {
  _beforeLeaveListeners.push(cb);
}

export function resetBeforeLeaveMiddlewares() {
  _beforeLeaveListeners = [];
}

export async function runBeforeLeaveMiddlewares(): Promise<boolean> {
  for (let i = 0; i < _beforeLeaveListeners.length; i++) {
    try {
      await _beforeLeaveListeners[i]();
    } catch {
      return false;
    }
  }

  return true;
}