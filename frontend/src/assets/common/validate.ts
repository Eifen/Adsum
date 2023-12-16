export default class Validate {

  static validateString(stringToValidate: string, maxLenght: number): Boolean {
    const stringFormat = new RegExp("^[a-zA-Z ]{2,254}$")
    if (stringFormat.test(stringToValidate) && stringToValidate.length <= maxLenght) return true;
    return false;
  }

  static validatePhone(phoneToValidate: string): Boolean {
    const phoneFormat = new RegExp("^\\+[0-9]+[0-9]{8}$")
    if (phoneFormat.test(phoneToValidate)) return true;
    return false;
  }

  static validateEmail(emailToValidate: string): Boolean {
    const emailFormat = new RegExp("^\\w+[\\w-.]*\\@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
    if (emailFormat.test(emailToValidate.toString())) return true;
    return false;
  }
}
