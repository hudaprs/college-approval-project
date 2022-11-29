// Interfaces
import { TEtcTablePaginationType } from '@/features/etc/interfaces/table/etc-table-type.interface'
import { ICompanyResponsePaginate } from '@/features/master/company/interfaces/company-response.interface'

export interface ITableProps {
  data?: ICompanyResponsePaginate['results']
  loading?: boolean
  fetching?: boolean
  onChange: (inputType: TEtcTablePaginationType, value: string | number) => void
  onCreate: () => void
  onShow: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => Promise<void>
}
