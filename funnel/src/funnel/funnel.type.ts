import { Dispatch, SetStateAction } from 'react';

type DefaultSetState = () => never;

/**
 * T is the union type of the names of the steps.
 * @template T
 * @property {T} step - Current Step
 * @property {D} data - Type of data to be used in Funnel
 * @property {(step: T) => void} setStep - Function to change Step
 * @property {Dispatch<SetStateAction<D | undefined>>} setData - Function to change data
 */
export interface FunnelContextProps<T, D> {
  step: T | null;
  data?: D;
  setStep: ((step: T) => void) | DefaultSetState;
  setData: Dispatch<SetStateAction<D | undefined>>;
}

export interface FunnelStepProps<T> extends React.PropsWithChildren {
  name: T;
}

export interface GetFunnelProps<T, D> {
  initialStep: T;
  initialData?: D;
}
