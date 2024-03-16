import { createContext, useContext, useState } from 'react';
import { FUNNEL } from './funnel.constant';
import {
  GetFunnelProps,
  FunnelContextProps,
  FunnelStepProps,
} from './funnel.type';

/**
 * Function of creating Funnel
 * @template StepKey - Union type of Step's names
 * @template Data - Type of data to be shared in Funnel
 * @param {GetFunnelProps<StepKey>} param0 - Initial Step
 * @returns {{
 *  Funnel: React.FC<React.PropsWithChildren<{}>>;
 *  useFunnel: () => FunnelContextProps<StepKey, Data>;
 * }}
 */
export const createFunnel = <StepKey, Data = undefined>({
  initialStep,
  initialData,
}: GetFunnelProps<StepKey, Data>) => {
  const FunnelContext = createContext<FunnelContextProps<StepKey, Data>>({
    step: null,
    data: initialData,
    setStep: () => {
      throw new Error(FUNNEL.MESSAGE.ERROR.STEP_NOT_INITIALIZED);
    },
    setData: () => {
      throw new Error(FUNNEL.MESSAGE.ERROR.DATA_NOT_INITIALIZED);
    },
  });

  const Step = ({ name, children }: FunnelStepProps<StepKey>) => {
    const { step } = useContext(FunnelContext);

    if (name === step) return <>{children}</>;

    return null;
  };

  const FunnelContainer = ({ children }: React.PropsWithChildren) => {
    const [step, setStep] = useState<StepKey>(initialStep);
    const [data, setData] = useState<typeof initialData | undefined>(
      initialData
    );

    return (
      <FunnelContext.Provider value={{ data, setData, step, setStep }}>
        {children}
      </FunnelContext.Provider>
    );
  };

  return Object.assign(FunnelContainer, {
    Step,
    useContext: () => useContext(FunnelContext),
  });
};
