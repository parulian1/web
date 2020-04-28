export interface StoreLocation {
  url?: string;
  name?: string;
  code?: string;
  type?: string;
  isActive?: boolean;
  address?: StoreLocationAddress,
  subLocation?: StoreSubLocation
}

export interface StoreLocationAddress {
  country?: string;
  state?: string;
  city?: string;
  district?: string;
  subDistrict?: string;
  street?: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  addressNotes?: string;
}

export interface StoreSubLocation {
  name?: string;
  code?: string;
  type?: string;
}
