# @pengoose/pinterest

![Logo](https://github.com/user-attachments/assets/676e907f-faf9-43ff-8f72-913eb9aa6e1e)

`@pengoose/pinterest` is a lightweight library for interacting with the Pinterest API, designed to easily fetch pins from multiple boards.

## Installation

```bash
npm install @pengoose/pinterest
```

## Usage

### Basic Setup

Create an instance of the `Pinterest` class by providing your Pinterest user ID and an array of board IDs.

```ts
import { Pinterest } from '@pengoose/pinterest';

const pinterest = new Pinterest({
  id: 'your_user_id',
  boardIds: ['board_id_1', 'board_id_2'],
});
```

### Fetch Boards Data

The `getBoards()` method retrieves pins from each board and returns an object where each key is a board ID and its value is an array of pins.

```ts
const boards = await pinterest.getBoards();
console.log(boards);
// Example output:
// {
//   board_id_1: [/* Array of Pin objects */],
//   board_id_2: [/* Array of Pin objects */]
// }
```

### Fetch All Pins

The `getAllPins()` method aggregates pins from all boards into a single array. You can optionally shuffle the resulting array by setting the `shuffle` option to `true`.

```ts
// Retrieve all pins in order
const allPins = await pinterest.getAllPins();

// Retrieve all pins with a randomized order
const shuffledPins = await pinterest.getAllPins({ shuffle: true });
```

## API Overview

### Class: `Pinterest`

#### Constructor

```ts
new Pinterest({ id: string, boardIds: string[] });
```

- **id**: Your Pinterest user ID.
- **boardIds**: An array of board IDs from which to fetch pins.

#### Methods

- **getBoards()**
  - **Description**: Fetches pins for each board specified during instantiation.
  - **Returns**: An object (`Boards`) where keys are board IDs and values are arrays of pins.

- **getAllPins({ shuffle?: boolean })**
  - **Description**: Aggregates pins from all boards into a single array.
  - **Parameters**:
    - `shuffle` (optional): If set to `true`, the returned array will be randomized.
  - **Returns**: An array of Pin objects.

## Additional Information

- The internal helper method `parseBoardId` cleans up board IDs by removing dots and replacing spaces with hyphens.
- The API endpoint is dynamically constructed
