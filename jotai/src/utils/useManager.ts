import { Atom, WritableAtom, useAtomValue, useSetAtom } from 'jotai';
import { AtomManager } from '../manager';

// type ExtractSelectors<T> = {
//   [P in keyof T]: T[P] extends Atom<infer V> ? V : never;
// };

// type ExtractActions<T> = {
//   [P in keyof T]: T[P] extends WritableAtom<any, infer U, void>
//     ? (param: U[0]) => void
//     : never;
// };

export const useManager = <T extends AtomManager<any>>(manager: T) => {
  const selectors = Object.fromEntries(
    Object.entries(manager.selectors).map(([key, atom]) => [
      key,
      useAtomValue(atom),
    ])
  ) as {
    [P in keyof T['selectors']]: T['selectors'][P] extends Atom<infer V>
      ? V
      : never;
  };

  const actions = Object.fromEntries(
    Object.entries(manager.actions).map(([key, actionAtom]) => [
      key,
      useSetAtom(actionAtom),
    ])
  ) as {
    [P in keyof T['actions']]: T['actions'][P] extends WritableAtom<
      any,
      infer U,
      void
    >
      ? (param: U[0]) => void
      : never;
  };

  return { selectors, actions };
};
