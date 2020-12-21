export enum PaymentTypeChoices {
  MANUAL_TRANSFER = 'manual_transfer'
}

export interface PaymentMethod {
  paymentTypeTitle: string;
  type: string;
  paymentMethods: Array<PaymentMethodType>;
}

export interface PaymentMethodType {
  href: string;
  type: string;
  description: string;
  logo: string;
  name: string;
  isActive?: boolean;
  code?: string;
  accountHoldNumber?: string;
  accountNumber?: string;
}
