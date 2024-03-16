# @pengoose/funnel

<div align="center">

<h3>🚀 Funnel</h3>
   <picture width="350">
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/pengooseDev/goose_module/assets/73521518/b6e173a5-14fe-46fa-b5b8-9cdae09f3958" width="350">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/pengooseDev/goose_module/assets/73521518/78f1f5f5-dee5-4e8b-b066-3986534818fa" width="350">
    <img alt="IMAGE" src="http://LIGHT_IMAGE_URL.png">
  </picture>
  <h4> * Illustration created by coalowl </h4>

</div>

## Installation

Install the package using npm:

```sh
npm install @pengoose/funnel
```

Or using yarn:

```sh
yarn add @pengoose/funnel
```

## Usage Example

### Constants

```ts
// example/constants.ts
export const STEP = {
  INITIAL_STEP: 'addId',
  ADD_NAME: 'addName',
  ADD_NUMBER: 'addNumber',
  ADD_EXPIRATION: 'addExpiration',
  ADD_CVV: 'addCvv',
  CONFIRM: 'confirm',
} as const;

export const INITIAL_DATA = {
  id: '',
  name: '',
  number: '',
  expiration: '',
  cvv: '',
} as const;
```

### Types

```ts
// example/types.ts
export type Step = (typeof STEP)[keyof typeof STEP];
export type Data = typeof INITIAL_DATA;
```

### Funnel

```ts
// example/funnel.ts
import { createFunnel } from '@pengoose/funnel';
import { STEP, INITIAL_DATA } from '@/constants';

export const Funnel = createFunnel<Step, Data>({
  initialStep: STEP.INITIAL_STEP,
  initialData: INITIAL_DATA,
});
```

### Usage

```tsx
// example/AddCard.tsx
import { Funnel } from '@pengoose/funnel';

export const Funnels = () => {
  const { step, setStep } = Funnel.useContext();

  return (
    <Funnel>
      {/* Step1 */}
      <Funnel.Step step={STEP.INITIAL_STEP}>
        <AddId />
      </Funnel.Step>

      {/* Step2 */}
      <Funnel.Step step={STEP.ADD_NAME}>
        <AddName />
      </Funnel.Step>

      {/* ...Steps */}
    </Funnel>
  );
};
```

```tsx
// example/AddId.tsx
import { Funnel } from '@pengoose/funnel';
import { STEP } from '@/constants';

export const AddId = () => {
  const { data, setData, setStep } = Funnel.useContext();

  const nextStep = () => {
    setStep(STEP.ADD_NAME);
  };

  return (
    <div>
      <input
        type='text'
        value={data.id}
        onChange={(e) => setData({ id: e.target.value })}
      />
      <button onClick={nextStep}>Next</button>
    </div>
  );
};
```
