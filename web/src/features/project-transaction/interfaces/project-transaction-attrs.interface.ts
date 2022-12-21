// Interfaces
import { IEtcTablePagination } from '@/features/etc/interfaces/table/etc-table-type.interface'
import {
  IProjectTransactionUserRejectForm,
  IProjectTransactionForm
} from './project-transaction.interface'

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
  body: IProjectTransactionForm
}

export interface IProjectTransactionAttrsUserApprove {
  params: { id: number }
}

export interface IProjectTransactionAttrsUserReject {
  params: { id: number }
  body: IProjectTransactionUserRejectForm
}

export interface IProjectTransactionAttrsUserResetDecision {
  params: { id: number }
}
