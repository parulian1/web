export interface Addresses {
  id?: number;
  href?: string;
  user?: string;
  name: string;
  shipToName: string;
  country?: string;
  state: string;
  city: string;
  district: string;
  street: string;
  zipcode: string;
  phoneNumber: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
  latitude?: number;
  longitude?: number;
}

export interface Address {
  id?: number;
  href?: string;
  user?: string;
  name: string;
  shipToName: string;
  country?: string;
  state: string;
  city: string;
  district: string;
  street: string;
  zipcode: string;
  phoneNumber: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
  latitude?: number;
  longitude?: number;
}
