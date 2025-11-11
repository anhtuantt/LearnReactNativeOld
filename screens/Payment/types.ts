export interface IDuration {
    value: number,
    label: string,
}

export enum EPaymentCoin {
    USDT = 'USDT',
    USDC = 'USDC',
    VAI = 'VAI',
}

export enum EPaymentMethod {
    NONE = 0,
    CRYPTO = 1,
    PAYPAL = 2,
    CREDIT_CARD = 3,
}

export enum EPaymentStep {
    STEP_ONE = 1,
    STEP_TWO = 2,
}

export const durationData: IDuration[] = [
  { value: 1, label: '1 month' },
  { value: 3, label: '3 months' },
  { value: 6, label: '6 months' },
];
export interface ICoinPayment {
    label: EPaymentCoin,
    value: EPaymentCoin
}
export const coinInfos:ICoinPayment[] = [
  { label: EPaymentCoin.USDT, value: EPaymentCoin.USDT, },
  { label: EPaymentCoin.USDC, value: EPaymentCoin.USDC, },
  { label: EPaymentCoin.VAI, value: EPaymentCoin.VAI, },
];

export const messageStep1 = 'Your subscription will begin after payment confirmation (including any trial period).';
export const messageStep2 = 'Note that the payment will only be confirmed if you send enough funds to cover your monthly subscription fee from the registered wallet address linked to your order. You will get a notification upon successful activation.';