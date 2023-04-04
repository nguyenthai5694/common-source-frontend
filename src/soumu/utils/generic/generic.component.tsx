import { Component } from 'react'
import { Subscription } from 'rxjs'

/**
 * Features:
 * - unsubcribe when component unmount.
 */
export default class GenericComponent<P = any, S = any> extends Component<P, S> {
  public readonly subscription = new Subscription();

  public updateState<K extends keyof S>(k: K, v: S[K]) {
    this.setState({
      [k]: v,
    } as any);
  }
}