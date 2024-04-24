import React, { createContext, useContext, PropsWithChildren } from 'react';

const StoreContext = createContext<Store | null>(null);

interface StoreProviderProps extends PropsWithChildren {
  store: Store;
}

export const Provider = ({ children, store }: StoreProviderProps) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error(
      'useStore must be used within a StoreProvider with a store props'
    );
  }
  return store;
};
