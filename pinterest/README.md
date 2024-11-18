# @pengoose/pinterest

<img width="1289" alt="image" src="https://github.com/user-attachments/assets/44e18908-2d74-4b7b-9300-997880c228a3">

## install

```bash
npm install @pengoose/pinterest
```

## usage

```ts
import Pinterest from '@pengoose/pinterest';

const pinterest = new Pinterest({
  id: 'your_id',
  boardIds: ['your_board_id', 'your_board_id_2'],
});

const boardPins = await pinterest.getMyBoard('my_board_id');
const boards = await pinterest.getMyBoards();
const boardsWithFlatten = await pinterest.getMyBoards({ flatten: true });
```
