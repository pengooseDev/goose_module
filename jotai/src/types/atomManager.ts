import { Atom, WritableAtom, useAtomValue, useSetAtom } from 'jotai';

// atomManager
export type SelectorAtom<T> = Atom<T>;
export type ActionAtom<T> = WritableAtom<T | null, any, void>;

// useManager
export type Selectors<T> = Record<string, SelectorAtom<T>>;
export type Actions<T> = Record<string, ActionAtom<T>>;

export type SelectorValues<T> = {
  [K in keyof T]: ReturnType<typeof useAtomValue>;
};
export type ActionValues = { [key: string]: ReturnType<typeof useSetAtom> };
