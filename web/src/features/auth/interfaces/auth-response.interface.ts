// Interfaces
import { IApiResponse } from '@/features/app/interfaces/app-api.interface'
import {
  ICompany,
  ICompanyList
} from '@/features/master/company/interfaces/company.interface'
import {
  IAuthToken,
  IAuthAuthenticatedUser,
  IAuthCheckProfile
} from './auth.interface'

export type IAuthResponseToken = IApiResponse<IAuthToken>
export type IAuthResponseAuthenticatedUser =
  IApiResponse<IAuthAuthenticatedUser>
export type IAuthResponseCheckProfile = IApiResponse<IAuthCheckProfile>
export type IAuthResponseCompanyList = IApiResponse<ICompanyList[]>
export type IAuthResponseCompleteProfile = IApiResponse<{
  auth: IAuthAuthenticatedUser
  company: ICompany | null
}>
