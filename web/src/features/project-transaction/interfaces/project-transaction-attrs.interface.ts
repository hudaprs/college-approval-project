// Interfaces
import { IEtcTablePagination } from '@/features/etc/interfaces/table/etc-table-type.interface'
import { IProjectTransactionUserRejectForm } from './project-transaction.interface'

// Constants
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'

export interface IProjectTransactionAttrsList {
  query?: IEtcTablePagination
}

export interface IProjectTransactionAttrsDetail {
  params: {
    id: number
  }
}

export interface IProjectTransactionAttrsAssignUsers {
  params: { id: number }
  body: { users: number[] }
}

export interface IProjectTransactionAttrsUpdateStatus {
  params: { id: number }
  body: { status: PROJECT_TRANSACTION_STATUS }
}

export interface IProjectTransactionAttrsUserApprove {
  params: { id: number }
}

export interface IProjectTransactionAttrsUserReject {
  params: { id: number }
  body: IProjectTransactionUserRejectForm
}
