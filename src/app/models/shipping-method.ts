export interface ShippingMethod {
  href: string;
  isActive: boolean;
  name: string;
  type: string;
  description: string;
  icon: string;
  services: Array<ShippingServices>;
}

export interface ShippingServices {
  href: string;
  isActive: boolean;
  name: string;
  icon: string;
  minimumWeight: number;
  handlingFee: number;
  graceAmount: number;
  description: string;
}

export interface ShippingCost {
  method: string;
  cost: number;
  origin: string;
  destination: string;
  sla: string;
  service: string;
}

export interface ShippingMethod {
  href: string;
  isActive: boolean;
  name: string;
  type: string;
  description: string;
  icon: string;
  services: Array<ShippingServices>;
}

export interface ShippingServices {
  href: string;
  isActive: boolean;
  name: string;
  icon: string;
  minimumWeight: number;
  handlingFee: number;
  graceAmount: number;
  description: string;
}

export interface ShippingCost {
  method: string;
  cost: number;
  origin: string;
  destination: string;
  sla: string;
  service: string;
}

export interface DropshipMeta {
  name: string;
  mobile: string;
}
export interface DropshipOption {
  active: boolean;
  meta?: DropshipMeta
}
