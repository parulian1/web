export interface OrderPayment {
  completedDate: string;
  amount: number;
  status: 'paid' | 'unpaid';
  notes: string;
  paymentGateway: {
    name: string;
    description: string;
    logo: string;
    type: string; // todo: actually a type here?
    guide: string;
  };
  meta: {
    paymentType: string; // actually a type?
    vaNumber: string;
    dateExpired: string;
  };
}
