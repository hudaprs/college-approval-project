// Interfaces
import { IApiPagination } from '@/features/app/interfaces/app-api.interface'
import { TEtcTablePaginationType } from '@/features/etc/interfaces/table/etc-table-type.interface'

// Antd
import { PaginationProps } from 'antd'

export interface IAppBaseTableFooterProps {
  paginationAttrs?: PaginationProps
  pagination?: IApiPagination<unknown>['pagination']
  onChange: (type: TEtcTablePaginationType, value: string | number) => void
}
