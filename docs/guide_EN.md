# Module Development Guide

Feeling overwhelmed as you start developing modules? 😨 Or are you seeking new perspectives to further your growth?

If so, refer to the documents below during your development process! 🥳

# 1. Idea Adoption

Does the phrase "module development" make you feel like you need to create something amazing or provoke a certain kind of fear?

Actually, we've already developed countless modules!
Making frequently used codes like components, constants, types, interfaces, functions, and objects reusable through exports is essentially creating modules :)

All we're doing is adding a "deployment" process so that anyone can easily use them in any project, so don't be scared!

`Here are some tips and examples of modules to inspire your ideas!`

## Tip

- Custom hooks or utility codes you often use, and the various examples explained below, can all become great modules.

- Look around at the technologies or APIs you're currently using and consider how they could be further enhanced or what problems they could solve.

- Think about the problems you frequently encounter during development! For example, the redux-thunk module maintains about 4 to 5 million downloads per week.

## Module Examples

### **[@toss/utils](https://slash.page/ko/libraries/common/utils/src/Numbers_floorAndFormatNumber.i18n)**

A variety of convenience libraries provided by Toss!

### [useSound](https://slash.page/ko/libraries/common/utils/readme.i18n/)

A library that modularizes a custom hook for playing mp3 files!

# 2. Writing Function Specifications

Once your idea is confirmed, it's time to concretize that idea. Writing function specifications to clearly define the project's goals and functions to be implemented is a step towards efficient and effective development. :)

Below is an example of function specifications for a theme provision module! An example code is added to aid understanding, but if you're writing function specifications for the first time, there's no need to write code like this! :)

---

### Button

```tsx
import { Button, ThemeProvider, themes } from '@goose/style';

function App() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <div>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </ThemeProvider>
  );
}
```

- [ ] The Button component provides various styles through the variant props. It offers primary, secondary, outline, text, and more.
- [ ] For readability and maintainability, implement the components using the Factory pattern.
- [ ] Document the variants provided by the Button component.
- [ ] Consider separating the theme object into the @goose/theme module and reflecting it in future updates.

### Theme

- [ ] The theme object is provided with the following interface.

```tsx
interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
  fonts: {
    body: string;
    heading: string;
  };
}

type Themes = {
  light: Theme;
  dark: Theme;
};
```

- [ ] Consider additional themes to be added to Themes in the future.

### ThemeProvider

- [ ] Implement using the Provider Pattern for global access.

```tsx
import { Button, ThemeProvider, theme } from '@goose/style';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </ThemeProvider>
  );
}
```

- [ ] The theme provided to the Provider can be dynamically changed through props.

---

# 3. Minimizing Dependency Modules

During module development, minimizing dependency modules is one of the important elements! Here's why.

1. Increased maintenance difficulty
   The more dependencies, the more difficult it becomes to follow the updates and manage the versions of those libraries or packages. When issues with the version of a sub-package arise during an update, an additional process of code refactoring may be necessary!

2. Increased possibility of security issues
   You might have been surprised to receive a warning email from GitHub due to a security issue with a certain library. 😨 Each dependency module carries potential security vulnerabilities, so the more dependency modules, the higher the chance of security issues.

3. Increased bundle size
   The more dependency modules, the larger the bundle size, which can slow down the initial loading speed or build speed of a web application!

4. Inefficient tree shaking
   The latest build tools remove unused code from dependency modules. If a dependency module is not suitable for tree shaking, unnecessary code may be included in the bundle, adversely affecting the bundle size!

5. Compatibility
   Modules with minimal dependencies can be easily applied to various development environments and projects.
