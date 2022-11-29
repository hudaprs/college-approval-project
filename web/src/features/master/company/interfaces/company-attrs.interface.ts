// Interfaces
import { IEtcTablePagination } from '@/features/etc/interfaces/table/etc-table-type.interface'
import { ICompanyForm } from './company.interface'

export interface ICompanyAttrsList {
  query?: IEtcTablePagination
}

export interface ICompanyAttrsDetail {
  params: {
    id: number
  }
}

export interface ICompanyAttrsCreate {
  body: ICompanyForm
}

export interface ICompanyAttrsUpdate {
  params: {
    id: number
  }
  body: ICompanyForm
}

export interface ICompanyAttrsDelete {
  params: { id: number }
}
