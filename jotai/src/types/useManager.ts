import { Atom, WritableAtom } from 'jotai';

export type ExtractSelectors<T> = {
  [P in keyof T]: T[P] extends Atom<infer V> ? V : never;
};

export type ExtractActions<T> = {
  [P in keyof T]: T[P] extends WritableAtom<any, infer U, void>
    ? (param: U[0]) => void
    : never;
};
