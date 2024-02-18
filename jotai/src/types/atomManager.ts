import { Atom, WritableAtom } from 'jotai';

export type Selectors<T> = {
  [K in keyof Partial<T>]: Atom<T[K]>;
};

export type StrictSelectors<T> = { [K in keyof T]: Atom<T[K]> };

export type Actions<T> = {
  [key: string]: WritableAtom<T | null, any, void>;
};
