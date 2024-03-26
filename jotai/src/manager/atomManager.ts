import { Atom, WritableAtom, atom } from 'jotai';

/**
 * AtomManager is an abstract class designed to encapsulate and manage state logic using Jotai atoms.
 * It provides a structured approach for defining and accessing state (via `atom`) as well as its parts (`selectors`)
 * and actions (`actions`) for state manipulation. This design pattern facilitates state-related logic organization
 * in an object-oriented programming (OOP) friendly manner, aiming to improve code maintainability and readability.
 *
 * @template T The type of the state this AtomManager manages.
 */
export abstract class AtomManager<T> {
  public initialState: T;
  protected atom: WritableAtom<T, any, void>;

  constructor(initialState: T) {
    this.initialState = initialState;
    this.atom = atom(this.initialState);
  }

  /**
   * The abstract property `selectors` must be implemented to return a mapping of functions
   * that leverage Jotai's `get` function to read specific parts of the state.
   * This mechanism allows for selective state access and encapsulation of state reading logic.
   */
  abstract selectors: {
    [K in keyof Partial<T>]: Atom<any>;
  };

  /**
   * The abstract property `actions` must be implemented to return a mapping of functions
   * that utilize Jotai's `set` function for state updates. These actions are designed to encapsulate
   * state mutation logic, enhancing the discoverability and reusability of state management operations.
   */
  abstract actions: {
    [key: string]: WritableAtom<T | null, any, void>;
  };
}

/**
 * AtomManagerStatic is an interface aimed at extending the AtomManager with static fields,
 * especially for handling the atom's initial state management. It introduces the possibility
 * of adding a static `INITIAL_STATE` field in concrete AtomManager class definitions,
 * thus encapsulating the initial state definition within the class structure.
 *
 * @template T The type of the initial state managed by an implementation of AtomManager.
 */
export interface AtomManagerStatic<T> {
  new (initialState: T): AtomManager<T>;

  INITIAL_STATE: T;
}
