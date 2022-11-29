export interface IEtcTablePagination {
  page: number
  limit: number
  sort: 'asc' | 'desc'
  column: string | undefined
  search: string | undefined
}

export type TEtcTablePaginationType = 'limit' | 'search' | 'page' | 'reset'

export type TEtcTableInitial = {
  id: number
  limit?: number
  column?: string
  sort?: 'desc' | 'asc'
}

export type TEtcTableChange = {
  id: number
  type?: TEtcTablePaginationType
  value?: string | number
}
