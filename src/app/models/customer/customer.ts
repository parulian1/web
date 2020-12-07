import {Profile} from "./profile";

/**
 * Information about a user.
 */
export interface Customer {
  href: string;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  dateJoined: string;
  phoneNumber: string;
  homePhoneNumber: string;
  profile: Profile;
}
