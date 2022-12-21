// Interfaces
import { IAuthAuthenticatedUser } from '@/features/auth/interfaces/auth.interface'
import { IProject } from '@/features/project-management/project/interfaces/project.interface'

// Constants
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'

export interface IProjectTransaction {
  id: number
  project_id: number
  created_by: number
  status: PROJECT_TRANSACTION_STATUS
  reject_reason: string
  approved_date: string
  rejected_date: string
  active_project: IProject
  user: IAuthAuthenticatedUser
  users: ((IAuthAuthenticatedUser & {
    created_at: string
    updated_at: string
  }) & {
    approval: {
      project_transaction_id: number
      user_id: number
      reject_reason: string
      approved_date: string
      rejected_date: string
    }
  })[]
  created_at: string
  updated_at: string
}

export interface IProjectTransactionForm {
  status: PROJECT_TRANSACTION_STATUS
  reject_reason?: string
  users?: number[]
}

export interface IProjectTransactionUserRejectForm {
  reject_reason: string
}
