import { useState, useCallback, useEffect } from 'react';
import { useStore } from './useStore';

type useAtomReturn<T> = [T, (update: SetStateAction<T>) => void];
const useAtom = <T>(atom: Atom<T>): useAtomReturn<T> => {
  const store = useStore();
  const [state, setState] = useState(() => store.read(atom));

  useEffect(() => {
    const unsubscribe = store.subscribe(atom, () => {
      setState(store.read(atom));
    });

    return unsubscribe;
  }, [store, atom]);

  const setAtom = useCallback(
    (update: SetStateAction<T>) => {
      store.write(atom, update);
    },
    [store, atom]
  );

  return [state, setAtom];
};

export const useAtomValue = <T>(atom: Atom<T>): T => {
  const [state] = useAtom(atom);
  return state;
};

type useSetAtomReturn<T> = (update: SetStateAction<T>) => void;
export const useSetAtom = <T>(atom: Atom<T>): useSetAtomReturn<T> => {
  const [, setAtom] = useAtom(atom);
  return setAtom;
};
