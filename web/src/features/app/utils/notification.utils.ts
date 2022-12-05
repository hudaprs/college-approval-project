// Antd
import { notification } from 'antd'
import { NotificationPlacement } from 'antd/es/notification/interface'

type TNotification = 'success' | 'info' | 'warning' | 'error'
type TNotificationPayload = {
  message: string
  description?: string
  placement?: NotificationPlacement
}

/**
 * @description Open notification
 *
 * @return {void} void
 */
export const notificationUtils_open = (
  type: TNotification,
  payload: TNotificationPayload
): void => {
  notification[type]({
    ...payload,
    placement: payload?.placement || 'topRight'
  })
}
