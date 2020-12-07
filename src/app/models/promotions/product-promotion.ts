import { Nullable } from '@app/core';
import { NamedHrefEntity } from '@app/models/base';
import { PromotionType } from './promotion.type';

/**
 * A collection of products which are available with special pricing during
 * a specified period of time.
 */
export interface ProductPromotion extends NamedHrefEntity {

  /**
   * Non-paginated list of all the products which are reprsented in this promotion.
   */
  products: Array<NamedHrefEntity>;

  /**
   * A URL to a banner image which can be shown with this promotion.
   */
  banner: string;

  /**
   * Indicates how 'amount' should be interpreted.
   */
  type: PromotionType;

  /**
   * The value that should be discounted from the user's cart.  This value
   * **MUST** be interpreted based on the value of 'type'.
   */
  amount: number;

  /**
   * The minimum cart value that the user must have in order to be eligible for
   * this promotion.
   */
  minimumOrderAmount: number;

  /**
   * The maximum value that can be discounted from a single cart as the result
   * of this promotion.
   */
  maxAmount: number;

  /**
   * If true, this promotion cannot be applied with other promotions.
   */
  isExclusive: boolean;

  /**
   * ISO 8601 date/time string.  Indicates when the promotion begins.
   */
  validTo: string;

  /**
   * Optional ISO8601 datetime string.  Indicates when the promotion no longer
   * is validate.
   */
  validFrom: Nullable<string>;
}
