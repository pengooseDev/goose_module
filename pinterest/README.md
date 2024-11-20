# @pengoose/pinterest

![Image](https://github.com/user-attachments/assets/676e907f-faf9-43ff-8f72-913eb9aa6e1e)

`@pengoose/pinterest` is a lightweight library that simplifies communication with the Pinterest API, allowing easy management of boards and pins.

## Installation

```bash
npm install @pengoose/pinterest
```

## Usage

### Basic Usage

```ts
import { Pinterest } from '@pengoose/pinterest';

const pinterest = new Pinterest({
  id: 'your_id',
  boardIds: ['your_board_id', 'your_board_id_2'],
});

// Fetch pins from a specific board
const boardPins = await pinterest.getMyBoard('my_board_id');

// Fetch pins from all boards
const boards = await pinterest.getMyBoards();

// Fetch pins from all boards as a flat array
const boardsWithFlatten = await pinterest.getMyBoards({ flat: true });

// Fetch pins from a board with an explicit ID
const specificBoardPins = await pinterest.getBoard({
  id: 'specific_user_id',
  boardId: 'specific_board_id',
});

// Fetch multiple boards with flattened pins
const allPinsFlattened = await pinterest.getBoards({
  id: 'specific_user_id',
  boardIds: ['board_id_1', 'board_id_2'],
  flat: true,
});

// Fetch multiple boards grouped by board ID
const allBoardsWithPins = await pinterest.getBoards({
  id: 'specific_user_id',
  boardIds: ['board_id_1', 'board_id_2'],
});
```

---

## Class: `Pinterest`

The `Pinterest` class abstracts communication with the Pinterest API and provides the following methods:

### **Constructor**

```ts
new Pinterest({ id: string, boardIds: string[] });
```

- **Parameters**
  - `id`: Pinterest user ID.
  - `boardIds`: List of board IDs to manage.

---

### **Methods**

#### **`getMyBoard(boardId: string): Promise<Pin[]>`**

- Fetch pins from a specific board linked to the current user.
- **Parameters**
  - `boardId`: The ID of the board to fetch pins from.
- **Returns**
  - An array of pins (`Pin[]`) for the specified board.

**Example**

```
const boardPins = await pinterest.getMyBoard('my_board_id');
```

---

#### **`getMyBoards(props?: { flat?: boolean }): Promise<Pin[] | PinList>`**

- Fetch pins from all boards linked to the current user.
- **Parameters**
  - `props.flat`: If `true`, returns all board pins in a single flat array.
- **Returns**
  - `Pin[]` if `flat: true`.
  - `PinList` (a map of board IDs to pin lists) if `flat: false`.

**Example**

```ts
const boards = await pinterest.getMyBoards(); // Grouped by board
const flattenedPins = await pinterest.getMyBoards({ flat: true }); // Flat array
```

---

#### **`getBoard({ id, boardId }: { id: string; boardId: string }): Promise<Pin[]>`**

- Fetch pins from a specific board using an explicit user and board ID.
- **Parameters**
  - `id`: Pinterest user ID.
  - `boardId`: The ID of the board to fetch pins from.
- **Returns**
  - An array of pins (`Pin[]`) for the specified board.

**Example**

```ts
const boardPins = await pinterest.getBoard({
  id: 'specific_user_id',
  boardId: 'specific_board_id',
});
```

---

#### **`getBoards(props: PinterestProps & { flat?: boolean }): Promise<Pin[] | PinList>`**

- Fetch pins from multiple boards using explicit user and board IDs.
- **Parameters**
  - `props.id`: Pinterest user ID.
  - `props.boardIds`: Array of board IDs to fetch.
  - `props.flat`: If `true`, returns all board pins in a single flat array.
- **Returns**
  - `Pin[]` if `flat: true`.
  - `PinList` (a map of board IDs to pin lists) if `flat: false`.

**Example**

```ts
const allPinsFlattened = await pinterest.getBoards({
  id: 'specific_user_id',
  boardIds: ['board_id_1', 'board_id_2'],
  flat: true,
});

const groupedPins = await pinterest.getBoards({
  id: 'specific_user_id',
  boardIds: ['board_id_1', 'board_id_2'],
});
```
