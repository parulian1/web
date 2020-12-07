// Environments
export const VISA_CARD_ID = 'visa';
export const VISA_CARD_IMAGE = 'assets/user-payment/visa-med.png';
export const MASTER_CARD_ID = 'mastercard'
export const MASTER_CARD_IMAGE = 'assets/user-payment/mastercard-med.png'
export const DEFAULT_CARD_IMAGE = 'https://via.placeholder.com/35x21.png'


// Interfaces
export interface CreditCardUtil {
  cardId: string;
  cardImg?: string;
}


// Utils
export const getCard = (number: string): CreditCardUtil => {
  // visa
  let re = new RegExp("^4");
  if (number.match(re) != null) {
    return { cardId: VISA_CARD_ID, cardImg: VISA_CARD_IMAGE }
  }
  // master card
  if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
    return { cardId: MASTER_CARD_ID, cardImg: MASTER_CARD_IMAGE };

  // todo: other credit card maybe include on future
  return { cardId: '', cardImg: DEFAULT_CARD_IMAGE }
}


/**
 * from api, maskedCard only showing first and last number (ex: 1234-23)
 * its not looking good, so that we need reformat like this `1234-XXXX-XXXX-XX23`
 * */
export const formatMaskedCardNumber = (param) => {
  let formattedCardNumber = param.split('-');
  formattedCardNumber = formattedCardNumber[0] + 'XXXXXX' + formattedCardNumber[1];
  return formattedCardNumber.replace(/(.{4})/g, "$1 ");
}
