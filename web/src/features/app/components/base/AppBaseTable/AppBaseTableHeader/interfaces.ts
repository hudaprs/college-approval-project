// Interfaces
import { TEtcTablePaginationType } from '@/features/etc/interfaces/table/etc-table-type.interface'

// React
import { ReactNode } from 'react'

export interface IAppBaseTableHeaderProps {
  left?: ReactNode
  loading?: boolean
  onChange: (type: TEtcTablePaginationType, value: string | number) => void
}
