# 모듈 개발 가이드

막상 모듈 개발을 시작하려니 막막하신가요? 😨
또는, 새로운 관점들을 살펴보며 더 많이 성장하고 싶으신가요?

그렇다면, 개발 과정에서 아래의 문서들을 참고해보세요! 🥳

# 1. 아이디어 채택

"모듈 개발"이라고 하니, 갑자기 멋진 것들을 만들어야 할 것 같거나, 모종의 두려움이 생기시나요?

사실 우리는 이미 수 많은 모듈들을 개발했어요!
export를 이용해 컴포넌트나 constant, type, interface, 함수, 객체 등 자주 사용하는 코드를 재사용 가능하게 만든 것이 사실 모두 모듈을 만들어 낸 것이랍니다 :)

우리는 여기에 "배포"라는 과정을 추가해서, 이를 어느 프로젝트에서든 누구나 쉽게 사용할 수 있도록 만들 뿐이니 겁을 먹지 않았으면 좋겠어요!

`아래는 아이디어를 얻을 수 있는 팁과 모듈의 예시에요!`

## Tip

- 평소에 자주 쓰는 커스텀 훅이나, 유틸리티 코드, 그리고 아래에서 설명하는 다양한 예시들 모두가 멋진 모듈이 될 수 있어요.

- 기존에 사용하고 있는 기술이나 API를 둘러보며, 이를 추가적으로 어떻게 고도화 하고 어떤 문제를 해결할 수 있을지 생각해보세요.

- 개발하면서 자주 겪는 문제는 무엇인지 생각해보세요! redux-thunk 모듈의 경우 매주 400~500만 다운로드 수를 유지하고 있어요.

## 멋진 모듈 예시

### **[@toss/utils](https://slash.page/ko/libraries/common/utils/src/Numbers_floorAndFormatNumber.i18n)**

toss가 제공하는 다양한 편의성 라이브러리!

### [useSound](https://slash.page/ko/libraries/common/utils/readme.i18n/)

mp3 파일을 재생하는 커스텀 훅을 모듈화 한 라이브러리!

# 2. 기능명세서 작성

아이디어가 확정되면, 그 아이디어를 구체화 할 차례에요. 기능명세서를 작성하여 프로젝트의 목표와 구현할 기능에 대해 명확하게 정의하는 과정은 효율적이고 효과적으로 개발을 진행할 수 있게 한답니다. :)

아래는 theme 제공 모듈의 기능명세서 예시에요! 이해도를 돕기 위해 예시 코드를 추가했지만, 기능명세서를 처음 작성하는 경우라면 이렇게 코드까지 작성할 필요는 없어요! :)

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

- [ ] Button 컴포넌트는 ` variant` props를 통해 다양한 스타일을 제공한다. primary, secondary, outline, text 등을 제공한다.
- [ ] 가독성과 유지보수성 확보를 위해, Factory pattern으로 컴포넌트를 구현한다.
- [ ] Button 컴포넌트에서 제공하는 variant를 문서화한다.
- [ ] theme 객체를 @goose/theme 모듈로 분리하는 것을 고려하고 추후 업데이트에 반영한다.

### Theme

- [ ] theme 객체는 다음과 같은 interface로 제공된다.

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

- [ ] 추후 Themes에 추가될 theme들을 고민해보기.

### ThemeProvider

- [ ] 전역에서 접근할 수 있도록 Provider Pattern으로 구현한다.

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

- [ ] Provider에 제공되는 theme은 props를 통해 동적으로 변경할 수 있다.

---

# 3. 의존성 모듈 최소화

모듈을 개발하는 과정에서 `의존성 모듈을 최소화` 하는 것은 중요한 요소 중 하나에요! 그 이유는 아래와 같아요.

1. 유지보수 난이도 증가
   의존성이 많아질수록, 해당 라이브러리나 패키지들의 업데이트를 따라가고 버젼을 관리하는 것이 어려워져요. 업데이트 과정에서 하위 패키지의 버젼 이슈가 발생할 경우 코드를 리팩터링하는 과정이 추가되어야 해요!

2. 보안 이슈 발생 가능성 증가
   특정 라이브러리의 보안 이슈가 발생하여 깃허브로부터 경고 메일을 받고 놀라신 경험이 있으실거에요. 😨 각각의 의존성 모듈은 잠재적인 보안 취약점을 가지고 있기 때문에, 의존성 모듈이 많을수록 보안 이슈가 발생할 가능성은 높아져요.

3. 번들 크기 증가
   의존성 모듈이 많을수록 번들 크기 또한 증가해요. 웹 애플리케이션 초창기 로딩 속도나 빌드속도의 저하 원인이 돼요!

4. 비효율적인 트리 쉐이킹
   최신 빌드 도구들의 경우, 의존성 모듈에서 사용하지 않는 코드를 제거해요. 의존성 모듈이 트리 쉐이킹에 적합하지 않을 경우, 불필요한 코드가 번들에 포함되어 번들 크기에 악영향을 미칠 수 있어요!

5. 호환성
   최소한의 의존성을 가지는 모듈의 경우, 다양한 개발 환경과 프로젝트에 쉽게 적용될 수 있어요.
