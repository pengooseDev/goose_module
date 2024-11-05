# @pengoose/theme

This module have dependencies on `tailwindcss` & `Shadcn`.

## 1. Add Theme with TailwindCSS

You can createTheme easily with this [**Link**](https://gradient.page/tools/shadcn-ui-theme-generator)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    /* CSS Codes */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## 2. Add constants

```ts
const THEME = {
  default: '',
  dark: 'dark',
  cherryBlossom: 'cherry-blossom',
  linear: {
    pink: 'lg-pink',
    blue: 'lg-blue',
  },
} as const; // NOTE: should be `as const` to infer type properly.
```

## 3. Make type of `Theme`

```ts
type Theme = typeof THEME;
```

## 4. DI to `createTheme`

```ts
const Theme = createTheme<Theme>({
  themes: THEME,
  initialTheme: THEME.default, // NOTE: optional ;)
});
```

- the `const Theme` is assigned Object with `Provider` and `useContext`.

## 5. Add Provider

```tsx
import { Theme } from 'my-path/theme';

const Providers = ({ children }: React.PropsWithChildren) => {
  return <Theme.Provider>{children}</Theme.Provider>;
};
```

- NOTE: If you use hooks outside of the `Provider`, it will throw an error.

```bash
> Error: Should be used inside ThemeProvider
```

## 6. Use `useTheme`

```tsx
const Example = () => {
  const { theme, themes, setTheme } = Theme.useContext();

  console.log(theme, typeof theme);
  // > default, string
  console.log(themes, typeof themes);
  // > { default: '', dark: 'dark', cherryBlossom: 'cherry-blossom', linear: { pink: 'lg-pink', blue: 'lg-blue' } }, object

  return (
    <div>
      <>currentTheme : {theme}</>
      {Object.entries(themes).map(([key, value]) => {
        if (typeof value === 'object') {
          return Object.entries(value).map(([k, v]) => {
            return (
              <Button key={k} className={v} onClick={() => setTheme(v)}>
                {k}
              </Button>
            );
          });
        }

        return (
          <Button key={key} className={value} onClick={() => setTheme(value)}>
            {key}
          </Button>
        );
      })}
    </div>
  );
};
```
