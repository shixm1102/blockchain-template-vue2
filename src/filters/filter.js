import BigNumber from "bignumber.js";

/**
 * 格式化地址
 * @param {string} address
 * @param {number} bef 前面显示几位
 * @param {number} aft 后面显示几位
 */
export function formatAddress(address, bef = 3, aft = 4) {
  if (address) return address.substr(0, bef) + "..." + address.substr(-aft);
  else return "--";
}

/**
 * 保留小数
 * @param {*} number
 * @param {*} decimal
 */
export function toDecimal(number, decimal = 4) {
  return new BigNumber(number).decimalPlaces(decimal).toFormat();
}

/**
 * 格式化金额
 * @param {*} number
 * @param {*} precision
 * @param {*} decimal
 */
export function fromToken(number, precision, decimal = 4) {
  if (typeof Number(number) === "number") {
    const amount = new BigNumber(number)
      .shiftedBy(-precision)
      .decimalPlaces(decimal)
      .toFormat();
    if (amount === "NaN") return "--";
    return amount;
  } else {
    return "--";
  }
}

export function toToken(number, precision) {
  if (typeof Number(number) === "number") {
    const amount = new BigNumber(number).shiftedBy(precision).toString();
    if (amount === "NaN") return "--";
    return amount;
  } else {
    return "--";
  }
}
