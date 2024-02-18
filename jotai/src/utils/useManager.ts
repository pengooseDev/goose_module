import { useAtomValue, useSetAtom } from 'jotai';
import { AtomManager } from 'manager';
import { ExtractActions, ExtractSelectors } from 'types/useManager';

export const useManager = <T extends AtomManager<any>>(manager: T) => {
  const selectors = Object.fromEntries(
    Object.entries(manager.selectors).map(([key, atom]) => [
      key,
      useAtomValue(atom),
    ])
  ) as ExtractSelectors<T['selectors']>;

  const actions = Object.fromEntries(
    Object.entries(manager.actions).map(([key, actionAtom]) => [
      key,
      useSetAtom(actionAtom),
    ])
  ) as ExtractActions<T['actions']>;

  return { selectors, actions };
};
