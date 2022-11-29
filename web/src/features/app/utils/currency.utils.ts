/**
 * @description Format to IDR
 *
 * @param {number} value
 *
 * @return {string} string
 */
export const currencyUtils_idr = (value: number): string => {
  if (!value) {
    return `-`
  } else {
    return `Rp${Number(value).toLocaleString('id-ID', {
      maximumFractionDigits: 2
    })}`
  }
}
