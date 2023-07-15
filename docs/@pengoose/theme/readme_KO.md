# @pengoose/theme

`@pengoose/theme`은 React 및 Next.js 프로젝트에서 사용할 수 있는 테마(컬러 팔레트)를 제공하는 모듈입니다. 이 모듈은 CSS-in-JS 라이브러리인 `styled-components`와 `emotion`과 함께 사용할 수 있습니다.

# 설치

```bash
npm install @pengoose/theme
```

# darkTheme

![](https://i.imgur.com/tOlYfht.png)

## Color

| 이름        | 색상                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| primary     | ![#30B198](https://via.placeholder.com/15/30B198/000000?text=+) `#30B198`                                     |
| secondary   | ![#FFC857](https://via.placeholder.com/15/FFC857/000000?text=+) `#FFC857`                                     |
| accentColor | ![#EF476F](https://via.placeholder.com/15/EF476F/000000?text=+) `#EF476F`                                     |
| default     | ![#E2E2E2](https://via.placeholder.com/15/E2E2E2/000000?text=+) `#E2E2E2`                                     |
| light       | ![#A4A5B2](https://via.placeholder.com/15/A4A5B2/000000?text=+) `#A4A5B2`                                     |
| transparent | ![#F5F6F7](https://via.placeholder.com/15/F5F6F7/000000?text=+) `#F5F6F7` (RGBA: `rgba(245, 246, 247, 0.65)`) |
| border      | ![#2C2D3C](https://via.placeholder.com/15/2C2D3C/000000?text=+) `#2C2D3C`                                     |

## Background

| 이름        | 색상                                                                      |
| ----------- | ------------------------------------------------------------------------- |
| default     | ![#191A23](https://via.placeholder.com/15/191A23/000000?text=+) `#191A23` |
| primary     | ![#14141C](https://via.placeholder.com/15/14141C/000000?text=+) `#14141C` |
| secondary   | ![#181821](https://via.placeholder.com/15/181821/000000?text=+) `#181821` |
| tertiary    | ![#393A49](https://via.placeholder.com/15/393A49/000000?text=+) `#393A49` |
| quaternary  | ![#82838F](https://via.placeholder.com/15/82838F/000000?text=+) `#82838F` |
| quinary     | ![#4F5060](https://via.placeholder.com/15/4F5060/000000?text=+) `#4F5060` |
| transparent | ![#21232E](https://via.placeholder.com/15/21232E/000000?text=+) `#21232E` |
| hover       | ![#1C1D2A](https://via.placeholder.com/15/1C1D2A/000000?text=+) `#1C1D2A` |

---

# lightTheme

![](https://i.imgur.com/TcxEV1F.png)

## Color

| 이름        | 색상                                                                                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| primary     | ![#30B198](https://via.placeholder.com/15/30B198/000000?text=+) `#30B198`                                  |
| secondary   | ![#FFC857](https://via.placeholder.com/15/FFC857/000000?text=+) `#FFC857`                                  |
| accentColor | ![#EF476F](https://via.placeholder.com/15/EF476F/000000?text=+) `#EF476F`                                  |
| default     | ![#191A23](https://via.placeholder.com/15/191A23/000000?text=+) `#191A23`                                  |
| light       | ![#E0E0E0](https://via.placeholder.com/15/E0E0E0/000000?text=+) `#E0E0E0`                                  |
| transparent | ![#191A23](https://via.placeholder.com/15/191A23/000000?text=+) `#191A23` (RGBA: `rgba(25, 26, 35, 0.65)`) |
| border      | ![#C9D5DB](https://via.placeholder.com/15/C9D5DB/000000?text=+) `#C9D5DB`                                  |

## Background

| 이름        | 색상                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| default     | ![#F8FAFB](https://via.placeholder.com/15/F8FAFB/000000?text=+) `#F8FAFB`                                     |
| primary     | ![#F0F1F5](https://via.placeholder.com/15/F0F1F5/000000?text=+) `#F0F1F5`                                     |
| secondary   | ![#E2E2E2](https://via.placeholder.com/15/E2E2E2/000000?text=+) `#E2E2E2`                                     |
| tertiary    | ![#C9D5DB](https://via.placeholder.com/15/C9D5DB/000000?text=+) `#C9D5DB`                                     |
| quaternary  | ![#B0BEC5](https://via.placeholder.com/15/B0BEC5/000000?text=+) `#B0BEC5`                                     |
| quinary     | ![#90A4AE](https://via.placeholder.com/15/90A4AE/000000?text=+) `#90A4AE`                                     |
| transparent | ![#F5F6F7](https://via.placeholder.com/15/F5F6F7/000000?text=+) `#F5F6F7` (RGBA: `rgba(245, 246, 247, 0.65)`) |
| hover       | ![#F0F1F5](https://via.placeholder.com/15/F0F1F5/000000?text=+) `#F0F1F5`                                     |

---

# 사용 방법

```tsx
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@pengoose/theme';
import { Components } from './yourComponents';

function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <button onClick={toggleTheme}>Toggle theme</button>
      <Components />
    </ThemeProvider>
  );
}

export default App;
```

styled-components 또는 emotion에서 제공하는 ThemeProvider의 theme props에 theme 객체를 전달하여 테마를 사용할 수 있습니다. :)

```tsx
import styled from 'styled-components';

const Component = styled.div`
  background: ${({ theme }) => theme.background.default};
`;
```
