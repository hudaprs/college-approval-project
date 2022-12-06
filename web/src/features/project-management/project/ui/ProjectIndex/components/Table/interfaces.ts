// Interfaces
import { TEtcTablePaginationType } from '@/features/etc/interfaces/table/etc-table-type.interface'
import { IProjectResponsePaginate } from '@/features/project-management/project/interfaces/project-response.interface'

export interface ITableProps {
  data?: IProjectResponsePaginate['results']
  loading?: boolean
  fetching?: boolean
  authenticatedUserId: number
  onChange: (inputType: TEtcTablePaginationType, value: string | number) => void
  onCreate: () => void
  onShow: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => Promise<void>
}
