// Moment
import moment from 'moment'

/**
 * @description Format date
 *
 * @param {string} date
 *
 * @return {string} date
 */
export const dateUtils_formatDate = (date: string): string => {
  if (!date) {
    return '-'
  } else {
    return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
  }
}
