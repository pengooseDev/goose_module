import { Pin, Boards } from './pinterest.type';
import { shuffle as shufflePins } from './utils';
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

  public async getBoards(): Promise<Boards> {
    const requests = this.boardIds.map((boardId) => this.getBoard({ id: this.id, boardId }));
    const result = await Promise.allSettled<Boards>(requests);

    return this.boardIds.reduce((acc, boardId, index) => {
      const res = result[index];
      if (res.status === 'fulfilled') {
        acc[boardId] = res.value.pins;
      }
      return acc;
    }, {} as Boards);
  }

  public async getAllPins({ shuffle }: { shuffle?: boolean } = {}): Promise<Pin[]> {
    const boards = await this.getBoards();
    const pins = Object.values(boards).flat();

    if (shuffle) {
      return shufflePins(pins);
    }

    return pins;
  }

  private async getBoard({ id, boardId }: { id: string; boardId: string }) {
    const parsedBoardId = this.parseBoardId(boardId);
    const endpoint = this.getEndpoint({ id, boardId: parsedBoardId });
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch board data: ${response.statusText}`);
    }

    const { data: pins } = await response.json();

    return pins;
  }

  private getEndpoint({ id, boardId }: { id: string; boardId: string }) {
    return `https://api.pinterest.com/v3/pidgets/boards/${id}/${boardId}/pins/`;
  }

  // FIXME: Should be moved on utils?
  private parseBoardId(id: string) {
    // . => ''
    const parseDot = id.replace(/\./g, '');
    // ' ' => '-'
    const parseSpace = parseDot.replace(/\s/g, '-');

    return parseSpace;
  }
}