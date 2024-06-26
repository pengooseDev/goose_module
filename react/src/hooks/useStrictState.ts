import { useState } from 'react';
import { Diff } from 'types/utils';

export const useStrictState = <Expect>(initialState: Expect) => {
  const [state, setState] = useState(initialState);

  function setStrictState<Sample>(
    newState: Diff<Expect, Sample extends Expect ? Sample : never>
  ): void;
  function setStrictState<Sample>(
    newState: (
      prevState: Expect
    ) => Diff<Expect, Sample extends Expect ? Sample : never>
  ): void;

  function setStrictState<Sample>(newState: any): void {
    setState(newState);
  }

  return [state, setStrictState] as const;
};
