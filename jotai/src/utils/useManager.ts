import { Atom, WritableAtom, useAtomValue, useSetAtom } from 'jotai';
import { AtomManager } from '../manager';

/**
 * @description
 * - wraps useAtomValue in atomManager's selectors and returns it.
 * @param {Atom<T>} atom
 * @returns
 */
const createUseSelector = <T>(atom: Atom<T>) => {
  return () => useAtomValue(atom);
};

/**
 * @description
 * - wraps useSetAtom in atomManager's actions and returns it.
 * @param {WritableAtom<T, any, void>} atom
 * @returns
 */
const createUseAction = <T>(atom: WritableAtom<T, any, void>) => {
  return () => useSetAtom(atom);
};

/**
 * @description
 * - wraps useAtomValue in atomManager's selectors and returns it.
 * - wraps useSetAtom in atomManager's actions and returns it.
 * - infers the type of each Atom and returns it.
 *
 * @param manager
 * @returns
 */
export const useManager = <T extends AtomManager<any>>(manager: T) => {
  /**
   * @description
   * - wraps useAtomValue in atomManager's selectors and returns it.
   * - infers the type of each Atom and returns it.
   */
  const selectors = Object.fromEntries(
    Object.entries(manager.selectors).map(([key, atom]) => [
      key,
      createUseSelector(atom)(),
    ])
  ) as {
    [P in keyof T['selectors']]: T['selectors'][P] extends Atom<infer V>
      ? V
      : never;
  };

  /**
   * @description
   * - wraps useSetAtom in atomManager's actions and returns it.
   * - infers the type of each Atom and returns it.
   */
  const actions = Object.fromEntries(
    Object.entries(manager.actions).map(([key, actionAtom]) => [
      key,
      createUseAction(actionAtom)(),
    ])
  ) as {
    [P in keyof T['actions']]: T['actions'][P] extends WritableAtom<
      any,
      infer U,
      void
    >
      ? U[0] extends undefined
        ? () => void
        : (param: U[0]) => void
      : never;
  };

  return { selectors, actions };
};

// type ExtractSelectors<T> = {
//   [P in keyof T]: T[P] extends Atom<infer V> ? V : never;
// };

// type ExtractActions<T> = {
//   [P in keyof T]: T[P] extends WritableAtom<any, infer U, void>
//     ? (param: U[0]) => void
//     : never;
// };
