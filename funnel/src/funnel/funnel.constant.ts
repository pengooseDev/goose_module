const ERROR = {
  STEP_NOT_INITIALIZED: 'Please Initialize setStep function.',
  DATA_NOT_INITIALIZED: 'Please Initialize setData function.',
} as const;

const MESSAGE = { ERROR } as const;

export const FUNNEL = { MESSAGE } as const;
