// Moment
import moment from 'moment'

/**
 * @description Format date
 *
 * @param {string} date
 * @param {object} options
 *
 * @return {string} date
 */
export const dateUtils_formatDate = (
  date: string,
  options?: { noTime?: boolean }
): string => {
  if (!date) {
    return '-'
  } else {
    let format = 'YYYY-MM-DD HH:mm:ss'
    if (options?.noTime) format = 'YYYY-MM-DD'

    return moment.utc(date).local().format(format)
  }
}
