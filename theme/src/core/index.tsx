import { useState, createContext, useContext } from 'react';

type Theme<T> = T extends object ? { [K in keyof T]: Theme<T[K]> }[keyof T] : T;
interface CreateThemeProps<T> {
  themes: T;
  initialTheme?: Theme<T>;
}

interface ThemeContextProps<T> {
  theme: Theme<T>;
  themes: T;
  setTheme: (theme: Theme<T>) => void;
}

export const createTheme = <T extends object>({
  themes,
  initialTheme,
}: CreateThemeProps<T>) => {
  const ThemeContext = createContext<ThemeContextProps<T>>({
    theme: (() => {
      throw new Error('Should be used inside ThemeProvider');
    }) as Theme<T>, // NOTE: Hacky trick to encapsulating error type from the user
    themes: (() => {
      throw new Error('Should be used inside ThemeProvider');
    }) as T,
    setTheme: () => {
      throw new Error('Should be used inside ThemeProvider');
    },
  });

  const Provider = ({ children }: React.PropsWithChildren) => {
    const defaultTheme = initialTheme
      ? initialTheme
      : (Object.values(themes)[0] as Theme<T>);

    const [currentTheme, setCurrentTheme] = useState<Theme<T>>(defaultTheme);
    const theme = currentTheme as string | undefined;

    return (
      <ThemeContext.Provider
        value={{
          theme: currentTheme,
          themes,
          setTheme: setCurrentTheme,
        }}
      >
        <div className={theme}>{children}</div>
      </ThemeContext.Provider>
    );
  };

  return {
    Provider,
    useContext: () => useContext(ThemeContext),
  };
};
