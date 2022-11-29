// Interfaces
import {
  IApiResponse,
  IApiResponsePagination
} from '@/features/app/interfaces/app-api.interface'
import { ICompany } from './company.interface'

export type ICompanyResponsePaginate = IApiResponsePagination<ICompany[]>
export type ICompanyResponseDetail = IApiResponse<ICompany>
