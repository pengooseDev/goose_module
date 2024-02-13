import { Atom, WritableAtom, atom } from 'jotai';

/**
 * StrictAtomManager is an abstract class designed to encapsulate and manage state logic using Jotai atoms
 * with a stricter approach than AtomManager. It mandates the implementation of selectors for every property
 * of the state, ensuring a comprehensive and direct management of state access and manipulation.
 * This class enhances the structure and discipline in state management, facilitating the organization of state logic
 * in a manner that is friendly to object-oriented programming (OOP) principles, thereby aiming to boost code
 * maintainability and readability.
 *
 * @template T The type of the state this StrictAtomManager manages.
 */
export abstract class StrictAtomManager<T> {
  protected initialState: T;
  protected atom: WritableAtom<T, any, void>;

  constructor(initialState: T) {
    this.initialState = initialState;
    this.atom = atom(this.initialState);
  }

  /**
   * The abstract property `selectors` in StrictAtomManager demands a mapping for every key of the state type T,
   * leveraging Jotai's `get` function for specific state part access. This strict requirement ensures full coverage
   * and encapsulation of state reading logic, facilitating selective access to all state parts.
   */
  abstract selectors: {
    [K in keyof T]: Atom<T[K]>;
  };

  /**
   * The abstract property `actions` must be implemented to return a mapping of functions
   * that utilize Jotai's `set` function for state updates. These actions are designed to encapsulate
   * state mutation logic, similar to AtomManager, but with a focus on the strict management paradigm,
   * enhancing the discoverability and reusability of state management operations.
   */
  abstract actions: {
    [key: string]: WritableAtom<T | null, any, void>;
  };
}

/**
 * StrictAtomManagerStatic is an interface aimed at extending the StrictAtomManager with static fields,
 * particularly for managing the atom's initial state in a strict manner. It introduces the concept of
 * defining a static `INITIAL_STATE` field in concrete StrictAtomManager class definitions, encapsulating
 * the initial state definition within the class itself. This approach ensures a tightly integrated initial
 * state management, adhering to the stricter state management requirements of the StrictAtomManager.
 *
 * @template T The type of the initial state managed by an implementation of StrictAtomManager.
 */
export interface StrictAtomManagerStatic<T> {
  new (initialState: T): StrictAtomManager<T>;

  INITIAL_STATE: T;
}
