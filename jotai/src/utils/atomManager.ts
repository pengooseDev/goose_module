import { Atom, WritableAtom, atom } from 'jotai';

/**
 * AtomManager is an abstract class designed to encapsulate and manage the state logic using Jotai atoms.
 * It provides a structured way to define and access the state (`atom`) and its parts (`selectors`)
 * and actions (`actions`) to manipulate the state. This pattern allows for organizing state-related logic
 * in a more OOP-friendly manner, enhancing code maintainability and readability.
 *
 * @template T The type of the state managed by this AtomManager.
 */
export abstract class AtomManager<T> {
  protected initialState: T;
  protected atom: WritableAtom<T, any, void>;

  constructor(initialState: T) {
    this.initialState = initialState;
    this.atom = atom(this.initialState);
  }

  /**
   * Abstract property `selectors` should be implemented to return a mapping of functions
   * that utilize Jotai's `get` to read specific parts of the state.
   */
  abstract selectors: {
    [K in keyof T]: Atom<T[K]>;
  };

  /**
   * Abstract property `actions` should be implemented to return a mapping of functions
   * that utilize Jotai's `set` to update the state. These actions can be used to encapsulate
   * state mutations, making state management actions more discoverable and reusable.
   */
  abstract actions: {
    [key: string]: WritableAtom<T | null, any, void>;
  };
}

/**
 * AtomManagerStatic is an interface designed for extending AtomManager with static fields,
 * particularly for managing the initial state of the atom. This facilitates the optional
 * addition of a static `INITIAL_STATE` field when defining a concrete AtomManager class,
 * allowing for the encapsulation of the initial state within the class itself.
 *
 * @template T The type of the initial state managed by the AtomManager.
 */
export interface AtomManagerStatic<T> {
  new (initialState: T): AtomManager<T>;

  INITIAL_STATE: T;
}
