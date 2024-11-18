import { Pin, PinList, Options } from './pinterest.type';

interface PinterestProps {
  id: string;
  boardIds: string[];
}

export class Pinterest {
  private id: string;

  private boardIds: string[];

  constructor({ id, boardIds }: PinterestProps) {
    this.id = id;
    this.boardIds = boardIds;
  }

  public async getBoard({ id, boardId }: { id: string; boardId: string }) {
    const parsedBoardId = this.parseBoardId(boardId);
    const path = this.getAPIPath(id, parsedBoardId);

    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch board data: ${response.statusText}`);
    }

    const { data: pins } = await response.json();

    console.log('#1', pins);
    return pins;
  }

  public async getBoards(
    props: PinterestProps & Options['flatTrue']
  ): Promise<Pin[]>;
  public async getBoards(
    props: PinterestProps & Options['flatFalsy']
  ): Promise<PinList>;
  public async getBoards(
    props: PinterestProps & Options['flat']
  ): Promise<Pin[] | PinList> {
    const { id, boardIds, flat } = props;

    const requests = boardIds.map((boardId) => this.getBoard({ id, boardId }));
    const result = await Promise.allSettled(requests);

    if (flat) {
      const fulfilled = result.filter((res) => res.status === 'fulfilled');
      const pins = fulfilled.flatMap((res) => res.value.pins);
      const flatten = pins.flat();

      return flatten;
    }

    const boardPinsMap = boardIds.reduce((acc, boardId, index) => {
      const res = result[index];
      if (res.status === 'fulfilled') {
        acc[boardId] = res.value.pins;
      }
      return acc;
    }, {} as PinList);

    return boardPinsMap;
  }

  public async getMyBoard(boardId: string) {
    return await this.getBoard({ id: this.id, boardId });
  }

  public async getMyBoards(props: Options['flatTrue']): Promise<Pin[]>;
  public async getMyBoards(props?: Options['flatFalsy']): Promise<PinList>;
  public async getMyBoards(
    props: Options['flat'] = {}
  ): Promise<Pin[] | PinList> {
    const { flat } = props;

    if (flat) {
      return await this.getBoards({
        id: this.id,
        boardIds: this.boardIds,
        flat: true,
      });
    }

    return await this.getBoards({
      id: this.id,
      boardIds: this.boardIds,
    });
  }

  private getAPIPath(id: string, boardId: string) {
    return `https://api.pinterest.com/v3/pidgets/boards/${id}/${boardId}/pins/`;
  }

  private parseBoardId(id: string) {
    // . => ''
    const parseDot = id.replace(/\./g, '');
    // ' ' => '-'
    const parseSpace = parseDot.replace(/\s/g, '-');

    return parseSpace;
  }
}
