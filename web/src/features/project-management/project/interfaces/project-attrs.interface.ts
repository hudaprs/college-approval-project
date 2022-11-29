// Interfaces
import { IEtcTablePagination } from '@/features/etc/interfaces/table/etc-table-type.interface'
import { IProjectForm } from './project.interface'

export interface IProjectAttrsList {
  query?: IEtcTablePagination
}

export interface IProjectAttrsDetail {
  params: {
    id: number
  }
}

export interface IProjectAttrsCreate {
  body: IProjectForm
}

export interface IProjectAttrsUpdate {
  params: {
    id: number
  }
  body: IProjectForm
}

export interface IProjectAttrsDelete {
  params: { id: number }
}
