import jsSHA from "jssha";

export default class OneTimeTokenGenerator {
  generate(key) {
    return this.totp(key);
  }

  totp(key) {
    let epoch = Math.round(new Date().getTime() / 1000.0);
    let time = this._leftpad(this._dec2hex(Math.floor(epoch / 30)), 16, "0");

    let shaObj = new jsSHA("SHA-1", "HEX");
    shaObj.setHMACKey(this._base32tohex(key), "HEX");
    shaObj.update(time);
    let hmac = shaObj.getHMAC("HEX");

    let offset = this._hex2dec(hmac.substring(hmac.length - 1));
    let otp =
      (this._hex2dec(hmac.substr(offset * 2, 8)) & this._hex2dec("7fffffff")) +
      "";
    otp = otp.substr(otp.length - 6, 6);

    return otp;
  }

  _dec2hex(s) {
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
  }

  _hex2dec(s) {
    return parseInt(s, 16);
  }

  _base32tohex(base32) {
    let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let hex = "";

    for (let i = 0; i < base32.length; i++) {
      let val = base32chars.indexOf(base32.charAt(i).toUpperCase());
      bits += this._leftpad(val.toString(2), 5, "0");
    }

    for (let i = 0; i + 4 <= bits.length; i += 4) {
      let chunk = bits.substr(i, 4);
      hex = hex + parseInt(chunk, 2).toString(16);
    }
    return hex;
  }

  _leftpad(str, len, pad) {
    if (len + 1 >= str.length) {
      str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
  }
}
