# @pengoose/layout

![Layout Example](https://github.com/user-attachments/assets/da27373c-cdb6-4d34-979c-c26a2f1aed76)

`@pengoose/layout` is a flexible layout component for React that allows you to create complex layouts with ease. It provides `top`, `left`, `right`, and `bottom` sections that can be dynamically added, and each section is automatically adjusted based on its presence.

## Features

- Dynamically add `top`, `left`, `right`, and `bottom` sections
- Automatically adjusts each section’s size to optimize available space
- Easily create complex UI layouts

## Installation

### > npm

```
npm install @pengoose/layout
```

### > yarn

```
yarn add @pengoose/layout
```

### > pnpm

```
pnpm add @pengoose/layout
```

## API

### `Layout`

The `Layout` component accepts the following props.

| Prop       | Type        | Description                              |
| ---------- | ----------- | ---------------------------------------- |
| `top`      | `ReactNode` | Content to display in the top section    |
| `left`     | `ReactNode` | Content to display in the left section   |
| `right`    | `ReactNode` | Content to display in the right section  |
| `bottom`   | `ReactNode` | Content to display in the bottom section |
| `children` | `ReactNode` | Content to display in the main area      |

## Usage

```tsx
import { Layout } from '@/modules/layout';

function App() {
  return (
    <Layout
      top={
        <div
          style={{ backgroundColor: '#FF5733', padding: '10px', color: '#FFF' }}
        >
          Top Section
        </div>
      }
      left={
        <div
          style={{ backgroundColor: '#33C3FF', height: '100%', color: '#FFF' }}
        >
          Left Section
        </div>
      }
      right={
        <div
          style={{ backgroundColor: '#75FF33', height: '100%', color: '#FFF' }}
        >
          Right Section
        </div>
      }
      bottom={
        <div
          style={{ backgroundColor: '#FF33B5', padding: '10px', color: '#FFF' }}
        >
          Bottom Section
        </div>
      }
    >
      <div
        style={{
          margin: '20px',
          padding: '20px',
          borderRadius: '10px',
          background: 'rgba(0,0,0,0.15)',
          height: 'calc(100% - 40px)',
          overflowY: 'auto',
        }}
      >
        <div style={{ height: '100vh', background: 'rgba(0,0,0,0.1)' }}>
          <h1>App Content</h1>
          <p>This is the main content area.</p>
        </div>
      </div>
    </Layout>
  );
}

export default App;
```
