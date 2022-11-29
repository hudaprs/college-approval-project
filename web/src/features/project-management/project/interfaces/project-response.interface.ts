// Interfaces
import {
  IApiResponse,
  IApiResponsePagination
} from '@/features/app/interfaces/app-api.interface'
import { IProject } from './project.interface'

export type IProjectResponsePaginate = IApiResponsePagination<IProject[]>
export type IProjectResponseDetail = IApiResponse<IProject>
