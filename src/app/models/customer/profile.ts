import {GenderType} from "./gender.type";

/**
 * Additional data about a customer.
 */
export interface Profile {
  birthPlace: string;
  birthDate: string;
  gender: GenderType;
  occupation: string;
  hobby: Array<string>;
  favoriteCategory: Array<string>;
}
