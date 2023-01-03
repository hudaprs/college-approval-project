// Interfaces
import {
  IApiResponse,
  IApiResponsePagination
} from '@/features/app/interfaces/app-api.interface'
import {
  IProjectTransaction,
  IProjectTransactionBudgetCalculation
} from './project-transaction.interface'
import { IAuthAuthenticatedUser } from '@/features/auth/interfaces/auth.interface'

// Constants
import { PROJECT_TRANSACTION_STATUS } from '@/features/project-transaction/constant/project-transaction-status.constant'

export type IProjectTransactionResponsePaginate = IApiResponsePagination<
  IProjectTransaction[]
>
export type IProjectTransactionResponseDetail =
  IApiResponse<IProjectTransaction>

export type IProjectTransactionResponseStatus = IApiResponse<
  PROJECT_TRANSACTION_STATUS[]
>
export type IProjectTransactionResponseUser = IApiResponse<
  IAuthAuthenticatedUser[]
>

export type IProjectTransactionResponseBudgetCalculation = IApiResponse<
  IProjectTransactionBudgetCalculation[]
>
