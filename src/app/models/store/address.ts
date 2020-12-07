/**
 * A physical street address.
 */
export interface Address {
  country: string;
  province: string;
  city: string;
  district: string;
  subDistrict: string;
  street: string;
  postalCode: string;
  latitude?: string;
  longitude?: string;
  notes?: string;
}
