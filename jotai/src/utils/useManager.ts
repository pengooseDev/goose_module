import { useAtomValue, useSetAtom } from 'jotai';
import { ActionValues, Actions, SelectorValues, Selectors } from 'types';

export const useManager = <T>(atomManager: {
  selectors: Selectors<T>;
  actions: Actions<T>;
}) => {
  const selectors = Object.entries(atomManager.selectors).reduce(
    (acc, [key, selectorAtom]) => {
      acc[key as keyof T] = useAtomValue(selectorAtom);

      return acc;
    },
    {} as SelectorValues<T>
  );

  const actions = Object.entries(atomManager.actions).reduce(
    (acc, [key, actionAtom]) => {
      acc[key] = useSetAtom(actionAtom);

      return acc;
    },
    {} as ActionValues
  );

  return { selectors: { ...selectors }, actions: { ...actions } };
};
