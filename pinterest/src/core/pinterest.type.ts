export interface Pin {
  description: string;
  dominant_color: string;
  id: string;
  images: {
    '237x': {
      height: number;
      url: string;
      width: number;
    };
    '564x': {
      height: number;
      url: string;
      width: number;
    };
  };
  is_video: boolean;
}

export type Boards = Record<string, Pin[]>;

export interface Options {
  flat: {
    flat?: boolean;
  };
  flatTrue: {
    flat: true;
  };
  flatFalsy: {
    flat?: false;
  };
}