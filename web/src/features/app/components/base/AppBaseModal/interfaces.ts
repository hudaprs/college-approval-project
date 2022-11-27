// Antd
import { ModalProps } from 'antd'

export type IModalProps = ModalProps

export interface IModalConfirmProps {
  onOk: () => void
  onCancel: () => void
  title: string
  content?: string
  okButtonProps?: ModalProps['okButtonProps']
}
