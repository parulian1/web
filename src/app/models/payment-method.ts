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
}
