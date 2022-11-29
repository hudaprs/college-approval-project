// React
import { memo } from 'react'

// Components
import { StyledModal } from './components'

// i18n
import { useTranslation } from 'react-i18next'

// Interfaces
import { IModalProps, IModalConfirmProps } from './interfaces'

// Antd
import { ExclamationCircleOutlined } from '@ant-design/icons'

// Constant
import { APP_COLOR_LIGHT } from '@/features/app/constant/app-style.constant'

// Modal
const { confirm } = StyledModal

const AppBaseModal = memo((props: IModalProps) => {
  // Hook
  const { t } = useTranslation()

  return (
    <StyledModal
      {...props}
      okButtonProps={{
        ...props?.okButtonProps,
        style: {
          ...props?.okButtonProps?.style,
          backgroundColor:
            props?.okButtonProps?.style?.backgroundColor ||
            APP_COLOR_LIGHT.PRIMARY
        }
      }}
      centered={props?.centered}
      maskClosable={props?.maskClosable}
      okText={props?.okText ? props?.okText : t('app.action.submit')}
      cancelText={
        props?.cancelText ? props?.cancelText : t('app.action.cancel')
      }
    >
      {props?.children ? props?.children : <></>}
    </StyledModal>
  )
})

AppBaseModal.displayName = 'AppBaseModal'

const appBaseModalConfirm = ({
  title,
  content,
  onOk,
  onCancel,
  okButtonProps
}: IModalConfirmProps) => {
  confirm({
    icon: <ExclamationCircleOutlined />,
    title,
    content,
    onOk,
    onCancel,
    okButtonProps: {
      ...okButtonProps,
      style: {
        ...okButtonProps?.style,
        backgroundColor:
          okButtonProps?.style?.backgroundColor || APP_COLOR_LIGHT.PRIMARY
      }
    }
  })
}

export { AppBaseModal, appBaseModalConfirm }
