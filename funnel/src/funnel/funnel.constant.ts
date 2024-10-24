const ERROR = {
  STEP_NOT_INITIALIZED: 'Please use setStep in FunnelContext.',
  DATA_NOT_INITIALIZED: 'Please use setData in FunnelContext.',
} as const;

const MESSAGE = { ERROR } as const;

export const FUNNEL = { MESSAGE } as const;
