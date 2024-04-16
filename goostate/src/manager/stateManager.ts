import { deepEqual } from '../utils/deepEqual';

export abstract class StateManager<T> {
  public listeners: Set<() => void> = new Set();

  private lastSnapshot: any = null;

  constructor(protected state: T) {}

  protected computeSnapshot(): StateManager<T>['selectors'] {
    const selectors = Object.fromEntries(
      Object.entries(this.selectors).map(([key, selectorFn]) => {
        const getSelector = selectorFn as () => any;
        const selector = getSelector();

        return [key, selector];
      })
    ) as StateManager<T>['selectors'];

    return selectors;
  }

  public getSnapshot(): StateManager<T>['selectors'] {
    const currentSnapshot = this.computeSnapshot();

    const isInitial = this.lastSnapshot === null;
    const isChanged = !deepEqual(this.lastSnapshot, currentSnapshot);

    if (isInitial || isChanged) this.lastSnapshot = currentSnapshot;

    return this.lastSnapshot;
  }

  public set(newState: Partial<T>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  abstract selectors: {
    [K in keyof Partial<T>]: any;
  };

  abstract actions: {
    [key: string]: (payload: any) => void;
  };
}
