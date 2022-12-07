// Interfaces
import { TEtcTablePaginationType } from '@/features/etc/interfaces/table/etc-table-type.interface'
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'

// Constants
import { IProjectTransactionResponsePaginate } from '@/features/project-transaction/interfaces/project-transaction-response.interface'

// Constant
import { AUTH_ROLE } from '@/features/auth/constant/auth-role.constant'

export interface ITableProps {
  data?: IProjectTransactionResponsePaginate['results']
  loading?: boolean
  fetching?: boolean
  authenticatedUserRole: AUTH_ROLE
  isEditable: (status: PROJECT_TRANSACTION_STATUS) => boolean
  onChange: (inputType: TEtcTablePaginationType, value: string | number) => void
  onShow: (id: number) => void
  onEdit: (id: number) => void
}
