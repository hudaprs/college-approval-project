// Antd
import { FormInstance, ModalProps } from 'antd'

// Interfaces
import {
  IProjectTransactionResponseDetail,
  IProjectTransactionResponseStatus,
  IProjectTransactionResponseUser
} from '@/features/project-transaction/interfaces/project-transaction-response.interface'
import {
  IProjectTransactionForm,
  IProjectTransactionUserRejectForm
} from '@/features/project-transaction/interfaces/project-transaction.interface'

// Constants
import { AUTH_ROLE } from '@/features/auth/constant/auth-role.constant'

export interface IModalProps extends ModalProps {
  form: FormInstance<IProjectTransactionForm>
  projectTransaction: IProjectTransactionResponseDetail['results'] | undefined
  authenticatedUserId: number
  authenticatedUserRole: AUTH_ROLE
  isFormEditable?: boolean
  selectList: {
    statusList: IProjectTransactionResponseStatus['results']
    userList: IProjectTransactionResponseUser['results']
  }
  selectLoading: {
    isStatusListLoading: boolean
    isUserListLoading: boolean
  }
  actionLoading: {
    projectTransaction_isUserApproveLoading: boolean
    projectTransaction_isUserRejectLoading: boolean
  }
  onUserApprove: () => void
  onUserReject: (form: IProjectTransactionUserRejectForm) => void
  onUserResetDecision: () => void
  onSubmit: (form: IProjectTransactionForm) => void
}
