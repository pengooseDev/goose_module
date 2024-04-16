import { useSyncExternalStore } from 'react';
import { StateManager } from './stateManager';

export const useManager = <T extends StateManager<any>>(manager: T) => {
  const selectors = useSyncExternalStore(
    manager.subscribe.bind(manager),
    manager.getSnapshot.bind(manager)
  ) as {
    [K in keyof T['selectors']]: ReturnType<T['selectors'][K]>;
  };

  const actions = manager.actions as {
    [K in keyof T['actions']]: T['actions'][K];
  };

  return { selectors, actions };
};
