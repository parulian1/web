export class AddressEntity {
  name: string;
  shipToName: string;
  phoneNumber: string | number;
  state: string;
  city: string;
  district: string;
  zipCode: number;
  street: string;
  lat: number;
  lng: number;

  constructor(name: string, shipToName: string, phoneNumber: string | number, state: string,
              city: string, district: string, zipCode: number, street: string,
              lat: number, lng: number) {
    this.name = name;
    this.shipToName = shipToName;
    this.phoneNumber = phoneNumber;
    this.state = state;
    this.city = city;
    this.district = district;
    this.zipCode = zipCode;
    this.street = street;
    this.lat = lat;
    this.lng = lng;
  }

  toObject() {
    return {
      name: this.name, shipToName: this.shipToName, phoneNumber: this.phoneNumber,
      state: this.state, city: this.city, district: this.district, zipcode: this.zipCode,
      street: this.street,
      country: 'Indonesia', // hacked !!
      latitude: this.lat.toFixed(6), longitude: this.lng.toFixed(6),
    }
  }
}
