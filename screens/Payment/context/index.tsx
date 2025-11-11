import createFastContext from '@/features/fastContext/createFastContext';
import { coinInfos, EPaymentStep, ICoinPayment, EPaymentMethod } from '../types';

export interface IPaymentContext {
    coinType: ICoinPayment,
    duration: number,
    currentStep: EPaymentStep,
    paymentMethod: EPaymentMethod,
}

const initialState: IPaymentContext = {
  coinType: coinInfos[0],
  duration: 1,
  currentStep: EPaymentStep.STEP_ONE,
  paymentMethod : EPaymentMethod.NONE
};

export const { 
  FastContextProvider:PaymentFastContextProvider,
  useFastContextFields:usePaymentFastContextFields
} = createFastContext<IPaymentContext>(initialState);

export const usePaymentSelector = (key: keyof IPaymentContext) => {
  const res = usePaymentFastContextFields([key]);
  return res[key];
};