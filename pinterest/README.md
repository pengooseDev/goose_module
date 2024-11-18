# @pengoose/pinterest

![Image](https://github.com/user-attachments/assets/676e907f-faf9-43ff-8f72-913eb9aa6e1e)

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
