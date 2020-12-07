import { SummaryPayment } from "@app/models/checkout";


// Environments
export const BCA_NAME = "BCA Virtual Account";
export const BCA_CODE = "014";
export const BNI_NAME = "BNI Virtual Account";
export const BNI_CODE = "013";


export const getBank = (payment: SummaryPayment | string) => {
  let name: string;
  if (typeof payment === "string") {
    name = payment;
  } else {
    name = payment.name;
  }

  switch (name) {
    case BNI_NAME:
      return new BNIBank();
    case BCA_NAME:
      return new BCABank();
    default:
      return new AbstractBank();
  }
};

export class AbstractBank {
  // on future maybe we can add instruction in this class.
  name: string = "";
  logo: string = "/assets/order-history/undefined-bank.png";
  code: string = "xxx";

  toJson(): { name: string; logo: string; code: string } {
    return {
      name: this.name,
      logo: this.logo,
      code: this.code,
    };
  }
}

export class BCABank extends AbstractBank {
  constructor() {
    super();
    this.name = BCA_NAME;
    this.logo = "/assets/order-history/bca.png";
    this.code = BCA_CODE;
  }
}

export class BNIBank extends AbstractBank {
  name = BNI_NAME;
  logo = "/assets/order-history/bni.png";
  code = BNI_CODE;
}
