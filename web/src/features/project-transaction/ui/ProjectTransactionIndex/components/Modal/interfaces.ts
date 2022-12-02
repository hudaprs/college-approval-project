// Antd
import { FormInstance, ModalProps } from 'antd'

// Interfaces
import {
  IProjectTransactionResponseDetail,
  IProjectTransactionResponseStatus,
  IProjectTransactionResponseUser
} from '@/features/project-transaction/interfaces/project-transaction-response.interface'
import { IProjectTransactionForm } from '@/features/project-transaction/interfaces/project-transaction.interface'

export interface IModalProps extends ModalProps {
  form: FormInstance<IProjectTransactionForm>
  projectTransaction: IProjectTransactionResponseDetail['results'] | undefined
  authenticatedUserId: number
  isFormEditable?: boolean
  selectList: {
    statusList: IProjectTransactionResponseStatus['results']
    userList: IProjectTransactionResponseUser['results']
  }
  selectLoading: {
    isStatusListLoading: boolean
    isUserListLoading: boolean
  }
  onSubmit: (form: IProjectTransactionForm) => void
}
